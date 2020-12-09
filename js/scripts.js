



window.onload = () => {
    const canvas = createCanvas();
    document.body.append(canvas);
    console.log('foo!');
};

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = 'root';

    canvas.addEventListener('click', e => {
        console.log('clicked on canvas', e);
    });

    canvas.addEventListener('mousemove', e => {
        console.log('mouse moven on canvas', e);
    });

    return canvas;
}
