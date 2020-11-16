window.addEventListener('DOMContentLoaded', initialisation);

var hours = 0;
var minutes = 0;
var seconds = 0;

function initialisation() {
    document.getElementById('info-icon-container').addEventListener('mouseup', function() {
        this.classList.add('expand');
        document.getElementById('info-icon').classList.add('hide');
        document.getElementById('info-container').classList.add('expand');
        setTimeout(function() {
            document.getElementById('info-icon').style.display = 'none';
        }, 500);
    })

    document.getElementById('accept-btn').addEventListener('mouseup', function() {
        document.getElementById('info-icon-container').classList.remove('expand');
        document.getElementById('info-icon').classList.remove('hide');
        document.getElementById('info-container').classList.remove('expand');
        setTimeout(function() {
            document.getElementById('info-icon').style.display = 'block';
        }, 500);
    });

    document.getElementById('timer-container').addEventListener('wheel', function(event) {
       switch (event.target.id) {
           case 'hours':
               if (event.deltaY < 0) { 
                   if (++hours === 24) { hours = 0;}
               } else {
                if (--hours === -1) { hours = 23;}
               }
               
               document.getElementById('hours').innerHTML = hours < 10 ? '0' + hours : hours;
               break;
            case 'minutes':
                if (event.deltaY < 0) { 
                    if (++minutes === 60) { minutes = 0;}
                } else {
                    if (--minutes === -1) { minutes = 59;}
                }

                document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
                break;
            case 'seconds':
                if (event.deltaY < 0) { 
                    if (++seconds === 60) { seconds = 0;}
                } else {
                    if (--seconds === -1) { seconds = 59;}
                }

                document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
                break;
       }
    });

    document.getElementById('start-btn').addEventListener('mouseup', function() {
        if (hours !== 0 || minutes !== 0 || seconds !== 0) {
            const timer = new Promise(function (resolve, reject) {
                setInterval(() => {
                    if (--seconds === -1) { 
                        seconds = 59;
                        if (--minutes === -1) { 
                            minutes = 59;
                            --hours;
                        }
                    }

                    document.getElementById('hours').innerHTML = hours < 10 ? '0' + hours : hours;
                    document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
                    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

                    if ((hours * 60 * 60) + (minutes * 60) + seconds === 0) {
                        resolve();
                    }
                }, 1000);
            })
            
            document.getElementById('start-btn').style.display = 'none';

            timer.then(
                () => {
                    document.getElementById('timer-container').innerHTML = "<span id='timeIsUp'>Время вышло!</span>";
                }
            )
        }

       
    })
}

