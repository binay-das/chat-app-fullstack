const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');
const connectToDB = require('./config/connect');
const colors = require('colors');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');

connectToDB();
app.use(express.json());
app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`.yellow.bold);
})