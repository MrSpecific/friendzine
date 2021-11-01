import Nav from '@components/Nav';
import styles from '@styles/components/Header.module.css';

const Header = (props) => {
  return (
    <header className={styles.header}>
      {props.children}
      <Nav />
    </header>
  );
};

export default Header;
