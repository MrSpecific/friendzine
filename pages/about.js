import Head from 'next/head';
import { Image } from 'react-datocms';
import classNames from 'classnames';
import { gql, responsiveImageFragment, request } from '@data/datocms';

import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '@styles/pages/About.module.css';

const { log } = console;

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>About the Friendzine</title>
      </Head>

      <Header>
        <h1>About the Friendzine</h1>
      </Header>

      <main className="container">
        Feeding Friendzine was created by Trevor Peterson. <br />
        Website developed by <a href="https://willchristenson.com">Will Christenson</a>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { authors: 'Will, Trevor' },
  };
}
