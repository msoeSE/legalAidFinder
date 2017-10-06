import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import PostListItem from '../../components/CategoryListItem/CategoryListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const post = { name: 'Prashant', parent: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', subcategories: "All cats meow 'mern!'" };
const props = {
  post,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <PostListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-category'));
  t.is(wrapper.find('Link').first().prop('children'), post.parent);
  t.regex(wrapper.find('.author-name').first().text(), new RegExp(post.name));
  t.is(wrapper.find('.category-desc').first().text(), post.subcategories);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <PostListItem {...props} />
  );

  t.deepEqual(wrapper.prop('post'), props.category);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <PostListItem post={post} onDelete={onDelete} />
  );

  wrapper.find('.category-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
