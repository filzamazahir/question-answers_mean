var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema called QuestionSchema
var QuestionSchema = new mongoose.Schema({
    question_text: String,
    description: String,
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    created_at: Date
});

//Validations
QuestionSchema.path('question_text').required(true, 'Please provide a question');



mongoose.model ('Question', QuestionSchema); //set this schema as Question in our model

