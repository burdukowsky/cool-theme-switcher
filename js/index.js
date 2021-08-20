document.addEventListener('DOMContentLoaded', () => {
    const LIGHT = 'light-theme';
    const DARK = 'dark-theme';
    let theme = LIGHT;

    function cutCircle(context, x, y, radius) {
        context.globalCompositeOperation = 'destination-out';
        context.arc(x, y, radius, 0, Math.PI * 2, true);
        context.fill();
    }

    function work(canvas, x, y) {
        const context = canvas.getContext('2d');
        context.beginPath();
        let radius = 0;
        const interval = setInterval(() => {
            radius += 10;
            cutCircle(context, x, y, radius);
            if (radius > canvas.width && radius > canvas.height) {
                clearInterval(interval);
                canvas.remove();
            }
        }, 17);
    }

    const switcher = document.getElementById('switcher');

    switcher.addEventListener('click', event => {
        theme = theme === LIGHT ? DARK : LIGHT;

        html2canvas(document.body).then(canvas => {
            const canvasStyle = {
                position: 'absolute',
                left: 0,
                top: 0,
            };
            Object.assign(canvas.style, canvasStyle);
            document.body.appendChild(canvas);
            document.body.className = theme;
            work(canvas, event.clientX, event.clientY);
        });
    });
});
