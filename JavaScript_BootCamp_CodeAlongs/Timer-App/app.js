const durationInput = document.querySelector("#duration");
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let duration;

const timer = new Timer(durationInput, startBtn, pauseBtn, {
    onStart(totalDuration) {
        duration = totalDuration;
        //console.log("Timer started");
    },
    onTick(timeRemain) {
        circle.setAttribute('stroke-dashoffset', (perimeter * timeRemain) / duration - perimeter)

    },
    onComplete() {
        //this.duration.value = 30;
        //circle.set
    }
});