const santa = document.getElementById('santa');
const giftsContainer = document.getElementById('gifts-container');
const housesContainer = document.getElementById('houses-container');
let gameWidth = document.getElementById('game-container').clientWidth;
let gameHeight = document.getElementById('game-container').clientHeight;
let santaWidth = santa.offsetWidth;

// Initialize Santa's position
santa.style.top = '50px';
santa.style.left = '0px';

function moveSanta() {
  let santaLeft = parseInt(santa.style.left, 10);
  
  // Move Santa across the screen
  santaLeft += 5;
  if (santaLeft > gameWidth - santaWidth) {
    santaLeft = 0; // Reset Santa's position to loop from the left again
    generateHouses(); // Generate new houses when Santa starts over
  }
  
  santa.style.left = santaLeft + 'px';
}

function dropGift() {
  let gift = document.createElement('div');
  gift.className = 'gift';
  let santaCenter = parseInt(santa.style.left, 10) + (santaWidth / 2);
  gift.style.left = `${santaCenter - 10}px`; // Center gift under Santa
  gift.style.top = santa.style.top;
  
  giftsContainer.appendChild(gift);
  fallGift(gift);
}

function fallGift(gift) {
  let giftTop = parseInt(gift.style.top, 10);
  
  function fall() {
    if (giftTop < gameHeight - 20) { // Assuming the gift is 20px high
      giftTop += 5;
      gift.style.top = giftTop + 'px';
      checkCollision(gift);
    } else {
      giftsContainer.removeChild(gift); // Remove the gift if it falls to the bottom
      clearInterval(fallInterval); // Stop the interval
    }
  }

  let fallInterval = setInterval(fall, 30);
}

function generateHouses() {
  // Clear out any old houses
  housesContainer.innerHTML = '';

  // Generate a random number of houses, for example between 3 and 5
  let numberOfHouses = 3 + Math.floor(Math.random() * 3);

  for (let i = 0; i < numberOfHouses; i++) {
    let house = document.createElement('div');
    house.className = 'house';
    
    // Randomly position each house along the bottom of the container
    let houseLeft = Math.floor(Math.random() * (gameWidth - 100)); // Assuming house width is 100px
    house.style.left = `${houseLeft}px`;
    
    housesContainer.appendChild(house);
  }
}
let counter = 0;
function checkCollision(gift) {
  // Check for collision with houses
  let giftRect = gift.getBoundingClientRect();
  let houses = document.querySelectorAll('.house');

  houses.forEach(house => {
    let houseRect = house.getBoundingClientRect();
    
    // Check if the gift is within the chimney area of the house
    if (giftRect.left < houseRect.right && giftRect.right > houseRect.left &&
        giftRect.bottom < houseRect.bottom && giftRect.top > houseRect.top) {
      // If so, consider it a successful delivery and remove the gift
      giftsContainer.removeChild(gift);
      // You can add some score increment or animation here
      counter++;
      console.log(
        `Gift delivered to house at ${houseRect.left}px, ${houseRect.top}px!`
      )
        console.log(counter);
    }
  });
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    dropGift();
  }
});

setInterval(moveSanta, 20); // Move Santa every 20 milliseconds

// Initially generate houses when the game starts
generateHouses();
