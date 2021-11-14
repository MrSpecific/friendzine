import Link from 'next/link';
import { Image } from 'react-datocms';
import classNames from 'classnames';

import styles from '@styles/components/ArticleCard.module.css';

export const ArticleList = ({ articles, className }) => {
  return (
    <ol className={classNames([[styles.articleList], { [className]: !!className }])}>
      {articles.map((article) => {
        return (
          <li className={styles.articleListItem} key={article.slug}>
            <ArticleCard {...article} />
          </li>
        );
      })}
    </ol>
  );
};

const ArticleCard = ({ title, date, featuredImage, slug }) => {
  return (
    <article className={styles.articleCard}>
      {featuredImage && (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image data={featuredImage.responsiveImage} />
      )}
      <h3 className={styles.cardHeading}>
        <Link href={`/article/${slug}`}>
          <a className={styles.articleLink}>{title}</a>
        </Link>
      </h3>
    </article>
  );
};

export default ArticleCard;
