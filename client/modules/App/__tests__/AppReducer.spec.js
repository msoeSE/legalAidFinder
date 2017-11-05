import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddPost } from '../AppReducer';
import { toggleAddPost } from '../AppActions';

test('action for TOGGLE_ADD_POST is working', reducerTest(
  appReducer,
  { showAddCategory: false },
  toggleAddPost(),
  { showAddCategory: true },
));

test('getShowAddPost selector', t => {
  t.is(getShowAddPost({
    app: { showAddCategory: false },
  }), false);
});
