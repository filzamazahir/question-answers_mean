//Home Controller
questions_answers_app.controller('HomeController', function($scope, $location, $routeParams, LoginFactory, QuestionFactory){

    $scope.login = function() {
        $scope.submitted = true;
        if (!$scope.user || !$scope.user.name) {
            return;
        }

        LoginFactory.findUserByNameAndLogin($scope.user.name, function(result){
            if (result) {
                $scope.user = {};
                $scope.submitted = false;
                $scope.not_loggedin = false;
                $scope.loggedin_user = result;
            }
            else {
                LoginFactory.addUserAndLogin($scope.user, function(user_added){
                    $scope.user = {};
                    $scope.submitted = false;
                    $scope.not_loggedin = false;
                    $scope.loggedin_user = user_added;
                });
            }

        });   
    }

    $scope.logout = function(){
        LoginFactory.logoutUser(function (){
            $scope.loggedin_user = null;
            $scope.not_loggedin = true;
        })
    }

    $scope.getallquestions = function() {
        QuestionFactory.getAllQuestions(function(result){
            $scope.questions = result;
        });
    }


    // Run by default
    $scope.question_added_msg = $routeParams.question_added_msg;
    if ($routeParams.loggedoutstatus == false) {
        $scope.not_loggedin = false;
    }
    else {
        $scope.not_loggedin = true;
    }
    $scope.loggedin_user = null || $routeParams.loggedinuser;
    console.log('Loggedout status', $scope.not_loggedin);
    $scope.getallquestions();

});



//Questions Controller
questions_answers_app.controller('QuestionsController', function($scope, $location, $routeParams, QuestionFactory, AnswerFactory, LoginFactory){
    
    $scope.valid = function (){
        // $scope.loggedin_user = $routeParams.result;
        LoginFactory.getLoggedInUser(function(data){
            $scope.loggedin_user = data;
        });

        if(!$scope.loggedin_user) {
            console.log('No user logged in');
            $location.path('/').search({loggedoutstatus:true});
        }
    }

    $scope.logout = function(){
        LoginFactory.logoutUser(function (){
            $scope.loggedin_user = null;
            $location.path('/').search({loggedoutstatus:true});
        })
    }

    $scope.addquestion = function (){
        $scope.submitted = true;
        if (!$scope.newquestion || !$scope.newquestion.question_text) {
            return;
        }

        QuestionFactory.addQuestion($scope.newquestion, function(){
            $scope.newquestion = {}
            $scope.submitted = false;
            $location.path('/').search({loggedoutstatus:false, loggedinuser: $scope.loggedin_user, question_added_msg: "Your Question was successfully added!"})
        });   
    }

    $scope.home_loggedin = function () {
        $location.path('/').search({loggedoutstatus:false, loggedinuser: $scope.loggedin_user});
    }

    $scope.getquestion = function (id) {
        QuestionFactory.getQuestionById(id, function(data){
            $scope.question = data;
        });
    }

    $scope.likeAnAnswer = function (answerid, questionid){
        AnswerFactory.addLike(answerid, function(){
            $scope.getquestion(questionid);
        });
    }


    // Run by default
    $scope.submitted = false;
    $scope.valid();
    $scope.getquestion($routeParams.id);

});


//Answers Controller
questions_answers_app.controller('AnswersController', function($scope, $location, $routeParams, LoginFactory, QuestionFactory, AnswerFactory) {
    
    $scope.valid = function (){
        LoginFactory.getLoggedInUser(function(data){
            $scope.loggedin_user = data;
        });

        if(!$scope.loggedin_user) {
            console.log('No user logged in');
            $location.path('/').search({loggedoutstatus:true});
        }
    }

    $scope.logout = function(){
        LoginFactory.logoutUser(function (){
            $scope.loggedin_user = null;
            $location.path('/').search({loggedoutstatus:true});
        })
    }

    $scope.home_loggedin = function () {
        $location.path('/').search({loggedoutstatus:false, loggedinuser: $scope.loggedin_user});
    }

    $scope.getquestion = function (id) {
        QuestionFactory.getQuestionById(id, function(data){
            $scope.question = data;
        });
    }

    $scope.addanswer = function (questionid){
        $scope.submitted = true;
        if (!$scope.newanswer || !$scope.newanswer.answer_text) {
            return;
        }
        $scope.newanswer.postedby = $scope.loggedin_user._id;
        AnswerFactory.addAnswerForAQuestion ($scope.newanswer, questionid, function(){
            $scope.newanswer = {}
            $scope.submitted = false;
            $location.path('/question/'+questionid);
        });   
    }

    //Run by default
    $scope.submitted = false;
    $scope.valid();
    $scope.getquestion($routeParams.id);
});



