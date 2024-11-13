// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaM7WAV2Rlxfg2_KQY8QXmr6Xw_tY3YxE",
  authDomain: "quiz-app-46893.firebaseapp.com",
  projectId: "quiz-app-46893",
  storageBucket: "quiz-app-46893.firebasestorage.app",
  messagingSenderId: "733318398908",
  appId: "1:733318398908:web:b856882c7f13d059d1a1b9"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign-Up Event
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      Swal.fire("Success", "Account created!", "success");
      window.location.href = "quiz.html";
    })
    .catch((error) => {
      alert("Sign up failed: " + error.message);
    });
});

// Login Event
document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      Swal.fire("Success", "Login successful!", "success");
      window.location.href = "quiz.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

// Auth State Check for Quiz Access
firebase.auth().onAuthStateChanged(function(user) {   
  if (!user && window.location.pathname.includes("quiz.html")) {
    window.location.href = "index.html";
  }
});

a = {
  question: "How many days are there in a week",
  answer: [7, 6, 8, 5],
  correctAns: 7,
};
b = {
  question: "How many months are there in a year",
  answer: [9, 11, 12, 10],
  correctAns: 12,
};
c = {
  question: "How many days are there in the month of february",
  answer: [32, 28, 30, 31],
  correctAns: 28,
};
d = {
  question: "How many days are there in the month of june",
  answer: [30, 31, 32, 28],
  correctAns: 30,
};
e = {
  question: "How many provinces of Pakistan are there",
  answer: [4, 5, 6, 7],
  correctAns: 5,
};
f = {
  question: "How many festivals do Muslims have?",
  answer: [1, 2, 3, 4],
  correctAns: 2,
};
g = {
  question: "How many days are there in the month of ramazan?",
  answer: ["30 or 31", "29 or 30", "30 or 32", "31 or 32"],
  correctAns: "29 or 30",
};
h = {
  question: "How many times a person breathes in a minute?",
  answer: [
    "12 to 20 breaths",
    "20 to 25 breaths",
    "22 to 30 breaths",
    "15 to 25 breaths",
  ],
  correctAns: "12 to 20 breaths",
};
i = {
  question: "What is the normal blood pressure level?",
  answer: ["120/80 mmHg", "130/90 mmHg", "110/70 mmHg", "125/85 mmHg"],
  correctAns: "120/80 mmHg",
};
j = {
  question: "What is the size of the earth?",
  answer: ["6371km", "6731km", "7631km", "7361km"],
  correctAns: "6371km",
};

var arr = [a, b, c, d, e, f, g, j, i, j];
var question = document.getElementById("question");
var currentQuestionNumber = document.getElementById("currentQuestionNumber");
var totalQuestionQuantity = document.getElementById("totalQuestionQuantity");
var optionsParent = document.getElementById("optionsParent");
var resultParent = document.getElementById("resultParent");
var resultProgress = document.getElementById("resultProgress");
var resultText = document.getElementById("resultText");
var ind = 0;
var score = 0;

function displayQuestion() {
  optionsParent.innerHTML = "";
  question.innerHTML = arr[ind].question;
  currentQuestionNumber.innerHTML = ind + 1;
  totalQuestionQuantity.innerHTML = arr.length;
  for (var i = 0; i < arr[ind].answer.length; i++) {
    optionsParent.innerHTML += `<div class="col-md-6 py-3">
    <button onclick="checkAnswer('${arr[ind].answer[i]}')" class="btn px-5  rounded-pill btn-light">${arr[ind].answer[i]}</button>
</div>`;
  }
}
displayQuestion();
function nextQuestion() {
  ind++;
  displayQuestion();
}

function checkAnswer(e) {
  var userAnswer = e;
  // console.log(userAnswer, "userAnswer");
  var correctAnswer = arr[ind].correctAns;
  // console.log(correctAnswer, "correctAnswer");
  if (userAnswer == correctAnswer) {
    score++;
    console.log(score, "score");
  }
  if (ind + 1 == arr.length) {
    displayResult();
  } else {
    nextQuestion();
  }
}

function displayResult() {
  resultParent.style.display = "block";
  resultProgress.max = arr.length;
  resultProgress.value = score;
  optionsParent.style.display = "none";
  question.style.display = "none";
  var resultPercentage = (score / arr.length) * 100;
  resultText.innerHTML = resultPercentage + "%";
  if (resultPercentage < 50) {
    resultText.className += " text-danger";
  } else {
    resultText.className += " text-success";
  }
}

