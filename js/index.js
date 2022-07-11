document.addEventListener('DOMContentLoaded', () => {
    const LIGHT = 'light-theme';
    const DARK = 'dark-theme';
    let theme = LIGHT;

    const switcher = document.getElementById('switcher');
    const page = document.getElementById('page');
    const pageAnimationClass = 'page-animation';

    switcher.addEventListener('click', () => {
        theme = theme === LIGHT ? DARK : LIGHT;

        html2canvas(document.body).then(canvas => {
            canvas.classList.add('page-screenshot');
            document.body.appendChild(canvas);
            page.className = theme;
            page.classList.add(pageAnimationClass);
            setTimeout(() => {
                canvas.remove();
                page.classList.remove(pageAnimationClass);
            }, 500);
        });
    });
});
