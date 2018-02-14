'use strict';

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

    if (clickCounter === 5) {
        board.removeEventListener('click', listen);
        // survey.clearBoard();
        survey.buildChart();

    }
    localStorage.setItem('timesVoted', JSON.stringify(survey.surveyItems));
    // localStorage.setItem('timesShown', JSON.stringify(survey.surveyItems));
};

function SurveyItem (name, imageFile, timesPicked, timesShown) {
    this.name = name;
    this.image = imageFile;
    this.timesPicked = timesPicked;
    this.timesShown = timesShown;
}

const survey = {
    surveyItems: [],
    start: function () {

        if (localStorage.getItem('timesVoted')) {
            const surveyObjects = JSON.parse(localStorage.getItem('timesVoted'));

            for (let i = 0; i < surveyObjects.length; i++) {
                const surveyObj = surveyObjects[i];

                const vote = new SurveyItem(surveyObj.name, surveyObj.image, surveyObj.timesPicked, surveyObj.timesShown);
                this.surveyItems.push(vote);
            }

        } else {

            this.surveyItems.push(
                new SurveyItem ('bag',  'Images/bag.jpg', 0, 0),
                new SurveyItem ('banana',  'Images/banana.jpg', 0, 0),
                new SurveyItem ('bathroom',  'Images/bathroom.jpg', 0, 0),
                new SurveyItem ('boots',  'Images/boots.jpg', 0, 0),
                new SurveyItem ('breakfast',  'Images/breakfast.jpg', 0, 0),
                new SurveyItem ('bubblegum',  'Images/bubblegum.jpg', 0, 0),
                new SurveyItem ('chair',  'Images/chair.jpg', 0, 0),
                new SurveyItem ('cthulhu',  'Images/cthulhu.jpg', 0, 0),
                new SurveyItem ('dog-duck',  'Images/dog-duck.jpg', 0, 0),
                new SurveyItem ('dragon',  'Images/dragon.jpg', 0, 0),
                new SurveyItem ('pen',  'Images/pen.jpg', 0, 0),
                new SurveyItem ('pet-sweep',  'Images/pet-sweep.jpg', 0, 0),
                new SurveyItem ('scissors',  'Images/scissors.jpg', 0, 0),
                new SurveyItem ('shark',  'Images/shark.jpg', 0, 0),
                new SurveyItem ('sweep',  'Images/sweep.png', 0, 0),
                new SurveyItem ('tauntaun',  'Images/tauntaun.jpg', 0, 0),
                new SurveyItem ('unicorn',  'Images/unicorn.jpg', 0, 0),
                new SurveyItem ('usb',  'Images/usb.gif', 0, 0),
                new SurveyItem ('water-can',  'Images/water-can.jpg', 0, 0),
                new SurveyItem ('wine-glass',  'Images/wine-glass.jpg', 0, 0)
            );
        }


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

    buildChart: function () {
        const chartCanvas = document.getElementById('chart1');
        const chartCtx = chartCanvas.getContext('2d');

        const names = [];
        const timesClicked = [];
        const timesViewed = [];
        for(let i = 0; i < this.surveyItems.length; i ++) {
            names.push(this.surveyItems[i].name);
            timesClicked.push(this.surveyItems[i].timesPicked);
            timesViewed.push(this.surveyItems[i].timesShown);
        }

        const chart = new Chart(chartCtx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'Number of times Shown',
                    data: timesViewed,
                    backgroundColor: 'rgba(0,0,0, 0.7)'
                },

                {
                    label: 'Number of times Picked',
                    data: timesClicked,
                    backgroundColor: 'white'
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
};

SurveyItem.prototype.render = function () {
    const ele = document.createElement('img');
    ele.src =  this.image;
    ele.setAttribute('alt', this.name);
    return ele;
};

survey.start();
survey.getRandomItem();