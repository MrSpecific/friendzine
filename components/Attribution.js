import styles from '@styles/components/Attribution.module.css';

const Attribution = ({ date }) => {
  return (
    <div className="attribution">
      {date && (
        <time dateTime={date} pubdate="pubdate" className={styles.date}>
          Published on {date}
        </time>
      )}
    </div>
  );
};

export default Attribution;
