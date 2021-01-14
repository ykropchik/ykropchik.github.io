var vm1 = new Vue({
    el: '#example1',
    data: {
        message: "Аноним",
        start: false
    }
})

var vm2 = new Vue({
    el: '#example2',
    data: {
        checked: false,
        start: false
    }
})

var vm3 = new Vue({
    el: '#example3',
    data: {
        start: false
    },
    methods: {
        inc: function() {
            document.getElementById('ex3-cont').insertAdjacentHTML('beforeend', '<h3>DROM - ЛУЧШИЙ САЙТ ДЛЯ ПРОДАЖИ АВТОМОБИЛЯ</h3>')
        }
    }
})