const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/cinema', {useNewUrlParser: true});

  const customerSchema = new mongoose.Schema({
    name: String,
    lastname: String
  });

  const Customer = mongoose.model('Customer', customerSchema);

  const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    genre: [String],
    date: Date,
    stock: Number,
    customers: [{
      name: String,
      lastname: String
    }]
  });


  // const Customer = mongoose.model('Customer', customerSchema);
  const Movie = mongoose.model('Movie', movieSchema);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connection succesful');
});


app.post("/movies", async (req, res) => {
  try {
    var newmovie = new Movie(req.body);
    var result = await newmovie.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/movies", async (req, res) => {
  try {
    var query =  await Movie.find({});
    res.send(query);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var query =  await Movie.findById({"_id": id});
    res.send(query);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/customers", async (req, res) => {
  try {
    var query =  await Customer.find({});
    res.send(query);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/movies/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var query =  await Movie.findById({"_id": id});
    query.set(req.body);
    var result = await query.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/customers/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var query = await Customer.deleteOne({"_id": id});
    res.send(query);
} catch (error) {
    res.status(500).send(error);
}
});

app.listen(3000, () => {
  console.log("Listening at :3000...");
});


//  var padrino = new Movie({
//     title: 'El Padrino',
//     director: 'Francis Ford Coppola',
//     genre: ['Drama', 'Crime'],
//     date: 'October 20, 1972 00:00:00',
//     stock: 3
//   });

  // var uno_nuestros = new Movie({
  //   title: 'Uno de los nuestros',
  //   director: 'Martin Scorsese',
  //   genre: ['Drama', 'Crime', 'Biography'],
  //   date: 'October 19, 1990 00:00:00',
  //   stock: 2
  // });

  // var user_1 = new Customer ({
  //   name: 'Rubén',
  //   lastname: 'Menéndez'
  // });

  // var user_2 = new Customer ({
  //   name: 'Susana',
  //   lastname: 'Menéndez'
  // });

  // var user_3 = new Customer ({
  //   name: 'Mariano',
  //   lastname: 'Rajoy' 
  // });

  // user_1.save(function (err, padrino) {
  //   if (err) return console.error(err);
  //   console.log('Saved!');
  // });

