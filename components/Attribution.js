import styles from '@styles/components/Attribution.module.css';

export const PublishedDate = ({ date, className, hideLabel = false }) => {
  if (!date) return null;

  const dateObj = new Date(date);

  return (
    <time dateTime={date} pubdate="pubdate" className={className}>
      <span className={hideLabel ? 'visually-hidden' : null}>
        Published {JSON.stringify(hideLabel, null, 2)} on{' '}
      </span>
      {dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </time>
  );
};

export const Authors = ({ authors, className }) => {
  return <ul className={className}>Authors</ul>;
};

export const Attribution = ({ date }) => {
  return (
    <div className="attribution">
      <PublishedDate date={date} className={styles.date} />
    </div>
  );
};

export default Attribution;
