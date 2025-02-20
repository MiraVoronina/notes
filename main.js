new Vue({
    el: '#app',
    data: {
        columns: [[], [], []],
        nextId: 1
    },
    methods: {
        addCard() {
            if (this.columns[0].length >= 3) return;

            this.columns[0].push({
                id: this.nextId++,
                title: 'Новая карточка'
            });
        }
    }
});