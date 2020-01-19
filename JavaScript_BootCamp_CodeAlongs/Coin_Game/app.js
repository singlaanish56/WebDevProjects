function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
    );
}


const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');
window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowDown') {
        const currentTop = extractvalue(avatar.style.top);
        avatar.style.top = `${currentTop+50}px`;
    } else if (e.key === 'ArrowUp') {
        const currentTop = extractvalue(avatar.style.top);
        avatar.style.top = `${currentTop-50}px`;
    } else if (e.key === 'ArrowRight') {
        const currentleft = extractvalue(avatar.style.left);
        avatar.style.left = `${currentleft+50}px`;
        avatar.style.transform = 'scale(1,1)'
    } else if (e.key === 'ArrowLeft') {
        const currentleft = extractvalue(avatar.style.left);
        avatar.style.left = `${currentleft-50}px`;
        avatar.style.transform = 'scale(-1,1)'
    }

    if (isTouching(avatar, coin)) movecoin();
});

const extractvalue = (pos) => {
    //because intially the top value is empty string irrespective of what is defined in the css file
    if (!pos) return 100;
    return parseInt(pos.slice(0, -2))
};

const movecoin = () => {
    const y = Math.floor(Math.random() * window.innerHeight);
    const x = Math.floor(Math.random() * window.innerWidth);
    coin.style.top = `${y}px`;
    coin.style.left = `${x}px`;
}

movecoin();