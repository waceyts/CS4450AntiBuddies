package main

import (
	"fmt"
	"strings"

	"database/sql"

	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/denisenkom/go-mssqldb"
)

// Database connection string
const dbconnection = "server=antibuddies.co362eqfasab.us-east-2.rds.amazonaws.com;user id=antibuddies;password=WeberStudent1;port=1433"

// This function requires no request parameters, but the template requires that this struct exist
type request struct {
	ItemID          string `json:"citemID"`         //quizID
	QuestionID      string `json:"questionID"`      //questionID
	CorrectAnswer   string `json:"correctAnswer"`   //returns the questions correct answer
	Questioncontext string `json:"questionContext"` //get question
	AnswerDesc      string `json:"answerDesc"`      //aresponse
	Answer1         string `json:"answer1"`
	Answer2         string `json:"answer2"`
	Answer3         string `json:"answer3"`
	Answer4         string `json:"answer4"`   //max of 4 questions
	Anum1           string `json:"anum1"`     //number of questions
	NewAnswer       string `json:"newanswer"` //if a new answer is added or deleted this will be a number
} //The json:"data" corresponds directly to the request, so in the request would send "data":"dataval". This doesn't appear to be case sensitive

// Response object property and associated JSON key
type response struct {
	PracticeQuestion string `json:"RESPONSE"`
}

// Opens a Database connection and update a practiceQuestion. Returns a string containing an error or success message
func CreateEditQuestionInDB(practiceQuestion request) string {

	db, err := sql.Open("mssql", dbconnection)
	if err != nil {
		panic(err)
	}
	// Holds the connection open until the surrounding function has finished executing
	defer db.Close()

	db.Query("USE antibuddies; GO")

	//Execute SQL script to update a practice question
	_, err = db.Query(`USE antibuddies; UPDATE PracticeQuestions SET question = '` + strings.Replace(practiceQuestion.Questioncontext, "'", `''`, -1) + `', atype = '` + practiceQuestion.CorrectAnswer + `' , aresponse =  '` + practiceQuestion.AnswerDesc + `' WHERE question_id = '` + practiceQuestion.QuestionID + `' ;`) // `' WHERE citem_id = '` + practiceQuestion.ItemID + `' AND  question_id = '` + practiceQuestion.QuestionID + `' ;`)
	if err != nil {
		return "Error in editing question: " + err.Error()
	}

	//Execute SQL script to update answers
	_, err = db.Query(`USE antibuddies; 
    UPDATE PQAnswers SET qanswer='` + strings.Replace(practiceQuestion.Answer1, "'", `''`, -1) + `' WHERE question_id='` + practiceQuestion.QuestionID + `' AND anum=0 ;
    UPDATE PQAnswers SET qanswer='` + strings.Replace(practiceQuestion.Answer2, "'", `''`, -1) + `' WHERE question_id='` + practiceQuestion.QuestionID + `' AND anum=1;
    UPDATE PQAnswers SET qanswer='` + strings.Replace(practiceQuestion.Answer3, "'", `''`, -1) + `' WHERE question_id='` + practiceQuestion.QuestionID + `' AND anum=2;
    UPDATE PQAnswers SET qanswer='` + strings.Replace(practiceQuestion.Answer4, "'", `''`, -1) + `' WHERE question_id='` + practiceQuestion.QuestionID + `' AND anum=3;`)
	if err != nil {
		return "Error in editing the answer1 part of edit question" + err.Error()
	}

	// Return a successful completion message
	return "Complete"
}

// AWS Lambda template function that does all the work for the lambda execution
func handler(practiceQuestion request) (response, error) {

	EditQuestionResponse := CreateEditQuestionInDB(practiceQuestion)

	return response{
		PracticeQuestion: fmt.Sprintf(EditQuestionResponse),
	}, nil
}

// AWS lambda standard main function
func main() {
	lambda.Start(handler)
}
