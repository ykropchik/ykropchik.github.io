window.addEventListener('DOMContentLoaded', function() {
    let contacts = document.getElementsByClassName('contact');

    if (!sessionStorage.getItem(contacts[0].id)){
        for(let i = 0; i < contacts.length; i++) {
            sessionStorage.setItem(contacts[i].id, JSON.stringify([]));
        } 
    }

    let id = document.getElementsByClassName('contact active')[0].id;
    displayMessages(id);

    document.getElementById('message-text-input').addEventListener('keyup', function(data){
        if (data.key == 'Enter') {
            if (this.value != ' ' && this.value != '') {
                createMessage(this.value);
                saveMessage(this.value);
                this.value = '';
            }
        }
    })

    for (let i = 0; i < contacts.length; i++) {
        contacts[i].addEventListener('click', function(data) {
            let contacts = document.getElementsByClassName('contact');
            for(let i = 0; i < contacts.length; i++) {
                contacts[i].classList.remove('active');
            }
    
            document.getElementById(data.currentTarget.id).classList.add('active');
            displayMessages(data.currentTarget.id);
        })
    }
    
});

function createMessage(text) {
    let message = document.createElement('span');
    message.classList.add('message');
    message.textContent = text;
    let messagesContainer = document.getElementById('messages-container');
    messagesContainer.append(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function saveMessage(text) {
    let id = document.getElementsByClassName('contact active')[0].id;
    let messages = JSON.parse(sessionStorage.getItem(id));
    messages.push(text);
    sessionStorage.setItem(id, JSON.stringify(messages));
}


function displayMessages(id) {
    document.getElementById('messages-container').innerHTML = '';
    let messages = JSON.parse(sessionStorage.getItem(id));
    for (let i = 0; i < messages.length; i++) {
        createMessage(messages[i]);
    }
}