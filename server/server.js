import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import listingsRouter from './src/routes/listings.js'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/uploads', express.static('uploads'));

app.use('/api', express.json())
app.use('/api', listingsRouter)

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000
console.log('MONGODB_URI', MONGODB_URI)
mongoose.connect(MONGODB_URI).then(()=>{
  console.log('Mongo connected')
  app.listen(PORT, ()=> console.log('API on :'+PORT))
}).catch(err=>{
  console.error('Mongo error', err)
  process.exit(1)
})
