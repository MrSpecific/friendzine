import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { gql, request, getPaths, responsiveImageFragment } from '@data/datocms';
import { Image, StructuredText } from 'react-datocms';
import classNames from 'classnames';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { ArticleList } from '@components/ArticleCard';
import SpotifyPlayer from '@components/SpotifyPlayer';
import PDFLink from '@components/PDFLink';
import Attribution from '@components/Attribution';
import styles from '@styles/pages/Issue.module.css';

export default function IssuePage({
  title,
  date,
  cover,
  content,
  spotifyUrl,
  summary,
  pdf,
  articles,
  ...fields
}) {
  const router = useRouter();
  const id = router.query;

  return (
    <article className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Header>
        <h1>{title}</h1>
      </Header>

      <main className="container">
        <Attribution date={date} />

        {cover && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image data={cover.responsiveImage} className={styles.coverImage} />
        )}

        <div className={styles.issuePDF}>
          <PDFLink pdf={pdf} />
        </div>

        <section className={classNames([styles.issueTop], 'container--narrow')}>
          {summary && <ReactMarkdown className={styles.summary}>{summary}</ReactMarkdown>}

          {spotifyUrl && (
            <div className={styles.spotifyWrapper}>
              <SpotifyPlayer url={spotifyUrl} />
            </div>
          )}
        </section>

        <section className={classNames([[styles.mainContent], 'container--narrow'])}>
          <div className="structured-content">
            <StructuredText data={content} />
          </div>
        </section>

        {articles && (
          <div className="container--narrow">
            <section className={styles.articlesSection}>
              <h2>Articles in this issue: </h2>
              <ArticleList articles={articles} />
            </section>
          </div>
        )}
      </main>
      <Footer />
    </article>
  );
}

const ISSUE_SLUGS_QUERY = gql`
  {
    allIssues {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const data = await request({
    query: ISSUE_SLUGS_QUERY,
    preview: false,
  });

  const paths = getPaths(data.allIssues, 'issueSlug');

  return {
    paths,
    fallback: false,
  };
}

const SINGLE_ISSUE_QUERY = gql`
  query Issue($slug: String) {
    issue(filter: { slug: { eq: $slug } }) {
      title
      date
      slug
      cover {
        responsiveImage(imgixParams: { fit: crop, w: 1400, h: 700 }) {
          ...responsiveImageFragment
        }
      }
      content {
        value
      }
      spotifyUrl
      summary
      pdf {
        url
      }
      articles {
        slug
        title
      }
      # author {
      #   name
      # }
      # categories {
      #   title
      #   slug
      # }
      # tags {
      #   title
      # }
      # gallery {
      #   id
      # }
    }
  }
  ${responsiveImageFragment}
`;

export async function getStaticProps({ params }) {
  const data = await request({
    query: SINGLE_ISSUE_QUERY,
    variables: { slug: params.issueSlug },
    preview: false,
  });

  return {
    props: { ...data.issue },
  };
}
