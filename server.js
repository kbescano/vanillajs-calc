import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.static('public'));

const __dirname = path.resolve()

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
  });

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  const PORT = process.env.PORT || 5000

  app.listen(PORT, console.log(`Server running in mode on port ${PORT}`))