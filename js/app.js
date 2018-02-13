// 'use strict';

let clickCounter = 0;

const board = document.getElementById('survey-board');
const listen = function () {
    console.log('game was clicked', event.target);
    const file = event.target.src;
    for (let i = 0; i < survey.surveyItems.length; i++) {
        const item = survey.surveyItems[i];
        const endOfFile = file.slice( file.indexOf(item.image), file.length );

        if (endOfFile === item.image) {
            item.timesPicked++;
            clickCounter++;
            console.table(item);
        }
    }
    survey.clearBoard();
    survey.showItems();

    if (clickCounter === 27) {
        board.removeEventListener('click', listen);
        // survey.clearBoard();
        survey.buildPickedChart();
        survey.buildShownChart();
    }
};

function SurveyItem (name, imageFile) {
    this.name = name;
    this.image = imageFile;
    this.timesPicked = 0;
    this.timesShown = 0;
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
        board.addEventListener('click', listen);
    },

    getRandomItem: function () {
        const selectedItems = [];
        while (selectedItems.length < 3) {
            const randomNumber = Math.floor(Math.random() * this.surveyItems.length);
            const item = this.surveyItems[randomNumber];
            if (selectedItems.includes(item)) continue;
            selectedItems.push(item);
            item.timesShown++;

        }
        console.table(selectedItems);
        return selectedItems;
    },

    getSquares: function () {
        const section = document.getElementById('survey-board');
        const allSquares = document.querySelectorAll('div.row-one');
        const selectedSquares = [];
        while(selectedSquares.length < 3) {
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
    },

    buildPickedChart: function () {
        const chartCanvas = document.getElementById('chart1');
        const chartCtx = chartCanvas.getContext('2d');

        const names = [];
        const timesClicked = [];
        for(let i = 0; i < this.surveyItems.length; i ++) {
            names.push(this.surveyItems[i].name);
            timesClicked.push(this.surveyItems[i].timesPicked);
        }

        const chart = new Chart(chartCtx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'number of times picked',
                    data: timesClicked
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    },

    buildShownChart: function () {
        const chartCanvas = document.getElementById('chart2');
        const chartCtx = chartCanvas.getContext('2d');

        const names = [];
        const shown = [];
        for(let i = 0; i < this.surveyItems.length; i ++) {
            names.push(this.surveyItems[i].name);
            shown.push(this.surveyItems[i].timesShown);
        }

        const chart = new Chart(chartCtx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'number of times shown',
                    data: shown
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
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