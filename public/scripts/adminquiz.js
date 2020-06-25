    $(function()
      {
      function editQuizStart(questions)
    {
        adminquiz.fadeOut(function() 
        {
            var questionlength = questions.length;
            
            console.log("you are in");
            
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
                //
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
    } )

