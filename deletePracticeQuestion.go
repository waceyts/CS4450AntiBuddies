package main

import (
	"fmt"

	"database/sql"

	"github.com/aws/aws-lambda-go/lambda"
	_ "github.com/denisenkom/go-mssqldb"
)

// Database connection string
const dbconnection = "server=antibuddies.co362eqfasab.us-east-2.rds.amazonaws.com;user id=antibuddies;password=WeberStudent1;port=1433"

// This function requires no request parameters, but the template requires that this struct exist
type request struct {
	QuestionID string `json:"questionID"`
}

// Response object property and associated JSON key
type response struct {
	DeleteResponse string `json:"response"`
}

// Opens a Database connection and inserts a practiceQuestion. Returns a string containing the new PracticeQuestion's ID
func DeletePracticeQuestionFromDB(practiceQuestion request) string {

	db, err := sql.Open("mssql", dbconnection)
	if err != nil {
		panic(err)
	}
	// Holds the connection open until the surrounding function has finished executing
	defer db.Close()

	db.Query("USE antibuddies; GO")

	// Execute db stored procedure to add a new practiceQuestion
	_, err = db.Query(`USE antibuddies;
        BEGIN TRANSACTION;
            DELETE FROM PQAnswers			WHERE question_id = '` + practiceQuestion.QuestionID + `';
            DELETE FROM PQScores			WHERE question_id = '` + practiceQuestion.QuestionID + `';
            DELETE FROM PracticeQuestions	WHERE question_id = '` + practiceQuestion.QuestionID + `';
        COMMIT TRANSACTION;`)
	if err != nil {
		return "Error in deleting PracticeQuestion: " + err.Error()
	}

	return ("Successfully deleted PracticeQuestion: " + practiceQuestion.QuestionID)

}

// AWS Lambda template function that does all the work for the lambda execution
func handler(practiceQuestion request) (response, error) {

	DeleteResponseStr := DeletePracticeQuestionFromDB(practiceQuestion)

	return response{
		DeleteResponse: fmt.Sprintf(DeleteResponseStr),
	}, nil
}

// AWS lambda standard main function
func main() {
	lambda.Start(handler)
}
