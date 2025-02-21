new Vue({
    el: '#app',
    data: {
        columns: [[], [], []],
        columnTitles: ['В процессе', 'На проверке', 'Выполнено'],
        nextId: 1,
        newTitle: ''
    },
    methods: {
        addCard() {
            if (this.columns[0].length >= 3) return;
            const initialItems = [
                { text: '', completed: false },
                { text: '', completed: false },
                { text: '', completed: false }
            ];
            this.columns[0].push({
                id: this.nextId++,
                title: this.newTitle,
                items: initialItems,
                completedAt: null
            });
            this.newTitle = '';
            this.saveData();
        },
        removeCard(columnIndex, cardIndex) {
            this.columns[columnIndex].splice(cardIndex, 1);
            this.saveData();
        },
        updateCardStatus(card) {
            const completedCount = card.items.filter(item => item.completed).length;
            const totalItems = card.items.length;
            if (totalItems === 0) return;
            const completionPercentage = (completedCount / totalItems) * 100;

            if (completionPercentage > 50 && completionPercentage < 100) {
                if (this.columns[1].length < 5) {
                    this.moveCard(0, 1, card);
                }
            } else if (completionPercentage === 100) {
                card.completedAt = new Date().toLocaleString();
                // Перемещаем карточку в третий столбец, если все пункты выполнены
                let currentIndex = this.columns.findIndex(column => column.some(c => c.id === card.id));
                if (currentIndex !== -1 && currentIndex !== 2) {
                    this.moveCard(currentIndex, 2, card);
                }
            }
            this.saveData();
        },
        moveCard(fromIndex, toIndex, card) {
            const fromColumn = this.columns[fromIndex];
            const toColumn = this.columns[toIndex];
            const cardIndex = fromColumn.findIndex(c => c.id === card.id);
            if (cardIndex !== -1) {
                toColumn.push(fromColumn.splice(cardIndex, 1)[0]);
            }
            this.saveData();
        },
        isColumnLocked(index) {
            if (index === 0 && this.columns[1].length >= 5) {
                return true;
            }
            return false;
        },
        addItem(card) {
            if (card.items.length >= 5) return; // Ограничение на количество пунктов в карточке
            card.items.push({ text: '', completed: false });
            this.saveData();
        },
        removeItem(card, itemIndex) {
            if (card.items.length <= 3) return; // Не удаляем пункт, если их меньше 3
            card.items.splice(itemIndex, 1);
            this.saveData();
        },
        saveData() {
            localStorage.setItem('noteAppData', JSON.stringify(this.columns));
        },
        loadData() {
            const savedData = localStorage.getItem('noteAppData');
            if (savedData) {
                this.columns = JSON.parse(savedData);
            }
        }
    },
    created() {
        this.loadData();
    }
});