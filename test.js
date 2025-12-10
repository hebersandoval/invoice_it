require('dotenv');
const mongoose = require('mongoose');

const Post = require('./database/models/Post');

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.akwssxp.mongodb.net/`)
    .then((result) => {
        console.log('Connected to Mongodb.');
    })
    .catch((err) => {
        console.log(err);
    });

const post = {
    title: 'Me second blog post',
    description: 'Blog post description here 2',
    content: 'Lorem ipsum text content here we go 2.',
};

Post.create(post)
    .then(() => {
        console.log('Post inserted succesfully!');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error inserting post:', err);
        mongoose.connection.close();
    });

/*
Post.create({
    title: 'Me first blog post',
    description: 'Blog post description here',
    content: 'Lorem ipsum text content here we go.',
});
*/
