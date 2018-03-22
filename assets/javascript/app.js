var triviaQuestions = [{
	question: "What year did Christopher Nolan's first Batman Movie come out?",
	answerList: ["2005", "2008", "2009", "2012"],
	answer: 0
},{
	question: "What was the play that Bruce Wayne watches right before the death of his parents?",
	answerList: ["Macbeth", "Hamlet", "Cats", "The Mark of Zorro"],
	answer: 3
},{
	question: "Which character has been the NEWEST incarnation of Robin?",
	answerList: ["Jason Todd", "Tim Drake", "Dick Greyson", "Damian Wayne"],
	answer: 3
},{
	question: "Which character was revealed to be the Red Hood after his revival by Ra's al Ghul?",
	answerList: ["Damian Wayne", "Jason Todd", "Floyd Lawton", "Slade Wilson"],
	answer: 1
},{
	question: "Which character is NOT part of the origial Teen Titans?",
	answerList: ["Robin", "Beast Boy", "Superboy", "Raven"],
	answer: 2
},{
	question: "Who is credited with creating Batman?",
	answerList: ["Bob Kayne", "Stan Lee", "Jack Kirby", "Malcolm Wheeler"],
	answer: 0
},{
	question: "Which Batman from the Dark Nights: Metal series is NOT created from killing a superhero?",
	answerList: ["The Dawnbreaker", "The Red Death", "The Murder Machine", "The Batman Who Laughs"],
	answer: 3
},{
	question: "What Batman villain lost his wife, Nora, to a terminal illness?",
	answerList: ["Two-Face", "Scarecrow", "Mr. Freeze", "Ra's al Ghul"],
	answer: 2
},{
	question: "Which of the following characters has NOT fought crime as Batgirl?",
	answerList: ["Laurel Lance", "Betty Kane", "Barbara Gordon", "Charlie Gage-Radcliffe"],
	answer: 0
},{
	question: "Which of Batman's enemies is the leader of the League of Assassins?",
	answerList: ["Bane", "Deathstroke", "The Joker", "Ra's al Ghul"],
    answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct! You're a true batman fan!",
	incorrect: "No..you're wrong. Go watch more batman movies!",
	endTime: "Out of time!",
	finished: "Mission Complete! Were you a true batman fan?"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	

	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

    if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4500)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4500);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}