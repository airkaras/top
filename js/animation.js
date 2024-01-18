"use strict";

window.addEventListener('load', function() {
    const containers = document.querySelectorAll(".game > div");
    let delay = 0;

    containers.forEach((container) => {
        setTimeout(() => {
            moveIcon(container);
        }, delay);
        delay += 1500; //
    });

    function moveIcon(container) {
        let position = parseInt(getComputedStyle(container).top || '100px', 10);
        const interval = setInterval(() => {
            if (position <= 0) {
                clearInterval(interval);
            } else {
                position -= 1;
                container.style.top = position + 'px';
            }
        }, 10);
    }
});
