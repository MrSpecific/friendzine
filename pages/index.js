import Head from 'next/head';
import { Image } from 'react-datocms';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import { responsiveImageFragment, request } from '@data/datocms';

import Header from '@components/Header';
import Footer from '@components/Footer';
import IssueCard from '@components/IssueCard';
import styles from '@styles/pages/Home.module.css';

const { log } = console;

export default function Home({ issues }) {
  // const { allIssues } = data;
  const featured = issues[0];
  const more = issues.slice(1, issues.length);

  return (
    <div className={styles.container}>
      <Head>
        <title>Friendzine</title>
      </Head>

      <Header>
        <h1>Friendzine</h1>
      </Header>

      <main className="container">
        <div>
          <h2>Current Issue</h2>
          <IssueCard {...featured} />
          {more.length ? (
            <>
              <h2>More Issues</h2>
              <ol className={styles.issuesList}>
                {more.map((issue) => {
                  return <IssueCard {...issue} key={issue.id} />;
                })}
              </ol>
            </>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}

const HOMEPAGE_QUERY = gql`
  query HomePage($limit: IntType) {
    allIssues(first: $limit, orderBy: [date_DESC]) {
      id
      title
      slug
      date
      cover {
        responsiveImage(imgixParams: { fit: crop, w: 1200, h: 600 }) {
          ...responsiveImageFragment
        }
      }
    }
  }

  ${responsiveImageFragment}
`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 },
    preview: false,
  });

  return {
    props: { issues: [...data.allIssues] },
  };
}
