import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

if (process.argv[1].endsWith('index.js')) {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}

export default app;
