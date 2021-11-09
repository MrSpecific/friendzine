import { useContext } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames';
import { Squash as Hamburger } from 'hamburger-react';
import { AppContext } from '@data/context';

import styles from '@styles/components/Nav.module.css';

const Nav = () => {
  // console.log(latest);
  const { currentIssue } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);

  const sectionClass = classNames({
    [styles.navSection]: true,
    [styles.active]: isOpen,
  });

  const navClass = classNames({
    [styles.nav]: true,
    [styles.active]: isOpen,
  });

  const overlayClass = classNames({
    [styles.navOverlay]: true,
    [styles.active]: isOpen,
  });

  const closeNav = () => {
    setOpen(false);
  };

  const navLinkClicked = (event) => {
    console.log('navLinkClicked', event);
  };

  return (
    <section className={sectionClass}>
      <div className={overlayClass} onClick={closeNav} />
      <nav className={navClass}>
        <div className={styles.navMain}>
          <ol className={styles.primaryNav} onClick={navLinkClicked}>
            <li className={styles.navItem}>
              <Link href={`/`}>
                <a>Home</a>
              </Link>
            </li>
            {currentIssue && (
              <li className={styles.navItem}>
                <Link href={`/issue/${currentIssue.slug}`}>
                  <a>Current Issue</a>
                </Link>
              </li>
            )}
          </ol>
        </div>
      </nav>
      <div className={styles.navToggleWrapper}>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          className={styles.navToggle}
          duration={0.2}
          color="var(--hamburger-color)"
        />
      </div>
    </section>
  );
};

export default Nav;
