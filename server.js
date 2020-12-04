const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root : __dirname + '/public/views'})
})
app.listen(PORT, () => {
  console.log('server listening on port' + PORT)
})