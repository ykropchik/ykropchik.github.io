window.addEventListener('DOMContentLoaded', initialisation());

const imgStyles = ['style-1', 'style-2', 'style-3', 'style-4'];

function initialisation() {
    let request = new XMLHttpRequest();

    request.open('GET', 'https://picsum.photos/v2/list?page=' + Math.floor(Math.random() * Math.floor(11)) + '&limit=50');
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            createGrid(request.responseText);
        }
    })
    request.send();
}

function createGrid(data) {
    let imgArray = JSON.parse(data);
    for (let img of imgArray) {
        insertImg(img['download_url']);
    }

    let imgElements = document.getElementById('img-grid').children;
    let stylingFrom = 0;
    let lastStyle = -1;

    stylingFrom += Math.floor(Math.random() * Math.floor(7) + 1);
    lastStyle = Math.floor(Math.random() * Math.floor(imgStyles.length));
    imgElements[stylingFrom].classList.add(imgStyles[lastStyle]);
    stylingFrom += 7;

    while (stylingFrom + 5 < imgElements.length) {
        stylingFrom += Math.floor(Math.random() * Math.floor(4) + 1);
        lastStyle = Math.floor(Math.random() * Math.floor(imgStyles.length));
        imgElements[stylingFrom].classList.add(imgStyles[lastStyle]);
        stylingFrom += 7;
    }
}

function insertImg(url) {
    document.getElementById('img-grid').insertAdjacentHTML('beforeend', '<div class="img" style="background: url(' + url + ');"></div>');
}