// Const for the selection of different elements in DOM

const NAV_HEADER_LINKS = document.getElementsByClassName('nav-link');
const BUTTONS = document.getElementsByClassName('link-button');
const CARDS_HEADERS = document.getElementsByClassName('card-title');
const CARDS = document.getElementsByClassName('cards');
const LANGUAGE_DIVS = document.getElementsByClassName('language-divs-link');
const LANGUAGE_CARDS = Array.from(document.getElementsByClassName('react-phy')).concat(Array.from(document.getElementsByClassName('js'))).concat(Array.from(document.getElementsByClassName('html-css')));
const PROJECT_CARDS = document.getElementsByClassName('project');


// Functions for the different events

// Function to handle the animation when the user select a link section in the header
const hoverLink = (event) => {

    if(!event.target.classList.contains('fa-solid')) {
        
      // Go over each header link and if the user select one, remove the active class from the others and add it to the selected one
        for(let item of NAV_HEADER_LINKS) {
            item.classList.remove('active');
        }
        event.target.classList.add('active');
    }
    
}

// Function to remove the active class from all the header links
const removeAllActive = () => {
  for(let item of NAV_HEADER_LINKS) {
      item.classList.remove('active');
  }
}

// Function to handle the title animation in the skills section when the user hover it
const textAnimationSkill = (event) => {
    let title = event.target;
    let text = title.innerHTML;

    // Hide the title
    title.style.visibility = 'hidden';
    let i = 0;

    // Loop function that go over each letter of the title and append it to the title from the beginning
    function myLoop() {
        setTimeout(function() {

          // In the first iteration, the title is empty, so we need to add the first letter, in the next iterations, we need to append the next letter
          i === 0 ? title.innerHTML = text[i] : title.innerHTML += text[i];
          if(title.style.visibility == 'hidden') title.style.visibility = 'visible';
          i++;
          if (i < text.length) {
            myLoop(); 
          }
        }, 100)
      }
    myLoop()
}

// Function to handle the animation when the user click a button
const buttonAnimation = (event) => {
    let button = event.target;
    button.style.boxShadow = '0px 0px 0px';
    button.style.transform = 'translateY(5px)';
}

// Function to restore the animation when the user release the button
const restoreButtonAnimation = (event) => {
    let button = event.target;
    button.style.boxShadow = '0px 3px 0px';
    button.style.transform = 'translateY(-5px)';
}

// Function to handle when the user want to filter the projects by language
const changeLanguage = (event) => {

  let link = event.target;
  link.classList.add('active-language');
  for(let item of LANGUAGE_DIVS) {
    if(item !== link) {
      item.classList.remove('active-language');
    }
  }  
}

// Function to handle the cards that are shown when the user filter the projects by language
const showCards = (event) => {
  let link = event.target;
  let cards = link.getAttribute('data-cards');

  if(cards === 'all') LANGUAGE_CARDS.forEach(card => card.classList.remove('gone'))
  
  else {
    
    let cardsToShow = document.getElementsByClassName(cards);
  
    LANGUAGE_CARDS.filter(card => !card.classList.contains(cards)).forEach(card => card.classList.add('gone'));

    for(let item of cardsToShow) {
      item.classList.remove('gone');
    }
  }
}

// Function to handle the information of projects that are shown when the user hover an specific project
const showInfoCards = (event) => {
  let link = event.target;
  document.getElementById(`info-${link.id}`).classList.remove('gone');
}

// Function to handle the information of projects that are hidden when the user stop hovering an specific project
const hideInfoCards = (event) => {
  let link = event.target;
  document.getElementById(`info-${link.id}`).classList.add('gone');
}

// Event listeners

// Add event listener to each header link
for(let item of NAV_HEADER_LINKS) {
    item.addEventListener('click', hoverLink);
}

// Add event listener to each button
for(let button of BUTTONS) {
    button.addEventListener('mousedown', buttonAnimation);
    button.addEventListener('mouseup', restoreButtonAnimation);
}

// Add event listener to each title in the skills section
for(let title of CARDS_HEADERS) {
    title.addEventListener('mouseover', textAnimationSkill, {once: true});
}

// Add event listener to each language link to change to active language
for(let language of LANGUAGE_DIVS) {
  language.addEventListener('click', changeLanguage);
}

// Add event listener to each language link to show the cards of the selected language
for(let language of LANGUAGE_DIVS) {
  language.addEventListener('click', showCards);
}

// Add event listener to each project to show the information of the project
for(let project of PROJECT_CARDS) {
  project.addEventListener('mouseenter', showInfoCards);
  project.addEventListener('mouseleave', hideInfoCards);
}

// Add event listener to the document to remove the active class from all the header links when the user scroll
document.addEventListener('wheel', removeAllActive);

// Add event listener to the document to do the cards animation (slide) when the card is in the viewport
(() => {
    let windowHeight;
  
    const init = () => {
      windowHeight = window.innerHeight;
    }

    // Function to check if the card is in the viewport
    const checkPosition = () => {
        for (let i = 0; i < CARDS.length; i++) {
          let card = CARDS[i];
          let positionFromTop = CARDS[i].getBoundingClientRect().top;
    
          // If the card is in the viewport, add the slide animation
          if (positionFromTop - windowHeight <= 0) {
            card.classList.add('slide-in-from-left');
            card.classList.remove('hidden');
          }
        }
      }
  
    // Add event listeners
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  
    init();
    checkPosition();
})();