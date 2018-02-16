const settingsForm = document.getElementById('settings-form');
settingsForm.addEventListener('submit', function() {

    event.preventDefault();
    const numProducts = parseInt(this['num-products'].value);
    const numClicks = parseInt(this['num-clicks'].value);

    const settings = {
        numProducts: numProducts,
        numClicks: numClicks
    };

    localStorage.setItem('settings', JSON.stringify(settings));

});