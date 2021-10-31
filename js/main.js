
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
  let number_of_questions = parseInt(input.value)
  if(number_of_questions >= 1 && number_of_questions <= 100) {
    //let args = Array.prototype.slice.call(arguments, 3);
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
          insertQuestion(question)
        }
      }
      hideSpinner()
    };
    xhr.open("GET", url + "?" + params, true);
    xhr.timeout = 3000
    showSpinner()
    xhr.send(null);
  } else {

  }
}

function insertQuestion(question) {
  let temp = document.getElementsByTagName("template")[0];
  let clone = temp.content.cloneNode(true);

  let text = clone.querySelector("#question")
  let answer = clone.querySelector("#answer")
  let value = clone.querySelector("#value")
  let created_at = clone.querySelector("#created_at")
  let title = clone.querySelector("#title")
  text.textContent = question.question
  answer.textContent = question.answer
  value.textContent = question.value
  created_at.textContent = question.created_at
  title.textContent = question.category.title
  document.getElementById("questions").appendChild(clone);
}
