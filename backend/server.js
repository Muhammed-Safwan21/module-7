const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const databaseConnection = require('./config/databaseConnection')
const app = express();
const cors = require('cors')


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));  
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

databaseConnection();

app.use('/api/user', userRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});