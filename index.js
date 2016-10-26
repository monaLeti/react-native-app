const path = require('path')
const express = require ('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('.hbs',exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir : path.join(__dirname, 'client/html/views')
}))

app.set('view engine', '.hbs')
app.set('views','client/html')

app.get('/', function(request, response){
  response.render('home', {
    name: 'John'
  })
})

app.listen(port, function(err){
  if(err){
    return
      console.log('Something bad happen',err);
  }
  console.log('Server listening in port',port);
})
