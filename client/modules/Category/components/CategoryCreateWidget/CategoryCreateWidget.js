import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Style
import styles from './CategoryCreateWidget.css';

export class CategoryCreateWidget extends Component {
  addCategory = () => {
    const nameRef = this.refs.name;
    const parentRef = this.refs.parent;

    if (nameRef.value) {
      this.props.addCategory(nameRef.value, parentRef.value);
      nameRef.value = parentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddCategory ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewCategory" /></h2>
          <input placeholder="Category Name" className={styles['form-field']} ref="name" />
          {/* {this.props.intl.messages.authorName} */}
          <input placeholder="Parent" className={styles['form-field']} ref="parent" />
          <textarea placeholder="Sub-Categories" className={styles['form-field']} ref="subcategories" />
          <a className={styles['category-submit-button']} href="#" onClick={this.addCategory}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CategoryCreateWidget.propTypes = {
  addCategory: PropTypes.func.isRequired,
  showAddCategory: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CategoryCreateWidget);
