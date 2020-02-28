(function() 
 {
      var questions = [{
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
      }];
    
    
    var selections = []; //Array for users choices
    
    var quiz = $('#quiz');
    
    displayQuestions();
    
    
    //Click handler for 'submit' button
    $('#submit').on('click', function(e) {
        e.preventDefault();
        
        choose();
        
        showResults();

    });
    
    
      // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) 
    {
        var qElement = $('<div>', {
          id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

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
                input = '<input type="radio" name="answer'+index+'" value="' + letter + ' ">' + letter + ': ';
                input += questions[index].choices[letter];
                item.append(input);
                radioList.append(item);
            }
        
        return radioList;
     }

      // Reads the user selection and pushes the value to an array
      function choose() 
    {
        var answers = quiz.querySelectorAll('.choices');
        
        var userAnswer = '';
        var numCorrect = 0;
        
        
        for(var i = 0; i < questions.length; i++)
            {
                userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
                
                //correct answers
                if(userAnswer == questions[i].correctAnswer)
                    {
                        numCorrect++;
                        
                        answers[i].style.color = 'lightgreen';
                    }
                else
                    {
                        
                    }
                
            }
          
          
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
      }
    

    

    function displayQuestions()
    {
        quiz.fadeOut(function() 
        {
            var questionlength = questions.length;
            
            console.log(questionlength);
            
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
    
} )();