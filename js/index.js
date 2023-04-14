let navHeaderLinks = document.getElementsByClassName('nav-link');
let buttons = document.getElementsByClassName('link-button');

const hoverLink = function(event) {

    if(!event.target.classList.contains('fa-solid')) {
        
        for(let item of navHeaderLinks) {
            item.classList.remove('active');
        }
        event.target.classList.add('active');
    }
    
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

document.addEventListener('wheel', removeAllActive);