import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, request, getPaths, responsiveImageFragment } from '@data/datocms';
import { Image, StructuredText } from 'react-datocms';

import Header from '@components/Header';
import Footer from '@components/Footer';
import SpotifyPlayer from '@components/SpotifyPlayer';
import styles from '@styles/pages/Issue.module.css';

export default function ArticlePage({ title, cover, content, spotifyUrl, ...fields }) {
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
        {cover && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image data={cover.responsiveImage} className={styles.coverImage} />
        )}
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
      # cover {
      #   responsiveImage(imgixParams: { fit: crop, w: 1400, h: 700 }) {
      #     ...responsiveImageFragment
      #   }
      # }
      # content {
      #   value
      # }
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
