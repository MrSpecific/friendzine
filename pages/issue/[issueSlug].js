import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { gql, request, getPaths, responsiveImageFragment } from '@data/datocms';
import { Image, StructuredText } from 'react-datocms';

import Header from '@components/Header';
import Footer from '@components/Footer';
import SpotifyPlayer from '@components/SpotifyPlayer';
import styles from '@styles/pages/Issue.module.css';

export default function IssuePage({ title, date, cover, content, spotifyUrl, summary, ...fields }) {
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
        {date && (
          <time dateTime={date} pubdate="pubdate" className={styles.date}>
            Published on {date}
          </time>
        )}
        {cover && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image data={cover.responsiveImage} className={styles.coverImage} />
        )}

        {spotifyUrl && (
          <div className={styles.spotifyWrapper}>
            <SpotifyPlayer url={spotifyUrl} />
          </div>
        )}

        {summary && <ReactMarkdown className={styles.summary}>{summary}</ReactMarkdown>}

        <div className="structured-content">
          <StructuredText data={content} />
        </div>
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
