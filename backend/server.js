import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

// Start App
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to the Backend!');
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
