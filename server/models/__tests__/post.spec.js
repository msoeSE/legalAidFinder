import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Post from '../post';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial categories added into test db
const posts = [
  new Post({ name: 'Prashant', parent: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', subcategories: "All cats meow 'mern!'" }),
  new Post({ name: 'Mayank', parent: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', subcategories: "All dogs bark 'mern!'" }),
];

test.beforeEach('connect and add two category entries', t => {
  connectDB(t, () => {
    Post.create(posts, err => {
      if (err) t.fail('Unable to create categories');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly give number of Posts', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/categories')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(posts.length, res.body.categories.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const post = new Post({ name: 'Foo', parent: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', subcategories: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .get('/api/categories/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.category.name, post.name);
});

test.serial('Should correctly add a category', async t => {
  t.plan(2);

  const res = await request(app)
    .category('/api/categories')
    .send({ category: { name: 'Foo', parent: 'bar', subcategories: 'Hello Mern says Foo' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPost = await Post.findOne({ parent: 'bar' }).exec();
  t.is(savedPost.name, 'Foo');
});

test.serial('Should correctly delete a category', async t => {
  t.plan(2);

  const post = new Post({ name: 'Foo', parent: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', subcategories: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .delete(`/api/posts/${post.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedPost = await Post.findOne({ cuid: post.cuid }).exec();
  t.is(queriedPost, null);
});

