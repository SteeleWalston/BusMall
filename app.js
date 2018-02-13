function SurveyItem (name, imageFile) {
    this.name = name;
    this.image = imageFile;
    this.timesPicked = 0;
}

const survey = {
    surveyItems: [],
    start: function () {

        this.surveyItems.push(
            new SurveyItem ('bag',  'Images/bag.jpg'),
            new SurveyItem ('banana',  'Images/banana.jpg'),
            new SurveyItem ('bathroom',  'Images/bathroom.jpg'),
            new SurveyItem ('boots',  'Images/boots.jpg'),
            new SurveyItem ('breakfast',  'Images/bag.jpg'),
            new SurveyItem ('bubblegum',  'Images/bubblegum.jpg'),
            new SurveyItem ('chair',  'Images/chair.jpg'),
            new SurveyItem ('cthulhu',  'Images/cthulhu.jpg'),
            new SurveyItem ('dog-duck',  'Images/dog-duck.jpg'),
            new SurveyItem ('dragon',  'Images/dragon.jpg'),
            new SurveyItem ('pen',  'Images/pen.jpg'),
            new SurveyItem ('pet-sweep',  'Images/pet-sweep.jpg'),
            new SurveyItem ('scissors',  'Images/scissors.jpg'),
            new SurveyItem ('shark',  'Images/shark.jpg'),
            new SurveyItem ('sweep',  'Images/sweep.png'),
            new SurveyItem ('tauntaun',  'Images/tauntaun.jpg'),
            new SurveyItem ('unicorn',  'Images/unicorn.jpg'),
            new SurveyItem ('usb',  'Images/usb.gif'),
            new SurveyItem ('water-can',  'Images/water-can.jpg'),
            new SurveyItem ('wine-glass',  'Images/wine-glass.jpg')
        );

        survey.showItems();

        const board = document.getElementById('survey-board');
        board.addEventListener('click', function() {
            console.log('game was clicked', event.target);
            const file = event.target.src;
            for (let i = 0; i < survey.surveyItems.length; i++) {
                const item = survey.surveyItems[i];
                const endOfFile = file.slice( file.indexOf(item.image), file.length );

                if (endOfFile === item.image) {
                    item.timesPicked++;
                    console.table(item);
                }
            }
            survey.clearBoard();
            survey.showItems();
        });
    },

    getRandomItem: function () {
        const selectedItems = [];
        while (selectedItems.length < 3) {
            const randomNumber = Math.floor(Math.random() * this.surveyItems.length);
            const item = this.surveyItems[randomNumber];
            if (selectedItems.includes(item)) continue;
            selectedItems.push(item);

        }
        console.table(selectedItems);
        return selectedItems;
    },

    getSquares: function () {
        const section = document.getElementById('survey-board');
        const allSquares = document.querySelectorAll('div.row-one');
        const selectedSquares = [];
        while(selectedSquares.length < 3) {
            // get random square
            const randomNumber = Math.floor(Math.random() * allSquares.length);
            const square = allSquares[randomNumber];
            if (selectedSquares.includes(square)) continue;
            selectedSquares.push(square);
        }

        return selectedSquares;
    },

    showItems: function () {
        const items = this.getRandomItem();
        const squares = this.getSquares();
        for (let i = 0; i < squares.length; i++) {
            squares[i].appendChild(items[i].render());
        }
    },

    clearBoard: function () {
        const squares = document.querySelectorAll('div.row-one');
        for (let i = 0; i < squares.length; i ++) {
            squares[i].textContent = '';
        }
    }
};

SurveyItem.prototype.render = function () {
    const ele = document.createElement('img');
    ele.src =  this.image;
    ele.setAttribute('alt', this.name);
    return ele;
};

survey.start();
survey.getRandomItem();