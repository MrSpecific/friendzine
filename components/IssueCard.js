import Link from 'next/link';
import { Image } from 'react-datocms';
import classNames from 'classnames';

import Nav from '@components/Nav';
import { PublishedDate } from '@components/Attribution';
import styles from '@styles/components/IssueCard.module.css';

const IssueCard = ({ title, date, cover, slug }) => {
  return (
    <article className={styles.issueCard}>
      {cover && (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image data={cover.responsiveImage} className={styles.coverImage} />
      )}
      <h3 className={styles.cardHeading}>
        <Link href={`/issue/${slug}`}>
          <a className={styles.articleLink}>{title}</a>
        </Link>
        <PublishedDate date={date} hideLabel={'blahh'} className={styles.date} />
      </h3>
    </article>
  );
};

export default IssueCard;
