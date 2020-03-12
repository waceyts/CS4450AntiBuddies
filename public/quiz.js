(function() 
 {
    var questions = []; //Array for questions
    
    
    var selections = []; //Array for users choices
    
    var quiz = $('#quiz');
    var adminquiz = $('#currentQuiz');
    
    loadQuestions();
    
    displayQuestions();
    editQuizStart();
    
    //Click handler for 'submit' button
    $('#submit').on('click', function(e) {
        e.preventDefault();
        
        
        
        choose();
        
        //showResults();
    });
    
    
    function loadQuestions()
    {
        questions = [{
        question: "Which of the following antibodies can be neutralized by pooled human plasma?",
        choices: {
            a: 'anti-Kna', 
            b: 'anti-Ch', 
            c: 'anti-Yka', 
            d: 'anti-Csa'},
        correctAnswer: 'b',
        explanations: "Correct response is B. Anti-Ch and anti-Rg can be neutralized by pooled human plasma because the Ch and Rg antigens reside on complement protein C4. Neutralization studies with pooled plasma can help confirm the antibody reactivity in a patient’s sample. (Source Harmening, 7th Edition, Chapter...)"
      }, {
        question: "The following test results are noted for a unit of blood labeled group A, Rh-negative: <br> Cells tested with: <br> anti-A anti-B anti-D <br> 4+ 0 3+ <br>  What should be done next?",
        choices: {
            a: 'transfuse as a group A, Rh-negative', 
            b: 'transfuse as a group A, Rh-positive', 
            c: 'notify the collecting facility', 
            d: 'discard the unit'},
        correctAnswer: 'c',
        explanations: "Correct response is C. A serological test to confirm the ABO on all RBC units and Rh on units labeled as Rh-negative must be performed prior to transfusion. Any errors in labeling must be reported to the collecting facility. (Source AABB Standards, Section...)"
      }]
    }
    
    
      // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) 
    {
        var qElement = $('<div>', {
          id: 'question'+index
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);
        //console.log(qElement);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
      function createRadios(index) 
    {
        var radioList = $('<ul>');
        var item;
        var input = '';
        
        answers = [];
        
        for (letter in questions[index].choices)
            {
                item = $('<li>');
                input = '<input type="radio" name="answer'+letter+'" value="' + letter + ' ">' + letter + ': ';
                input += questions[index].choices[letter];
                item.append(input);
                radioList.append(item);
            }
        
        return radioList;
     }

      // Reads the user selection and pushes the value to an array
      function choose() 
    {
        

        var userAnswer = '';
        var numCorrect = 0;
        
        var checkempty = 0;
        
        
        for(var i = 0; i < questions.length; i++)
            {
                console.log("Question "+ i);
                for (letter in questions[i].choices)
                    {
                        var x = document.getElementsByName("answer"+letter).checked;
                        console.log(x);
                        if (!x)
                            {
                                checkempty++;
                            }
                            
                    }
                
                console.log(checkempty);
                
                //userAnswer = (answers[i].querySelector('input[name=questions'+i+']:checked')||{}).value;
                
                //correct answers
                /*if(userAnswer == questions[i].correctAnswer)
                    {
                        numCorrect++;
                    }
                else
                    {
                        
                    }*/
                
            }
          
      }
    

    

    function displayQuestions()
    {
        quiz.fadeOut(function() 
        {
            var questionlength = questions.length;
            
            //console.log(questionlength);
            
            for (var i = 0; i < questionlength; i++)
            {
                var nextQuestion = createQuestionElement(i);
                quiz.append(nextQuestion).fadeIn();
            }
        });
    }
    
      // Computes score and returns a paragraph element to be displayed
    function displayScore() 
    {
        var score = $('<p>',{id: 'question'});

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) 
        {
            if (selections[i] === questions[i].correctAnswer) 
            {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!');
        
        return score;
    }
    
    //for admin quiz page, to be used to determine if there is already a quiz to edit
    function editQuizStart()
    {
        adminquiz.fadeOut(function() 
        {
            var questionlength = questions.length;
            
            
            
            for (var i = 0; i < questionlength; i++)
            {
                var nextQuestion = $('<div>', { id: 'question'+i});
            
                
                //add buttons for edit or remove per question
                var deletebutton = $('<input type="button" class="btns" id="delete" name="btnsdele"  value="Delete" /> ');
                nextQuestion.append(deletebutton);
                
                
                
                var editbutton = $('<input type="button" class="btns" id="edit" onClick="editQuestion('+i+')" value="Edit"/>');
                nextQuestion.append(editbutton);

                
                var header = $('<h2>Question ' + (i + 1) + ':</h2>');
                
                nextQuestion.append(header);
                
                var question = $('<p>').append(questions[i].question);
                nextQuestion.append(question);
                
                
                adminquiz.append(nextQuestion).fadeIn();
                
                var answersh = viewAnswers(i);
                adminquiz.append(answersh);
                
               var deleteButtons = document.getElementsByName("btnsdele");
                console.log(deleteButtons);

                    
                
            }
            
            
        });
    }
    
    
    function viewAnswers(index)
    {
        var questionList = $('<ul>');
        var item;
        var input = '';
        var count = 0;
        
        answers = [];
        
        for (letter in questions[index].choices)
            {
                /*
                item = $('<li>');
                input = '<p name="answer'+letter+'" id="'+index+letter+'">' + letter + ': ';
                input += questions[index].choices[letter];
                item.append(input);
                questionList.append(item);

                */
                if(letter == questions[index].correctAnswer)
                {
                    item = $('<li>');
                    input = '<p name="answer'+letter+'" id="CorrectAnswer">' + letter + ': ';
                    input += questions[index].choices[letter];
                    item.append(input);
                    questionList.append(item);
                }
                else
                {
                    item = $('<li>');
                    input = '<p name="answer'+letter+'" id="'+index+letter+'">' + letter + ': ';
                    input += questions[index].choices[letter];
                    item.append(input);
                    questionList.append(item);
                }
            }
        
        return questionList;
    }
    
    function addQuestion()
{
    console.log("add working");
}

    
function editQuestions(index)
{
        
}
             
function deleteQuestion(index)
{
    console.log(index);
    questions.splice(index,1);
    editQuizStart();
}
    
} )();

/*
function addQuestion()
{
    console.log("add working");
}

    
function editQuestions(index)
{
        
}
             
function deleteQuestion(index)
{
    console.log(index);
    questions.splice(index,1);
    editQuizStart();
}
    */