var mongoose = require('mongoose');
var User = mongoose.model ('User');  

module.exports = {

   

    findbyname: function(req,res) {
        User.findOne({name: req.params.name}, function(err, user) {
            if (err) {
                console.log("Error retreiving a user by name");
            }
            else {
                res.json(user);
            }
        });
    },


    create: function(req, res){
        var user = new User({name: req.body.name, created_at: new Date()});
        user.save(function(err, data_added){
            if(err){
                console.log ("Error: Could not add user");
            }
            else {
                res.json(data_added);
            }
            
        });
    }
}

