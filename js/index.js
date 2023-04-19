let navHeaderLinks = document.getElementsByClassName('nav-link');
let buttons = document.getElementsByClassName('link-button');
let cardsHeaders = document.getElementsByClassName('ability-title');


const hoverLink = function(event) {

    if(!event.target.classList.contains('fa-solid')) {
        
        for(let item of navHeaderLinks) {
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
    for(let item of navHeaderLinks) {
        item.classList.remove('active');
    }
}

for(let item of navHeaderLinks) {
    item.addEventListener('click', hoverLink);
}

for(let button of buttons) {
    button.addEventListener('mousedown', buttonAnimation);
    button.addEventListener('mouseup', restoreButtonAnimation);
}

for(let title of cardsHeaders) {
    title.addEventListener('mouseover', textAnimationSkill, {once: true});
}

document.addEventListener('wheel', removeAllActive);