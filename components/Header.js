import classNames from 'classnames';

import Nav from '@components/Nav';
import styles from '@styles/components/Header.module.css';

const Header = (props) => {
  const headerClass = classNames(['container', styles.header]);
  return (
    <header className={headerClass}>
      {props.children}
      <Nav />
    </header>
  );
};

export default Header;
