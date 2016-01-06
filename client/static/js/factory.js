//Answer Factory
questions_answers_app.factory('AnswerFactory', function($http){
    var factory = {};

    factory.addAnswerForAQuestion = function (newdata, questionid, callback) {
        $http.post('/answers/new/'+questionid, newdata).success(function(output){
            callback();
        });
    }

    factory.addLike = function (answerid, callback) {
        $http.get('/answers/like/'+answerid).success(function(output){
            callback();
        });
    }

    return factory;
});

//Question Factory
questions_answers_app.factory('QuestionFactory', function($http){
    var factory = {};

    factory.getAllQuestions = function (callback) {
        $http.get('/questions').success(function(output){
            callback(output);
        });
    }

    factory.addQuestion = function(newdata, callback){
        $http.post('/questions/new', newdata).success(function(output){
            callback();
        });
    }

    factory.getQuestionById = function(id, callback){
        $http.get('/questions/'+id).success(function(output){
            callback(output);
        });
    }

    


    return factory;

});



//Login Factory
questions_answers_app.factory('LoginFactory', function($http) {
    var factory = {};
    var current_user = null;

    factory.addUserAndLogin = function(newdata, callback) {
        $http.post('/users/new', newdata).success(function(output){
            current_user = output;
            callback(output);
        });
    }
    
    factory.findUserByNameAndLogin = function(name, callback) {
        $http.get('/users/findonebyname/'+name).success(function(output){
            current_user = output;
            callback(output);
        }); 
    }

    factory.getLoggedInUser = function (callback) {
        callback(current_user);
    }

    factory.logoutUser = function (callback) {
        current_user = null;
        callback();
    }

    return factory;
});



