const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');


dotenv.config();
connectDB();
const app = express();


app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is Running');
    });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log("Server running at " + PORT);
})
