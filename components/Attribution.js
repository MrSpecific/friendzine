import styles from '@styles/components/Attribution.module.css';

const Attribution = ({ date }) => {
  const dateObj = date && new Date(date);
  return (
    <div className="attribution">
      {date && (
        <time dateTime={date} pubdate="pubdate" className={styles.date}>
          Published on{' '}
          {dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      )}
    </div>
  );
};

export default Attribution;
