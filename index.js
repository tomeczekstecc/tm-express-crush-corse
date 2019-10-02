const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members')
const app = express();

// Use Middleware
app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//body parser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);


//home page route
app.get('/',(req,res)=>{
  res.render('index',{title:'Member app',members})
})

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}, go to http://localhost:${PORT}`)
);
