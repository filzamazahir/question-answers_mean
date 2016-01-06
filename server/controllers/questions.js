var mongoose = require('mongoose');
var Question = mongoose.model ('Question');  


module.exports = {

    showall: function(req, res){
        Question.aggregate([{$match: { prefernce: null }}, {$project: {_id: "$_id", question_text: "$question_text", description: "$description", created_at: "$created_at", answers_count: {$size: "$answers"}}}]).sort({created_at: -1}).exec(function(err, questions){
            if (err) {
                console.log ("Error: Could not retrieve data");
            }
            else {
                console.log(questions);
                res.json(questions);
            }
        });
    },

    create: function(req, res){
        var question = new Question({question_text: req.body.question_text, description: req.body.description, created_at: new Date()});
        question.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add user");
            }
            else {
                console.log ("User added successfully!"); 
                res.json(data_added);
            }
            
        });
    },

    findbyid: function(req,res) {
        Question.findOne({_id: req.params.id}).populate('answers').exec(function(err, docs){
            if (err) {
                console.log("Error retreiving a user by id");
            }
            else {
                var options = {path: 'answers.postedby', model: 'User'};
                Question.populate(docs, options, function(err, question){
                    if(err) {
                        console.log("Error populating the user who posted the answer");
                    }   
                    else {
                        res.json(question);
                    } 
                });
            }
        });
    }

}