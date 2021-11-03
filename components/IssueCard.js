import Link from 'next/link';
import { Image } from 'react-datocms';
import classNames from 'classnames';

import Nav from '@components/Nav';
import styles from '@styles/components/IssueCard.module.css';

const IssueCard = ({ title, cover, slug }) => {
  return (
    <article className={styles.articlePreview}>
      {cover && (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image data={cover.responsiveImage} className={styles.featuredCoverImage} />
      )}
      <h3>
        <Link href={`/issue/${slug}`}>
          <a>{title}</a>
        </Link>
      </h3>
    </article>
  );
};

export default IssueCard;
