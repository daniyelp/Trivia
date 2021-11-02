class Question {
  constructor(
    question,
    answer,
    value,
    created_at,
    category
  ) {
    this.question = question
    this.answer = answer
    this.value = value
    this.created_at = created_at
    this.category = category
  }
}

function closeDialog() {
  $("#modal").get(0).style.display = "none";
  resetForm()
}

function resetForm() {
  $("#form").get(0).reset();
}

function showDialog() {
  $("#modal").get(0).style.display = "block";
}

function getQuestions() {
  /*var temp = document.getElementsByTagName("template")[0];
  var clone = temp.content.cloneNode(true);
  document.body.appendChild(clone);*/
  blabla()
}

function showSpinner() {
  document.getElementById("spinner").style.visibility = "visible"
}

function hideSpinner() {
  document.getElementById("spinner").style.visibility = "hidden"
}

function downloadQuestions() {
  let input = document.getElementById("number_of_questions")
  let error_icon = document.getElementById("number_of_questions-error-icon")
  let error_message = document.getElementById("number_of_questions-error-message")
  let ok = validateInput(input, error_icon, null, error_message, (str => {let x = parseInt(str); return (x >= 1 && x <= 100)}), "The input value should lie between 1 and 100")
  if(!ok) {
    return
  }
  let number_of_questions = parseInt(input.value)
  let xhr = new XMLHttpRequest();
  let url = "http://jservice.io/api/random"
  let params = "count=" + number_of_questions
  xhr.ontimeout = function () {

  };
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let qs = JSON.parse(this.response);
      for(let x in qs) {
        let question = qs[x]
        insertQuestion(
          new Question(
            question.question,
            question.answer,
            question.value,
            question.created_at,
            question.category.title
          )
        )
      }
    }
    hideSpinner()
  };
  xhr.open("GET", url + "?" + params, true);
  xhr.timeout = 3000
  showSpinner()
  xhr.send(null);
}

function insertQuestion(question) {
  let clone = $("#question_template").clone().get()["0"].content
  let text = clone.querySelector("#question")
  let answer = clone.querySelector("#answer")
  let value = clone.querySelector("#value")
  let created_at = clone.querySelector("#created_at")
  let title = clone.querySelector("#title")

  text.textContent = question.question
  answer.textContent = question.answer
  value.textContent = question.value
  created_at.textContent = question.created_at
  title.textContent = question.category

  var new_item = $("<div class='question'></div>").append(clone).hide();
  $("#questions").prepend(new_item);
  new_item.slideDown('slow')

  let empty = document.getElementById("empty")
  empty.style.display = 'none'
}

function validateInput(input, errorIcon, checkIcon, errorMessage, isValid, errorMessageValue) {
  if(isValid(input.value)) {
    input.style.border = "2px solid green"
    if(errorIcon != null) errorIcon.style.display = 'none'
    if(checkIcon != null) checkIcon.style.display = 'inline-block'
    if(errorMessage != null) errorMessage.innerHTML = ""
    return true
  } else {
    input.style.border = "2px solid red"
    if(errorIcon != null) errorIcon.style.display = 'inline-block'
    if(checkIcon != null) checkIcon.style.display = 'none'
    if(errorMessage != null) errorMessage.innerHTML = errorMessageValue
    return false
  }
}


function onSubmit() {
  let question = document.getElementById("f-question")
  let answer = document.getElementById("f-answer")
  let value = document.getElementById("f-value")
  let created_at = document.getElementById("f-created-at")
  let category = document.getElementById("f-category")

  let question_error_icon = document.getElementById("f-question-error-icon")
  let answer_error_icon = document.getElementById("f-answer-error-icon")
  let value_error_icon = document.getElementById("f-value-error-icon")
  let created_at_error_icon = document.getElementById("f-created-at-error-icon")
  let category_error_icon = document.getElementById("f-category-error-icon")

  let question_error_message = document.getElementById("f-question-error-message")
  let answer_error_message = document.getElementById("f-answer-error-message")
  let value_error_message = document.getElementById("f-value-error-message")
  let created_at_error_message = document.getElementById("f-created-at-error-message")
  let category_error_message = document.getElementById("f-category-error-message")

  let question_check_icon = document.getElementById("f-question-check-icon")
  let answer_check_icon = document.getElementById("f-answer-check-icon")
  let value_check_icon = document.getElementById("f-value-check-icon")
  let created_at_check_icon = document.getElementById("f-created-at-check-icon")
  let category_check_icon = document.getElementById("f-category-check-icon")

  let a = validateInput(question, question_error_icon, question_check_icon, question_error_message, (str => str.length >= 10), "Must be at least 10 characters length")
  let b = validateInput(answer, answer_error_icon, answer_check_icon, answer_error_message, (str => str.length >= 5), "Must be at least 10 characters length")
  let c = validateInput(value, value_error_icon, value_check_icon, value_error_message, (str => {let x = parseInt(str); return (x >= 50 && x <= 150)}), "Must be between 50 and 150")
  let d = validateInput(created_at, created_at_error_icon, created_at_check_icon, created_at_error_message, (str => str.length > 0), "Cannot be empty")
  let e = validateInput(category, category_error_icon, category_error_message, category_check_icon, (str => {return true}), "")

  if(a && b && c && d && e) {
    let q = new Question(
      question.value,
      answer.value,
      value.value,
      created_at.value,
      category.value
    )
    insertQuestion(q)
    closeDialog()
    let form = document.getElementById("form")
    form.reset()
  }

  return false
}
