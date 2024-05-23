import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import SuperPlace from './models/superplace.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mongoose.connect('mongodb://localhost:27017/super-place')

const db = mongoose.connection

db.on(
  'error',
  console.error.bind(console, '[Error] -> Database Connection Error: ')
)

db.once('open', () => {
  console.log('Database connected!')
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home')
})
app.get('/superplace', async (req, res) => {
  const superplace = new SuperPlace({
    title: 'Backyard Night Date',
    description: 'Invite you belove one to a night date at an amazing Backyard',
    price: '60.00',
    location: 'Santo Domingo Este, Dominican Republic',
  })
  await superplace.save()
  res.send(superplace)
})

app.listen(3000, ()=>{
  console.log('[INFO] - 🖥 server listening on port 3000')
})