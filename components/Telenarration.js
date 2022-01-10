import { StructuredText } from 'react-datocms';
import classNames from 'classnames';
import styles from '@styles/components/Telenarration.module.css';

export const Question = ({ question }) => {
  return <li className={styles.question}>Question: {question}</li>;
};

export const Answer = ({ name, answer }) => {
  return (
    <li className={styles.answer}>
      {name}:
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
      {intro && <div className={styles.intro}>{intro}</div>}
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
