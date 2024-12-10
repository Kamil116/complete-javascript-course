(function startGame() {
    function Question(question, answers, correct) {
        this.text = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.printQuestion = function () {
        console.log(this.text);
        for (let i = 0; i < this.answers.length; i++) {
            console.log(i + ' ' + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function checkAnswer(userAnswer, callback) {
        function getCorrectAnswerIndex() {
            for (let i = 0; i < this.answers.length; i++) {
                if (this.answers[i] === this.correct) {
                    callback(true);
                    return i.toString();
                }
            }
        }

        return getCorrectAnswerIndex.call(this) === userAnswer;
    }

    let mathQuestion = new Question('What is the result of 2 * (2 + 2)?',
        ['6', '4', '8'],
        '8');
    let pythonQuestion = new Question('Which data type is immutable in python?',
        ['array', 'str', 'dict'],
        'str')
    let gamingQuestion = new Question('When CS2 had been released?',
        ['2022', '2021', '2023'],
        '2023')
    let physicsQuestion = new Question('What is the measurement unit of the loudness of sound?',
        ['Decibels', 'Hertz', 'Kilograms', 'Amperes'],
        'Decibels')
    let continentQuestion = new Question('What is the smallest continent?',
        ['Australia', 'Europe', 'South America'],
        'Australia')

    const questions = [mathQuestion, pythonQuestion, gamingQuestion, physicsQuestion, continentQuestion];

    function randomNumber(max) {
        return Math.ceil(Math.random() * max);
    }

    function playRound() {
        let askedQuestion = questions[randomNumber(questions.length - 1)]
        askedQuestion.printQuestion();
        const userAnswer = prompt('What is your answer?');
        if (userAnswer === 'exit') {
            return null;
        }
        console.log(askedQuestion.checkAnswer(userAnswer, keepScore) === true ? 'Correct' : 'Wrong');
        return askedQuestion.checkAnswer(userAnswer);
    }

    function score() {
        let scr = 0;
        return (correct) => {
            correct ? scr++ : _
            return scr
        }
    }

    let keepScore = score();
    while (true) {
        let res = playRound();
        if (res == null) {
            console.log('Game is over. Your final score is ' + score + ' points')
            break;
        }
        console.log('Your current score is: ' + score)
        console.log("-------------------------------")
    }
})()
