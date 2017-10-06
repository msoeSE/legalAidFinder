import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_CATEGORY,
  DELETE_CATEGORIES,
  ADD_CATEGORIES,
  addCategory,
  deleteCategory,
  addCategories,
} from '../CategoryActions';

const post = { name: 'Prashant', parent: 'Hello Mern', cuid: 'f34gb2bh24b24b2', subcategories: "All cats meow 'mern!'", slug: 'hello-mern', _id: 1 };

test('should return the correct type for addCategory', actionTest(
  addCategory,
  post,
  { type: ADD_CATEGORY, category: post },
));

test('should return the correct type for deleteCategory', actionTest(
  deleteCategory,
  post.cuid,
  { type: DELETE_CATEGORIES, cuid: post.cuid },
));

test('should return the correct type for addCategories', actionTest(
  addCategories,
  [post],
  { type: ADD_CATEGORIES, categories: [post] },
));
