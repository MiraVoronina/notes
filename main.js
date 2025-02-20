new Vue({
    el: '#app',
    data: {
        columns: [[], [], []],
        nextId: 1,
        newTitle: '',
        newItem: ''
    },
    methods: {
        addCard() {
            if (this.columns[0].length >= 3) return;

            this.columns[0].push({
                id: this.nextId++,
                title: this.newTitle,
                items: [{ text: this.newItem, completed: false }]
            });
            this.newTitle = '';
            this.newItem = '';
        }
    }
});