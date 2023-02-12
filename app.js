const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Blog = require('./models/blog');

const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://rupali1234:rupali1234@cluster0.5ca4w.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000);
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })

// register view engine
app.set('view engine', 'ejs');


// middleware
// app.use((req, res, next) => {
//     console.log('middleware');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })

// middleware for static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog',
//         snippet: 'about blog',
//         body: "more about new blog"
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });



// app.get('/single-blog', (req, res) => {
//     Blog.findById('63e8c5b92032ecd0093590f3')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// });

app.get('/', (req, res) => {
    const blogs = [
        {title: 'test1', snippet: 'Lorem ipsum test1'},
        {title: 'test2', snippet: 'Lorem ipsum test2'},
        {title: 'test3', snippet: 'Lorem ipsum test3'},
    ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch(err => console.log(err));
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog'});
})
// redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
})