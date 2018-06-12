// Access div in index.html
const app = document.getElementById('root');

// logo set to logo.png
const logo = document.createElement('img');
logo.src = '../img/sheep.png';
logo.style.width = "400px";

// set up container
const container = document.createElement('div');
container.setAttribute('class', 'container');

// add logo and containder to the app root
app.appendChild(logo);
app.appendChild(container);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://www.empirestreet.com.au/questionlist', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  // Error handling
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      // Create a div with a card class
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // Create an h1 and set the text content to the film's title
      const h1 = document.createElement('h1');
      h1.textContent = movie.Subject;

      // Create a p and set the text content to the film's description
      const p = document.createElement('p');
      movie.Q1 = movie.Q1.substring(0, 300); // Limit to 300 chars
      p.textContent = `${movie.Q1}...`; // End with an ellipses

      // Append the cards to the container element
      container.appendChild(card);

      // Each card will contain an h1 and a p
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();