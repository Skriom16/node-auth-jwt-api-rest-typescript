import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import authRoutes from './routes/authRoutes'

const app = express()

app.use(express.json())

// Routes
app.use('/auth', authRoutes)
//hacer una api rest de usuarios

export default app