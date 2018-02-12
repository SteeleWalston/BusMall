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
            new SurveyItem ('dragon',  'Images/dragon.jpg'),
            new SurveyItem ('pen',  'Images/pen.jpg'),
            new SurveyItem ('pet-sweep',  'Images/pet-sweep.jpg'),
            new SurveyItem ('scissors',  'Images/scissors.jpg'),
            new SurveyItem ('shark',  'Images/shark.jpg'),
            new SurveyItem ('sweep',  'Images/sweep.jpg'),
            new SurveyItem ('tauntaun',  'Images/tauntaun.jpg'),
            new SurveyItem ('unicorn',  'Images/unicorn.jpg'),
            new SurveyItem ('usb',  'Images/usb.jpg'),
            new SurveyItem ('water-can',  'Images/water-can.jpg'),
            new SurveyItem ('wine-glass',  'Images/wine-glass.jpg')
        );
    }  
};

console.log(survey.surveyItems);
survey.start();