import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import SuperPlace from './models/superplace.js'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import morgan from 'morgan'
import ejsMate from 'ejs-mate'
import catchAsyncError from './util/catchAsyncError.js'
import ExpressError from './util/ExpressError.js'

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
app.use(express.static(path.join(__dirname, 'resources')))
app.use(express.static(path.join(__dirname, 'styles')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get(
  '/superplaces',
  catchAsyncError(async (req, res) => {
    const superplaces = await SuperPlace.find({})
    res.render('superplaces/index', { superplaces })
  })
)

app.get(
  '/superplaces/new',
  catchAsyncError(async (req, res) => {
    res.render('superplaces/new')
  })
)

app.post(
  '/superplaces',
  catchAsyncError(async (req, res, next) => {
    const superPlace = new SuperPlace(req.body.superplace)
    await superPlace.save()
    res.redirect(`/superplaces/${superPlace._id}`)
  })
)

app.get(
  '/superplaces/:id',
  catchAsyncError(async (req, res) => {
    const id = req.params.id
    const superPlace = await SuperPlace.findById(id)
    res.render('superplaces/show', { superPlace })
  })
)

app.get(
  '/superplaces/:id/edit',
  catchAsyncError(async (req, res) => {
    const id = req.params.id
    const superPlace = await SuperPlace.findById(id)
    res.render('superplaces/edit', { superPlace })
  })
)

app.put(
  '/superplaces/:id',
  catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const sp = await SuperPlace.findByIdAndUpdate(id, {
      ...req.body.superplace,
    })
    res.redirect(`/superplaces/${sp._id}`)
  })
)

app.delete(
  '/superplaces/:id',
  catchAsyncError(async (req, res) => {
    const { id } = req.params
    await SuperPlace.findByIdAndDelete(id)
    res.redirect('/superplaces')
  })
)

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err
  if (!err.message) err.message = 'Something went wrong'
  res.status(statusCode).render('error', { err })
})

app.listen(3000, ()=>{
  console.log('[INFO] - 🖥 server listening on port 3000')
})