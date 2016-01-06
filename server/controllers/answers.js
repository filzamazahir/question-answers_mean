var mongoose = require('mongoose');
var Answer = mongoose.model ('Answer');  
var Question = mongoose.model('Question');

module.exports = {

    create: function(req, res){
        Question.findOne({_id: req.params.questionid}, function(err, question){
            var answer = new Answer({answer_text: req.body.answer_text, details: req.body.details, postedby: req.body.postedby, likes: 0, created_at: new Date()});
            answer._question = req.params.questionid;
            question.answers.push(answer);

            answer.save(function(err, data_added){
                if(err){
                    console.log ("Error: Could not save answer");
                }
                else {
                    console.log ("Answer added successfully!"); 
                    question.save(function(err){
                        if(err) {
                           console.log("ERROR! Couldn't save answer id in question.");
                        } 
                        else {   
                            res.end();
                        }
                    });  
                }         
            });
        });
        
    },

    like: function(req, res){
        Answer.update({_id:req.params.answerid}, {$inc: {likes: 1}}, function (err, answer_updated){
            if (err){
                console.log("Error in adding likes");
            }
            else {
                console.log ("Like added successfully!"); 
                res.json(answer_updated);
            }
        });

    }

}