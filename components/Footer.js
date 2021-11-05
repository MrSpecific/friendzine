import styles from '@styles/components/Footer.module.css';
import InstagramLogo from './svg/instagram.svg';
import TwitterLogo from './svg/twitter.svg';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <a href="//instagram.com/frndzine" target="_blank" rel="noopener noreferrer">
        <InstagramLogo />
        <span className="visually-hidden">Instagram</span>
      </a>
      <a href="//twitter.com/frndzine" target="_blank" rel="noopener noreferrer">
        <TwitterLogo />
        <span className="visually-hidden">Twitter</span>
      </a>
    </footer>
  );
};

export default Footer;
