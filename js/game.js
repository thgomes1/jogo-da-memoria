let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react",
    ],

    cards: null,

    setCard: function (id) {
        let card = this.cards.filter((card) => card.id === id)[0];
        // Filtra a carta nos objetos que tem o mesmo id do documento html.

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }
        if (!this.secondCard) {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }

        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function () {
        return this.cards.filter((card) => !card.flipped).length == 0;
    },

    createCardsFromTechs: function () {
        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        });

        this.cards = this.cards.flatMap((pair) => pair);

        this.shuffleCards(this.cards);

        return this.cards;
    },

    createPairFromTech: function (tech) {
        return [
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            },
            {
                id: this.createIdWithTech(tech),
                icon: tech,
                flipped: false,
            },
        ];
    },

    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        cards.sort(function (a, b) {
            a = 0.5;
            b = Math.random();
            return a - b;
        });
    },
};
