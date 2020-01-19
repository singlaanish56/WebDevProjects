//timeoutId varibale is first assigned to the setTimeout callback after a set delay
//if the variable already has a value no other api calls are made
//and the variable iis cleared of its value
const debounce = (callback, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearInterval(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, args); //automatically any no of args
        }, delay);
    };
};