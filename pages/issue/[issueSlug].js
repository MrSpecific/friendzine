import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, request, getPaths, responsiveImageFragment } from '@data/datocms';
import { Image, StructuredText } from 'react-datocms';

import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '@styles/pages/Issue.module.css';

export default function IssuePage({ title, cover, content, ...fields }) {
  const router = useRouter();
  const id = router.query;

  return (
    <article className={styles.container}>
      <Head>
        <title>Friendzine</title>
      </Head>

      <Header>
        <h1>{title}</h1>
      </Header>

      <main className="container">
        {cover && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image data={cover.responsiveImage} className={styles.featuredCoverImage} />
        )}

        <div className={styles.contentWrapper}>
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