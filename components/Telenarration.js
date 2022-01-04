import { StructuredText } from 'react-datocms';

export const Question = ({ question }) => {
  return <li className="question">Question: {question}</li>;
};

export const Answer = ({ name, answer }) => {
  return (
    <li className="answer">
      {name}:
      <StructuredText data={answer} />
    </li>
  );
};

const Telenarration = ({ title, intro, entries }) => {
  if (!entries) return null;

  return (
    <section className="telenarrationWrapper">
      <h2>{title}</h2>
      {intro && <div className="intro">{intro}</div>}
      <ol className="telenarration">
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
