const express = require('express');

const app = express();

app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

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