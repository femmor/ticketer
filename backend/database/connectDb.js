import mongoose from 'mongoose';

export const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection established...');
  } catch (error) {
    console.log('Error connecting to the database: ' + error);
    process.exit(1);
  }
};
