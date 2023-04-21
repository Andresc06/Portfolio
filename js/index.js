const NAV_HEADER_LINKS = document.getElementsByClassName('nav-link');
const BUTTONS = document.getElementsByClassName('link-button');
const CARDS_HEADERS = document.getElementsByClassName('card-title');
const CARDS = document.getElementsByClassName('cards');

const hoverLink = function(event) {

    if(!event.target.classList.contains('fa-solid')) {
        
        for(let item of NAV_HEADER_LINKS) {
            item.classList.remove('active');
        }
        event.target.classList.add('active');
    }
    
}

const textAnimationSkill = function(event) {
    let title = event.target;
    let text = title.innerHTML;
    title.style.visibility = 'hidden';
    let i = 0;
    function myLoop() {
        setTimeout(function() {
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

const buttonAnimation = function(event) {
    let button = event.target;
    button.style.boxShadow = '0px 0px 0px';
    button.style.transform = 'translateY(5px)';
}

const restoreButtonAnimation = function(event) {
    let button = event.target;
    button.style.boxShadow = '0px 3px 0px';
    button.style.transform = 'translateY(-5px)';
}

const removeAllActive = () => {
    for(let item of NAV_HEADER_LINKS) {
        item.classList.remove('active');
    }
}

for(let item of NAV_HEADER_LINKS) {
    item.addEventListener('click', hoverLink);
}

for(let button of BUTTONS) {
    button.addEventListener('mousedown', buttonAnimation);
    button.addEventListener('mouseup', restoreButtonAnimation);
}

for(let title of CARDS_HEADERS) {
    title.addEventListener('mouseover', textAnimationSkill, {once: true});
}

document.addEventListener('wheel', removeAllActive);
  
(() => {
    let windowHeight;
  
    const init = () => {
      windowHeight = window.innerHeight;
    }

    const checkPosition = () => {
        for (let i = 0; i < CARDS.length; i++) {
          let card = CARDS[i];
          let positionFromTop = CARDS[i].getBoundingClientRect().top;
    
          if (positionFromTop - windowHeight <= 0) {
            card.classList.add('slide-in-from-left');
            card.classList.remove('hidden');
          }
        }
      }
  
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  
    init();
    checkPosition();
})();