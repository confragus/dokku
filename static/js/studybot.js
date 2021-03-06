// Collapsible
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }


var score = 0;
var maxscore = 0;
var accuracy = 0;
var imgv = "?0.1";
var card_id = 0;
var current_qn = 1;

function display(x) {
  x.style.display = "block";
}

function hide(x){
  x.style.display = "none";
}

function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
  }
  return sourceArray;
}

// Access div in index.html
const app = document.getElementById('root');

// set up container
const container = document.createElement('div');
container.setAttribute('class', 'container');

// add logo and containder to the app root
app.appendChild(container);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://empirestreet.com.au/questionlist', true);
request.onload = function () {

// Begin accessing JSON data here
var data = JSON.parse(this.response);

datarandom = shuffle(data);

  datarandom.forEach(question => {
    // Create a div with a card class
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const p_id = document.createElement('h5');
    const p_question = document.createElement('p');
    const img_question = document.createElement('img');

    const img_q1 = document.createElement('img');
    const img_q2 = document.createElement('img');
    const img_q3 = document.createElement('img');

    const p_q1 = document.createElement('p');
    const p_q2 = document.createElement('p');
    const p_q3 = document.createElement('p');

    const p_mcA = document.createElement('p');
    const p_mcB = document.createElement('p');
    const p_mcC = document.createElement('p');
    const p_mcD = document.createElement('p');

    const i_q1 = document.createElement('input');
    const i_q2 = document.createElement('input');
    const i_q3 = document.createElement('input');
    
    const b_q1 = document.createElement('button');
    b_q1.setAttribute('class', 'button');
    
    const p_r1 = document.createElement('p');
    const p_r2 = document.createElement('p');
    const p_r3 = document.createElement('p');

    const p_a1 = document.createElement('p');
    const p_a2 = document.createElement('p');
    const p_a3 = document.createElement('p');
    const p_s1 = document.createElement('p');
    const p_s2 = document.createElement('p');
    const p_s3 = document.createElement('p');

    const p_score = document.getElementById("p_score");
    const p_maxscore = document.getElementById("p_maxscore");
    const p_accuracy = document.getElementById("p_accuracy");
    const p_realscore = document.getElementById("p_realscore");
    
    function marks(x){
      if (x === '1'){
        return " (" + x + " mark)"
      } else {
        return " (" + x + " marks)"
      }
    }

    if (question.A != "") {
      p_mcA.textContent = "A) " + question.A;
      p_mcB.textContent = "B) " + question.B;
      p_mcC.textContent = "C) " + question.C;
      p_mcD.textContent = "D) " + question.D;
    }
    
    p_id.textContent = question.Subject + "-" + question.Year + " Q-"
      + question.ID + question.ID2;  
    if (question.Q1 != ""){
      p_question.textContent = question.Question;
      p_q1.textContent = question.Q1 + marks(question.M1);
      p_q2.textContent = question.Q2 + marks(question.M2); 
      p_q3.textContent = question.Q3 + marks(question.M3);
    } else {
      p_question.textContent = question.Question + marks(question.M1);
    }
           
    // Check if static html
    if (location.hostname === "") {
      img_question.setAttribute('src',"../static/img/qn/"+ question.Picture +".png" + imgv);
      img_q1.setAttribute('src',"../static/img/qn/"+ question.P1 +".png" + imgv);
      img_q2.setAttribute('src',"../static/img/qn/"+ question.P2 +".png" + imgv);
      img_q3.setAttribute('src',"../static/img/qn/"+ question.P3 +".png" + imgv);
    } else {
      img_question.setAttribute('src',"{{ url_for('static', filename='img/qn/') }}"+ question.Picture +".png" + imgv); 
      img_q1.setAttribute('src',"{{ url_for('static', filename='img/qn/') }}"+ question.P1 +".png" + imgv); 
      img_q2.setAttribute('src',"{{ url_for('static', filename='img/qn/') }}"+ question.P2 +".png" + imgv); 
      img_q3.setAttribute('src',"{{ url_for('static', filename='img/qn/') }}"+ question.P3 +".png" + imgv); 
    };

    b_q1.addEventListener("click", myClickScript);
    b_q1.textContent = "submit"

    p_a1.textContent = "Answer is: " + question.A1;
    p_a2.textContent = "Answer is: " + question.A2;
    p_a3.textContent = "Answer is: " + question.A3;
    p_s1.textContent = question.S1;
    p_s2.textContent = question.S2;
    p_s3.textContent = question.S3;
    
    // hide(p_a1);
    // hide(p_a2);
    // hide(p_a3);
    
    // hide(p_s1);
    // hide(p_s2);
    // hide(p_s3);

    function myClickScript() {
      // force answer on all inputs
      if (i_q1.value ==="" || 
          i_q2.value === "" && question.Q2 != "" || 
          i_q3.value === "" && question.Q3 != "") {
        return;
      } else {
        b_q1.disabled = true;
        current_qn += 1;
        display(document.getElementById(current_qn));
        checkAnswers(i_q1,question.A1,p_r1,p_a1,p_s1,question.M1);
        if (question.Q2 != ""){
          checkAnswers(i_q2,question.A2,p_r2,p_a2,p_s2,question.M2);
        }
        if (question.Q3 != ""){
        checkAnswers(i_q3,question.A3,p_r3,p_a3,p_s3,question.M3);
        }
      }
    }

    function checkAnswers(i_q,q_,p_r,p_a,p_s,marks){
      i_q.readOnly = true;
      display(p_a);
      display(p_s);
      if (i_q.value.toLowerCase() === q_.toLowerCase() || 
      parseFloat(i_q.value) === parseFloat(q_)) {
        b_q1.innerHTML = "Correct!";
        card.style.backgroundColor = "#357e7b";
        // score = score + parseInt(marks,10);
        // p_score.innerHTML = score;
        // maxscore = maxscore + parseInt(marks,10);
        // p_maxscore.innerHTML = maxscore;
        starttimer(1,0);
      } else {
        b_q1.innerHTML = "Incorrect!"
        card.style.backgroundColor = "#7e3538";
        // maxscore = maxscore + parseInt(marks,10);
        // p_maxscore.innerHTML = maxscore;
      };
      accuracy = Math.round(score/maxscore*100);
      p_accuracy.innerHTML = String(accuracy) + "%";
    }

    // Append the cards to the container element
    container.appendChild(card);

    card.appendChild(p_id);
    card.appendChild(p_question);
    if( question.Picture != "") {
      card.appendChild(img_question);
    };
    card.appendChild(p_q1);
    if( question.P1 != "") {
      card.appendChild(img_question);
    };
    card.appendChild(p_mcA);
    card.appendChild(p_mcB);
    card.appendChild(p_mcC);
    card.appendChild(p_mcD);
    card.appendChild(i_q1);
    card.appendChild(p_r1);
    card.appendChild(p_a1);
    card.appendChild(p_s1);
    if (question.Q2 != "") {
      card.appendChild(p_q2);
      if( question.P2 != "") {
        card.appendChild(img_question);
      };
      card.appendChild(i_q2);
      card.appendChild(p_r2);
      card.appendChild(p_a2);
      card.appendChild(p_s2);
    };
    if (question.Q3 != "") {
      card.appendChild(p_q3);
      if( question.P3 != "") {
        card.appendChild(img_question);
      };
      card.appendChild(i_q3);
      card.appendChild(p_r3);
      card.appendChild(p_a3);
      card.appendChild(p_s3);
    };
    card.appendChild(b_q1);

    // Track card id
    card_id += 1;
    card.id = card_id;
    if (card_id > 1){
      hide(card);
    }

  });
}
request.send();

// Clock Stuff

var showmns = document.getElementById('showmns');
var showscs = document.getElementById('showscs');

var count = 0;

function pad2(n) {
    return n < 10 ? '0' + n : n;
};

function show() {
    var s = count % 60;
    var m = Math.floor(count / 60);
    showmns.innerHTML = pad2(m);
    showscs.innerHTML = pad2(s);
};

function timer() {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    show();
    if (count-- > 0) {
        setTimeout(timer, 1000);
    } else {
      // alert();
    };

};

function starttimer(mns,scs) {
  var s = parseInt(scs, 10);
  var m = parseInt(mns, 10);
  if (isNaN(s) || isNaN(m)) return;
  scs = s;
  mns = m;
  
  var current = count;
  timegain = ((m * 60) + s);
  count += timegain;
  
  // only restart the counter loop if it was previously stopped
  if (current <= 0) {
      timer();
  } else {
      show();
  };

};

starttimer(5,0);