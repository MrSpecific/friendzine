import PDFIcon from './svg/pdf.svg';
import styles from '@styles/components/PDFLink.module.css';

const PDFLink = ({ pdf }) => {
  if (!pdf) return null;
  return (
    <a href={pdf.url} className={styles.pdfLink}>
      <PDFIcon /> Download this issue
    </a>
  );
};

export default PDFLink;
