new Vue({
    el: '#app',
    data: {
        columns: [[], [], []],
        columnTitles: ['В процессе', 'На проверке', 'Выполнено'],
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
                items: [{ text: this.newItem, completed: false }],
                completedAt: null
            });
            this.newTitle = '';
            this.newItem = '';
        },
        removeCard(columnIndex, cardIndex) {
            this.columns[columnIndex].splice(cardIndex, 1);
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
                this.moveCard(0, 2, card); // Перемещаем сразу в третий столбец
            }
        },
        moveCard(fromIndex, toIndex, card) {
            const fromColumn = this.columns[fromIndex];
            const toColumn = this.columns[toIndex];

            const cardIndex = fromColumn.findIndex(c => c.id === card.id);
            if (cardIndex !== -1) {
                toColumn.push(fromColumn.splice(cardIndex, 1)[0]);
            }
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
        },
        removeItem(card, itemIndex) {
            card.items.splice(itemIndex, 1);
        }
        
    }
});