import { mouseMoveAction, clickAction } from './actions.js';

import * as actions from './actions.js';
import { makeReducer } from './makeReducer.js';

const [state, dispatch] = makeReducer(actions, () => ({
    name: 'Player',
    totalNumberOfClicks: 0,
    gameStartedAt: Date.now(),
    selfPos: {
        x: 100 * Math.random(),
        y: 100 * Math.random(),
    },
}));

window.onload = () => {
    console.log(actions);
    const canvas = createCanvas();
    document.body.append(canvas);
    draw_line(33, 100, 200, 83);
    redraw();
};

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = 'root';

    canvas.addEventListener('click', e => {
        dispatch(clickAction.create(e));
        redraw();
        const elapsedMinutes = (Date.now() - state.current.gameStartedAt) / (1000 * 60);
        const apm = state.current.totalNumberOfClicks / elapsedMinutes;
        console.log('APM', apm);
        console.log('POS', state.current.selfPos);
    });

    canvas.addEventListener('mousemove', e => {
        dispatch(mouseMoveAction.create(e));
    });

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return canvas;
}

function draw_line(x1, y1, x2, y2) {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

function draw_player({ x, y }) {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    ctx.fillRect(x - 7, y - 7, 14, 14);
}

function redraw() {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height)
    draw_player(state.current.selfPos);
}
