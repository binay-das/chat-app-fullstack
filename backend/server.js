const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const connectToDB = require('./config/connect');
const colors = require('colors');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

connectToDB();
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`.yellow.bold);
})