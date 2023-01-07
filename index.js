import express from 'express';

const port = 8000;
const app = express();

app.all('hello', (req, res, next) => {
    console.log('ALL');
    next();
});

const cb = (req, res, next) => {
    console.log('CB');
    next();
};

app.route('/user')
.get('/hello', cb, (req, res) => {
    res.send('Привет!');
})
.post('/hello', cb, (req, res) => {
    res.send('Привет POST!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});