document.addEventListener('DOMContentLoaded', () => {
    const LIGHT = 'light-theme';
    const DARK = 'dark-theme';
    let theme = LIGHT;

    const switcher = document.getElementById('switcher');
    const page = document.getElementById('page');
    const pageAnimationClass = 'page-animation';

    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    const cssRuleIndex = 0;

    function getKeyframesCss(x, y, radius) {
        return `@keyframes page-animation {
            0% { clip-path: circle(0% at ${x}px ${y}px); }
            100% { clip-path: circle(${radius}px at ${x}px ${y}px); }
        }`;
    }

    switcher.addEventListener('click', ({clientX, clientY}) => {
        theme = theme === LIGHT ? DARK : LIGHT;
        const {offsetWidth: pageWidth, offsetHeight: pageHeight} = page;
        const farthestX = (pageWidth / 2) > clientX ? pageWidth : 0;
        const farthestY = (pageHeight / 2) > clientY ? pageHeight : 0;
        const distance = ((farthestX - clientX) ** 2 + (farthestY - clientY) ** 2) ** .5;
        styleElement.sheet.insertRule(getKeyframesCss(clientX, clientY, distance), cssRuleIndex);

        html2canvas(document.body).then(canvas => {
            canvas.classList.add('page-screenshot');
            document.body.appendChild(canvas);

            page.className = theme;
            page.classList.add(pageAnimationClass);

            setTimeout(() => {
                canvas.remove();
                page.classList.remove(pageAnimationClass);
                styleElement.sheet.deleteRule(cssRuleIndex);
            }, 500);
        });
    });
});
