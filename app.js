import express from 'express';

const app = express();

app.set('view engine', 'ejs');

//enable static file serving
app.use(express.static('public'));


const PORT = 3004;

app.get('/', (req, res) => {
    res.render('home');
});


// start listening to server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});