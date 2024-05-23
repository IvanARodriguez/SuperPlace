import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import SuperPlace from './models/superplace.js'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import morgan from 'morgan'

mongoose.connect('mongodb://localhost:27017/super-place')

const db = mongoose.connection

db.on(
  'error',
  console.error.bind(console, '[Error] -> Database Connection Error: ')
)

db.once('open', () => {
  console.log('Database connected!')
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/superplaces', async (req, res) => {
  const superplaces = await SuperPlace.find({})
  res.render('superplaces/index', { superplaces })
})

app.get('/superplaces/new', async (req, res) => {
  res.render('superplaces/new')
})

app.post('/superplaces', async (req, res) => {
  const superPlace = new SuperPlace(req.body.superplace)
  await superPlace.save()
  res.redirect(`/superplaces/${superPlace._id}`)
})

app.get('/superplaces/:id', async (req, res) => {
  const id = req.params.id
  const superPlace = await SuperPlace.findById(id)
  res.render('superplaces/show', { superPlace })
})

app.get('/superplaces/:id/edit', async (req, res) => {
  const id = req.params.id
  const superPlace = await SuperPlace.findById(id)
  res.render('superplaces/edit', { superPlace })
})

app.put('/superplaces/:id', async (req, res) => {
  const { id } = req.params
  const sp = await SuperPlace.findByIdAndUpdate(id, { ...req.body.superplace })
  res.redirect(`/superplaces/${sp._id}`)
})

app.delete('/superplaces/:id', async (req, res) => {
  const { id } = req.params
  await SuperPlace.findByIdAndDelete(id)
  res.redirect('/superplaces')
})

app.listen(3000, ()=>{
  console.log('[INFO] - 🖥 server listening on port 3000')
})