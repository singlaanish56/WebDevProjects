class Timer {
    constructor(durationInput, startBtn, pauseBtn, callbacks) {
        this.durationInput = durationInput;
        this.pauseBtn = pauseBtn;
        this.startBtn = startBtn;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
    }


    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemain);
        }
        this.tick();
        this.intervalId = setInterval(this.tick, 20);
    };
    pause = () => {
        clearInterval(this.intervalId);
    };

    tick = () => {
        if (this.timeRemain <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();

            }
        } else {
            this.timeRemain = this.timeRemain - 0.02;
            if (this.onTick) {
                this.onTick(this.timeRemain);
            }
        }
    };



    get timeRemain() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemain(time) {
        this.durationInput.value = time.toFixed(2);
    }
}