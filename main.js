const gamefield = document.getElementById('GamefieldDiv');
const modeButtons = document.querySelectorAll('.mode');
const clearButton = document.querySelector('#clear')
const sizeSlider = document.getElementById('slider');
const display = document.getElementById('SizeDisplay');
let mode = 'standardMode';


function createGamefield (gridNumber) {
    let gridSize = gridNumber*gridNumber;
    console.log(gridSize);

    document.documentElement.style.setProperty('--columns-rows', gridNumber)
    for (let i=1; i<= gridSize; i++){
        let gridField = document.createElement('div');
        gridField.style.cssText = 'background-color:e5e5e5; width:100%; height:100%;'
        gamefield.appendChild(gridField);
        
    }
    var gridPixels = gamefield.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', pen))
}

// switching color dependant on mode
function pen () {
    switch (mode){
            case 'rainbowMode':
            this.style.backgroundColor = getRandomColor();
                break;
            case 'darkMode' :
                if (this.style.backgroundColor.match(/rgba/)) {
                    let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                    console.log(currentOpacity,this.style.backgroundColor )
                    if (currentOpacity <= 0.9) {
                        this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.2})`;
                    }
                } else if (this.style.backgroundColor == 'rgb(0, 0, 0)') {
                    return;
                } else {
                    this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';  
                }
                break;
            case 'eraser':
                this.style.backgroundColor = '#e5e5e5';
                break;
            case 'standardMode':
                this.style.backgroundColor= 'black';
                break;
            
        }
}

// Chnaging mode by clicking on button
function changeMode (e) {
    switch(e.target.dataset.mode){
        case 'rainbowMode':
            mode = 'rainbowMode';
            break;
        case 'darkMode':
            mode = 'darkMode';
            break;
        case 'standardMode':
            mode = 'standardMode';
            break;
        case 'eraser':
            mode = 'eraser';
            break;
        default: 
            mode = 'standardMode';
            break;

    }
}

function gameSize () {
    let gridFields = gamefield.querySelectorAll('div');
    gridFields.forEach(gridField => gridField.remove());
    createGamefield(sizeSlider.value);
    
}

function clearGame (){
    let gridFields = gamefield.querySelectorAll('div');
    gridFields.forEach(gridField => gridField.style.backgroundColor = '#e5e5e5')
}

slider.oninput = function() {
        display.textContent = this.value + ' x ' + this.value;
        
      }

slider.onmousedown = function () {
    display.style.border = '5px solid white';
    
}

slider.onmouseup = function () {
    display.style.border = '2px solid black';
}

slider.onmouse

// RandomColor for Rainbow Mode
function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

// Event Listeners

modeButtons.forEach (modeButton => modeButton.addEventListener('click', changeMode));
sizeSlider.addEventListener('mouseup', gameSize)
clearButton.addEventListener('click', clearGame )


createGamefield(16);