
function getQuestions() {
  /*var temp = document.getElementsByTagName("template")[0];
  var clone = temp.content.cloneNode(true);
  document.body.appendChild(clone);*/
  blabla()
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
  document.body.appendChild(clone);
}

function blabla() {
  var args = Array.prototype.slice.call(arguments, 3);
  var xhr = new XMLHttpRequest();
  var url = "http://jservice.io/api/random?count=10"
  xhr.ontimeout = function () {
    console.error("The request for " + url + " timed out.");
  };
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let qs = JSON.parse(this.response);
      for(let x in qs) {
        let question = qs[x]
        insertQuestion(question)
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.timeout = 3000
  xhr.send(null);
}
