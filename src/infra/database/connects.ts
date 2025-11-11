import mongoose from 'mongoose';

export async function connectDatabase() {
    mongoose.connect(process.env.MONGO_URI!).then(() => console.log('Database connected!'))
}
