var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema called UserSchema
var UserSchema = new mongoose.Schema({
    name: String,
    created_at: Date
});

//Validations
UserSchema.path('name').required(true, 'Name cannot be blank');


mongoose.model ('User', UserSchema); //set this schema as User in our model