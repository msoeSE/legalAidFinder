import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { CategoryCreateWidget } from '../../components/CategoryCreateWidget/CategoryCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addPost: () => {},
  showAddPost: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <CategoryCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewPost" />));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddCategory is false', t => {
  const wrapper = mountWithIntl(
    <CategoryCreateWidget {...props} />
  );

  wrapper.setProps({ showAddCategory: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <CategoryCreateWidget {...props} />
  );

  t.is(wrapper.prop('addAgency'), props.addCategory);
  t.is(wrapper.prop('showAddCategory'), props.showAddCategory);
});

test('calls addAgency', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <CategoryCreateWidget addPost={addPost} showAddCategory/>
  );

  wrapper.ref('name').get(0).value = 'David';
  wrapper.ref('title').get(0).value = 'Some Title';
  wrapper.ref('content').get(0).value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.calledOnce);
  t.truthy(addPost.calledWith('David', 'Some Title', 'Bla Bla Bla'));
});

test('empty form doesn\'t call addAgency', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <CategoryCreateWidget addPost={addPost} showAddCategory/>
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addPost.called);
});
