// Access div in index.html
const app = document.getElementById('root');

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://www.empirestreet.com.au/questionlist', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  question = data[Math.floor(Math.random() * 10)];

  const q1 = document.createElement('p');
  q1.textContent = question.Q1;
  app.appendChild(q1);
  
  const q2 = document.createElement('p');
  q2.textContent = question.Q2;
  app.appendChild(q2);
  
  const q3 = document.createElement('p');
  q3.textContent = question.Q3;
  app.appendChild(q3);
  
  const q4 = document.createElement('p');
  q4.textContent = question.Q4;
  app.appendChild(q4);
  
  const q5 = document.createElement('p');
  q5.textContent = question.Q5;
  app.appendChild(q5);

  const a1 = document.createElement('p');
  a1.textContent = question.A1;
  app.appendChild(q1);
  
  const a2 = document.createElement('p');
  a2.textContent = question.A2;
  app.appendChild(q2);
  
  const a3 = document.createElement('p');
  a3.textContent = question.A3;
  app.appendChild(q3);
  
  const a4 = document.createElement('p');
  a4.textContent = question.A4;
  app.appendChild(q4);

  const answer = document.createElement('p');
  answer.textContent = question.Answer;
  app.appendChild(answer);
    
}

request.send();