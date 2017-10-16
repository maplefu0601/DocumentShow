var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

var documents = [
		"Something was shining on the wall ahead. They approached slowly, squinting through the darkness. Foot-high words had been daubed on the wall between two windows, shimmering and shining in the light cast by the flaming torches. the chamber of secrets has been opened. enemies of the heir, beware",

		"The voice was growing fainter. Harry was sure it was moving away - moving away and further. A mixture of fear and excitement gripped him as he stared at the dark ceiling; how could it be moving away and upward? Was it a phantom, to whom stone ceilings didn't matter? This way, he shouted, and he began to run, up the stairs, into the entrance hall. It was no good hoping to hear anything here, the babble of talk from the Halloween feast was echoing out of the Great Hall. Harry sprinted up the marble staircase to the first floor, Ron and Hermione clattering behind him",
		
		"Fascinated, Harry thumbed through the rest of the envelope's contents. Why on earth did Filch want a Kwikspell course? Did this mean he wasn't a proper wizard? Harry was just reading Lesson One: Holding Your Wand (Some Useful Tips) when shuffling footsteps outside told him Filch was coming back. Stuffing the parchment back into the envelope, Harry threw it back onto the desk just as the door opened.",
		
    	"Harry was staring at him, alarmed; Filch had never looked madder. His eyes were popping, a tic was going in one of his pouchy cheeks, and the tartan scarf didn't help. Amazed at his luck, Harry sped out of the office, up the corridor, and back upstairs. To escape from Filch's office without punishment was probably some kind of school record. Nearly Headless Nick came gliding out of a classroom. Behind him, Harry could see the wreckage of a large black-and-gold cabinet that appeared to have been dropped from a great height. Nearly Headless Nick stopped in his tracks and Harry walked right through him. He wished he hadn't; it was like stepping through an icy shower",
];


app.get('/', (req, res) => {
  console.log('Welcome');
  res.send('HEY!');
})

app.post('/user', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log('checking username and password.');
  if(req.body.username==='test' && req.body.password==='test') {  
    res.jsonp({success:true});
  } else {
    res.jsonp({success:false, error:'Invalid username or password.'});
  }
});

app.get('/documents/:id', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var id = req.params.id;
  console.log('getting id '+id);
  if(id < 1 || id > 4) {
    res.status(404).end('404 Not Found');
  } else {
    res.jsonp({success:true, doc: documents[id-1]});  
  }

});

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;

