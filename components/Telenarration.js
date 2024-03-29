import { StructuredText } from 'react-datocms';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import styles from '@styles/components/Telenarration.module.css';

export const Question = ({ question }) => {
  return (
    <li className={styles.question}>
      <span className={styles.label}>Question: </span>
      {question}
    </li>
  );
};

export const Answer = ({ name, answer }) => {
  return (
    <li className={styles.answer}>
      <span className={styles.label}>{name}:</span>
      <StructuredText data={answer} />
    </li>
  );
};

const Telenarration = ({ title, intro, entries }) => {
  if (!entries) return null;

  const participants = [];

  return (
    <section className={classNames(['container--narrow', [styles.telenarrationWrapper]])}>
      <h2>{title}</h2>
      {intro && <ReactMarkdown className={styles.intro}>{intro}</ReactMarkdown>}
      <ol className={styles.telenarration}>
        {entries.map((entry) => {
          switch (entry.__typename) {
            case 'QuestionRecord':
              return <Question key={entry.id} {...entry} />;
            case 'AnswerRecord':
              return <Answer key={entry.id} {...entry} />;
            default:
              return null;
          }
        })}
      </ol>
    </section>
  );
};

export default Telenarration;
