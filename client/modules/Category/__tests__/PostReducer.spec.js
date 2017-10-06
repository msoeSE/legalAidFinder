import test from 'ava';
import { reducerTest } from 'redux-ava';
import postReducer, { getCategory, getCategories } from '../CategoryReducer';
import { addCategory, deleteCategory, addCategories } from '../CategoryActions';

test('action for ADD_CATEGORY is working', reducerTest(
  postReducer,
  { data: ['foo'] },
  addCategory({
    name: 'prank',
    parent: 'first post',
    subcategories: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }),
  { data: [{
    name: 'prank',
    parent: 'first post',
    subcategories: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }, 'foo'] },
));

test('action for DELETE_CATEGORIES is working', reducerTest(
  postReducer,
  { data: [{
    name: 'prank',
    parent: 'first post',
    subcategories: 'Hello world!',
    cuid: 'abc',
    _id: 1,
    slug: 'first-post',
  }] },
  deleteCategory('abc'),
  { data: [] },
));

test('action for ADD_CATEGORIES is working', reducerTest(
  postReducer,
  { data: [] },
  addCategories([
    {
      name: 'prank',
      parent: 'first post',
      subcategories: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-post',
    },
  ]),
  { data: [{
    name: 'prank',
    parent: 'first post',
    subcategories: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }] },
));

test('getCategories selector', t => {
  t.deepEqual(
    getCategories({
      categories: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getCategory selector', t => {
  t.deepEqual(
    getCategory({
      categories: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});

