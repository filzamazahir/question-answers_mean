var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema called AnswerSchema
var AnswerSchema = new mongoose.Schema({
    answer_text: String,
    details: String,
    postedby: {type: Schema.Types.ObjectId, ref: 'User'},
    _question: {type: Schema.Types.ObjectId, ref: 'Question'},
    likes: Number,
    created_at: Date
});
//Validations
AnswerSchema.path('answer_text').required(true, 'Answer cannot be blank');


mongoose.model ('Answer', AnswerSchema); //set this schema as Answer in our model