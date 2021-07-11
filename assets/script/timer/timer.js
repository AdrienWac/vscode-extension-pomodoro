const TIME_START_IN_SECONDS = 15;
let timerInterval = null;
let timerValue = TIME_START_IN_SECONDS;
let strokeValue = 0;
const BASE_TIMER_TOTAL_PATH_LENGTH = document.getElementById('base-timer-path-remaining').getTotalLength();

setTimerHtmlContent(TIME_START_IN_SECONDS);
startTimer();

function startTimer() {
    timerInterval = setInterval(() => {

        timerValue = timerValue - 1;

        if (timerValue <= 5 && timerValue > 0) {
            document.getElementById('base-timer-label').innerHTML = '';
            launchAnimation();
        } else {
            setTimerHtmlContent(timerValue);
        }

        strokeValue = calculateStepStrokeDashArray(strokeValue);

        setCircleStrokeDashArray(
            document.getElementById('base-timer-path-remaining'),
            `${strokeValue} ${BASE_TIMER_TOTAL_PATH_LENGTH}`
        );

        if (timerValue === 0) {
            clearInterval(timerInterval);
        }

    }, 1000)
}

function launchAnimation() {

    const pathElement = function (selectorElement, delay, animationClassName) {

        let domElement = document.querySelector(selectorElement);

        let totalPathLength = domElement.getTotalLength();

        return animate = () => {

            setTimeout(function () {
                domElement.setAttribute('stroke-dasharray', totalPathLength);
                domElement.setAttribute('stroke-dashoffset', totalPathLength);
                domElement.classList.add(animationClassName);
            }, delay);

        }

    }

    pathElement('.demo__num-path-5', 0, 'animated')();
    pathElement('.demo__num-join-5-4', 800, 'animatedBefore')();
    pathElement('.demo__num-path-4', 1000, 'animated4')();
    pathElement('.demo__num-join-3-4', 1800, 'animated4To3')();
    pathElement('.demo__num-path-3', 2000, 'animated3')();
    pathElement('.demo__num-join-2-3', 2800, 'animated3To2')();
    pathElement('.demo__num-path-2', 3000, 'animated2')();
    pathElement('.demo__num-join-1-2', 3800, 'animated2To1')();
    pathElement('.demo__num-path-1', 4000, 'animated1')();
}

/**
 * Ajuste les valeurs de l'attribut stroke-dasharray d'un element
 * @param {string} domElement 
 * @param {string} valueToAttribute 
 * 
 */
function setCircleStrokeDashArray(domElement, valueToAttribute) {
    domElement.setAttribute('stroke-dasharray', valueToAttribute);
}

function calculateStepStrokeDashArray(fullValue) {
    let test = TIME_START_IN_SECONDS - 1;
    return fullValue + (BASE_TIMER_TOTAL_PATH_LENGTH / test);
}

/**
 * Mise à jour de la valeur html du conteneur du timer
 * @param {string} timerValueFormated Temps au format MM:SS
 */
function setTimerHtmlContent(timerValueFormated) {
    document.getElementById('base-timer-label').innerHTML = `${convertTimeToDisplayValue(timerValueFormated)}`;
}

/**
 * Formate le temps en seconde pour l'affichage
 * @param {number} timeInSeconds 
 * @returns Temps au format MM:SS
 */
function convertTimeToDisplayValue(timeInSeconds) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    let minutes = Math.floor(timeInSeconds / 60);

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = timeInSeconds % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
}