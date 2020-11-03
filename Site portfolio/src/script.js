window.addEventListener('DOMContentLoaded', initialisation);

function initialisation() {
    var elements = document.getElementsByClassName('Home');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('active');
    } 

    setListeners();
}

function setListeners() {
    var nav = document.querySelector('nav');

    var navigationListener = function(event) {
        if (event.target.tagName === 'SPAN') {
            nav.getElementsByClassName('active')[0].classList.remove('active');
            event.target.classList.add('active');

            document.getElementsByClassName('Content active')[0].classList.remove('active');
            document.getElementsByClassName('Content ' + event.target.classList[0])[0].classList.add('active');
        }
    }

    nav.addEventListener('click', navigationListener);

    var humListener = function(event) {
        var pianoClasses = document.getElementById('piano-nav').classList;
        if (pianoClasses.contains('hide')) {
            document.getElementById('piano-nav').classList.remove('hide');
        } else {
            document.getElementById('piano-nav').classList.add('hide');
        }
        
        var icons = document.getElementById('ico').getElementsByTagName('path');

        for (var i = 0; i < icons.length; i++) {
            if (icons[i].classList.contains('hide')) {
                icons[i].classList.remove('hide');
            } else {
                icons[i].classList.add('hide');
            }
        }
    }

    document.getElementById('ico').addEventListener('click', humListener);
}