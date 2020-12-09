



window.onload = () => {
    const canvas = createCanvas();
    document.body.append(canvas);
    console.log('foo!');
    draw_line(33, 100, 200, 83);
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

function draw_line(x1,y1,x2,y2) {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
}
