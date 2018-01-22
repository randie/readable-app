# Readable App

This is the second project in [Udacity's React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019) concluding the "React & Redux" portion of the program.

This is a content and comment web app, similar to [a poor man's] reddit. It does not implement authentication, for example. The main goal of this project is to use Redux to manage application state and React to render the application UI based on its state. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This application was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app).

## API Server

Information about the API server and how to use it can be found in its [README file](server/README.md).

## Usage

Clone this repo:
```bash
git clone https://github.com/randie/readable-app.git
```

Run API server:
```bash
cd readable-app/server
yarn install
yarn start
```

Run client (web app);
```bash
cd readable-app/client
yarn install
yarn start
```
In your browser, navigate to localhost:3000


