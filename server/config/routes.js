//To get the controllers - save them in appropriate variables
var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
var answers = require('../controllers/answers.js');


module.exports = function(app){
     
    app.get('/users/findonebyname/:name', users.findbyname);
    app.post('/users/new/', users.create);  
    
    app.get('/questions', questions.showall);
    app.post('/questions/new', questions.create);
    app.get('/questions/:id', questions.findbyid);

    app.post('/answers/new/:questionid', answers.create);
    app.get('/answers/like/:answerid', answers.like);

}