import { StructuredText } from 'react-datocms';
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

  return (
    <section className={styles.telenarrationWrapper}>
      <h2>{title}</h2>
      {intro && <div className="intro">{intro}</div>}
      <ol className={styles.telenarration}>
        {entries.map((entry) => {
          switch (entry.__typename) {
            case 'QuestionRecord':
              return <Question {...entry} />;
            case 'AnswerRecord':
              return <Answer {...entry} />;
            default:
              return null;
          }
        })}
      </ol>
    </section>
  );
};

export default Telenarration;
