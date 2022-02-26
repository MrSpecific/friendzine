import styles from '@styles/components/Footer.module.css';
import InstagramLogo from './svg/instagram.svg';
import TwitterLogo from './svg/twitter.svg';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.attribution}>
        &copy; 2021-2022 Trevor Peterson &amp; Will Christenson
      </div>
      <div className={styles.footerSocials}>
        <a href="//instagram.com/frndzine" target="_blank" rel="noopener noreferrer">
          <InstagramLogo />
          <span className="visually-hidden">Instagram</span>
        </a>
        <a href="//twitter.com/frndzine" target="_blank" rel="noopener noreferrer">
          <TwitterLogo />
          <span className="visually-hidden">Twitter</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
