import $, { get } from 'jquery'

const COLORS = [
    '#EC6734',      //orange
    '#EAC314',      //yellow
    '#A6BC3C',      //green
    '#206373',      //blue
    '#80A4B0',      //light blue
    '#C22A3A',      //red
    '#DB97A0',      //pink
    '#843385',      //purple
    
]

$('document').ready(function() {
    getPosts();
    initialization();
});

function initialization() {

    $('#close-button').on('click', function() {
        $('#post-create-menu').hide();
    });

    $('#input-username').on('focus', function() {
        $(this).parent().addClass("animation animation-color");
    });

    $("#input-username").on('focusout', function(){
        if($(this).val() === "") {
            $(this).parent().removeClass("animation");
            $('#username-symbols').text('Это поле не может быть пустым');
            $('#username-symbols').css('color', '#cc0000');
        }
        $(this).parent().removeClass("animation-color");
    });

    $("#input-username").on('keyup', function(){
        $('#username-symbols').css('color', '#ccc');
        $('#username-symbols').text(20 - $(this).val().length + '/20');

        if ($('#input-text').val() != "") {
            $('#send-button').prop('disabled', false);
        }

        if ($('#input-username').val() === "") {
            $('#send-button').prop('disabled', true);
        }
    });

    $('#input-text').on('focus', function() {
        $(this).parent().addClass("animation animation-color");
    });

    $("#input-text").on('focusout', function(){
        if($(this).val() === "") {
            $(this).parent().removeClass("animation");
            $('#text-symbols').text('Это поле не может быть пустым');
            $('#text-symbols').css('color', '#cc0000');
        }
        $(this).parent().removeClass("animation-color");
    });

    $("#input-text").on('keyup', function(){
        $('#text-symbols').css('color', '#ccc');
        $('#text-symbols').text(150 - $(this).val().length + '/150');

        if ($('#input-username').val() != "") {
            $('#send-button').prop('disabled', false);
        }

        if ($('#input-text').val() === "") {
            $('#send-button').prop('disabled', true);
        }
    });

    $('#send-button').on('click', () => {
        let date = new Date();
        let data = {
            author:  $("#input-username").val(),
            text:  $("#input-text").val(),
            date: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.'
                + date.getFullYear() + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
                + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
        }

        if ($('#color-check-box').is(':checked')) {
            data.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        } else {
            data.color = $('#input-color').val()
        }

        sendPost(data);
        $('#post-create-menu').hide();
    });

    $('#floating-button').on('click', () => {
        $('#post-create-menu').show();
    });
}

function insertPost(post) {
    $('#posts-board').append(
        '<div class="post"><span class="post-author" style="background-color: ' + post.color + '; color: ' + '">' + post.author + 
        '</span><span class="post-text">' + post.text + 
        '</span><span class="post-date">' + post.date + '</span></div>'
    );
}


function getPosts() {
    $('#posts-board').html('');

    $.ajax({
        url: '/api/posts',
        type: 'GET',
        contentType: 'application/json',
    }).done((res) => {
        let posts = JSON.parse(res);
        for (var i = 0; i < posts.length; i++) {
            insertPost(posts[i]);
        }
    });
}

function sendPost(post) {
    $.ajax({
        url: '/api/posts',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(post)
    }).done((res) => getPosts());
}

function сolorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}