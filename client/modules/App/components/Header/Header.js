import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from './Header.css';


// Import Images
import wi from '../../wisconsin-29073_960_720.png';

export function Header(props, context) {
  // const languageNodes = props.intl.enabledLanguages.map(
  //   lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  // );

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <img className={styles.wiLogo} alt="Wisconsin" src="http://images.clipartpanda.com/wisconsin-clipart-wisconsin-outline-clipart-1.jpg" />
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  toggleAddCategory: PropTypes.func.isRequired,
  // switchLanguage: PropTypes.func.isRequired,
  // intl: PropTypes.object.isRequired,
};

export default Header;
