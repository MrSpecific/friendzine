import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, request, getPaths, responsiveImageFragment } from '@data/datocms';
import { Image, StructuredText } from 'react-datocms';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Attribution from '@components/Attribution';
// import SpotifyPlayer from '@components/SpotifyPlayer';
import Telenarration from '@components/Telenarration';
import styles from '@styles/pages/Issue.module.css';

const inlineRecordHandler = ({ record }) => {
  console.log(record);
  // return <h2>{record.__typename}</h2>;
  switch (record.__typename) {
    case 'TelenarrationRecord':
      return <Telenarration {...record} />;
    default:
      return null;
  }
};

export default function ArticlePage({
  title,
  date,
  featuredImage,
  content,
  spotifyUrl,
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

        {featuredImage && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image data={featuredImage.responsiveImage} className={styles.coverImage} />
        )}

        <div className="structured-content">
          <StructuredText data={content} renderInlineRecord={inlineRecordHandler} />
        </div>
      </main>

      <Footer />
    </article>
  );
}

const SLUGS_QUERY = gql`
  {
    allArticles {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const data = await request({
    query: SLUGS_QUERY,
    preview: false,
  });

  const paths = getPaths(data.allArticles, 'articleSlug');

  return {
    paths,
    fallback: false,
  };
}

const SINGLE_ARTICLE_QUERY = gql`
  query Issue($slug: String) {
    article(filter: { slug: { eq: $slug } }) {
      title
      date
      slug
      featuredImage {
        responsiveImage(imgixParams: { fit: crop, w: 1400, h: 700 }) {
          ...responsiveImageFragment
        }
      }
      content {
        value
        links {
          __typename
          ... on TelenarrationRecord {
            id
            title
            intro
            entries {
              __typename
              ... on QuestionRecord {
                id
                question
              }
              ... on AnswerRecord {
                id
                name
                answer {
                  value
                }
              }
            }
          }
        }
      }
      # spotifyUrl
    }
  }
  ${responsiveImageFragment}
`;

export async function getStaticProps({ params }) {
  const data = await request({
    query: SINGLE_ARTICLE_QUERY,
    variables: { slug: params.articleSlug },
    preview: false,
  });

  return {
    props: { ...data.article },
  };
}
