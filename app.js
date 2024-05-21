import express from 'express'

const app = express()

app.listen(3000, ()=>{
  console.log('[INFO] - Application listening on port 3000')
})