const clone = require('clone');

let db = {};

const defaultData = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1485887641000,
    title: 'Udacity is the best place to learn React',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sitem amet rutrum lectus, volutpat dictum nisl. Duis scelerisque sodales consectetur. Nam tempor vulputate sem, in cursus massa efficitur eu. Integer ligula leo, ultrices id varius a, lobortis eget quam. Duis non placerat libero. Quisque mollis arcu id augue blandit egestas. Proin id nulla felis. Sed ex nulla, varius quis purus sed, tempus molestie metus.',
    author: 'John Oliver',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2,
  },
  '3xf0y6ziyjabvozdd253nd': {
    id: '3xf0y6ziyjabvozdd253nd',
    timestamp: 1489210441000,
    title: 'When to use computed properties on models',
    body:
      'Computed properties are one of the best features of the Ember Object model. They give us an efficient and conventional way to derive state from other properties, which is something that every UI application needs.',
    author: 'Ryan Toronto',
    category: 'ember',
    voteScore: 4,
    deleted: false,
    commentCount: 2,
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1499169902634,
    title: 'Learn Redux in 10 minutes!',
    body:
      'Just kidding. It takes more than 10 minutes to learn technology. Maecenas sit amet rutrum lectus, volutpat dictum nisl. Duis scelerisque sodales consectetur.',
    author: 'Trevor Noah',
    category: 'redux',
    voteScore: 4,
    deleted: false,
    commentCount: 0,
  },
  '2ni6ok3ym7mf1p33lnez': {
    id: '2ni6ok3ym7mf1p33lnez',
    timestamp: 1505479067190,
    title: 'Redux Manages App State',
    body:
      'Just kidding. It takes more than 10 minutes to learn technology. Maecenas sit amet rutrum lectus, volutpat dictum nisl. Duis scelerisque sodales consectetur.',
    author: 'Stephen Colbert',
    category: 'udacity',
    voteScore: 1,
    deleted: false,
    commentCount: 0,
  },
  '1xf0y6ziyjabvozdd253nd': {
    id: '1xf0y6ziyjabvozdd253nd',
    timestamp: 1500990072634,
    title: 'Ipsom Dolor Sit Amet',
    body:
      'Ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet rutrum lectus, volutpat dictum nisl. Duis scelerisque sodales consectetur. Nam tempor vulputate sem, in cursus massa efficitur eu. Integer ligula leo, ultrices id varius a, lobortis eget quam. Duis non placerat libero. Quisque mollis arcu id augue blandit egestas. Proin id nulla felis. Sed ex nulla, varius quis purus sed, tempus molestie metus.',
    author: 'Jimmy Fallon',
    category: 'react',
    voteScore: 2,
    deleted: false,
    commentCount: 4,
  },
  '4xf0y6ziyjabvozdd253nd': {
    id: '4xf0y6ziyjabvozdd253nd',
    timestamp: 1507683845000,
    title: 'Tracking Form Completion in Google Analytics With Redux',
    body:
      'Ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet rutrum lectus, volutpat dictum nisl. Duis scelerisque sodales consectetur. Nam tempor vulputate sem, in cursus massa efficitur eu. Integer ligula leo, ultrices id varius a, lobortis eget quam. Duis non placerat libero. Quisque mollis arcu id augue blandit egestas. Proin id nulla felis. Sed ex nulla, varius quis purus sed, tempus molestie metus.',
    author: 'Tiny Fey',
    category: 'redux',
    voteScore: 0,
    deleted: false,
    commentCount: 4,
  },
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByCategory(token, category) {
  return new Promise(res => {
    let posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted,
    );
    res(filtered_keys.map(key => posts[key]));
  });
}

function get(token, id) {
  return new Promise(res => {
    const posts = getData(token);
    res(posts[id].deleted ? {} : posts[id]);
  });
}

function getAll(token) {
  return new Promise(res => {
    const posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(key => !posts[key].deleted);
    res(filtered_keys.map(key => posts[key]));
  });
}

function add(token, post) {
  return new Promise(res => {
    let posts = getData(token);

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0,
    };

    res(posts[post.id]);
  });
}

function vote(token, id, option) {
  return new Promise(res => {
    let posts = getData(token);
    post = posts[id];
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1;
        break;
      case 'downVote':
        post.voteScore = post.voteScore - 1;
        break;
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`);
    }
    res(post);
  });
}

function disable(token, id) {
  return new Promise(res => {
    let posts = getData(token);
    posts[id].deleted = true;
    res(posts[id]);
  });
}

function edit(token, id, post) {
  return new Promise(res => {
    let posts = getData(token);
    for (prop in post) {
      posts[id][prop] = post[prop];
    }
    res(posts[id]);
  });
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token);
  if (data[id]) {
    data[id].commentCount += count;
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter,
};
