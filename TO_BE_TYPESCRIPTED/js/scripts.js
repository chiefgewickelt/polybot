import { mouseMoveAction, clickAction } from './actions.js';

import * as actions from './actions.js';
import { makeReducer } from './makeReducer.js';

const [state, dispatch] = makeReducer(actions, () => {
    const selfPos = {
        x: 250 * Math.random(),
        y: 250 * Math.random(),
    };
    return {
	name: 'Player',
	totalNumberOfClicks: 0,
	gameStartedAt: Date.now(),
	selfPos,
	conquerLine: null,
	home: nGonAround(13, 71, selfPos),
	collisions: [],
	isAlive: true,
    };
});

window.onload = () => {
    console.log(actions);
    const canvas = createCanvas();
    document.body.append(canvas);
    redraw();
};

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = 'root';

    canvas.addEventListener('click', e => {
        dispatch(clickAction.create(e));
        console.log(state.current.conquerLine);
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

function draw_poly_line(ctx, points) {
    console.log(points);
    if (!Array.isArray(points) || points.length === 0) {
        throw new Error('zero points given');
    }
    const tail = [...points];
    const head = tail.shift();
    // ctx.beginPath();
    ctx.moveTo(head.x, head.y);
    tail.forEach(({ x, y }) => ctx.lineTo(x, y));
    // ctx.closePath();
    ctx.stroke();
}

function draw_player({ x, y }) {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    ctx.fillRect(x - 7, y - 7, 14, 14);
}

function draw_collisions(collisions) {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    const radius = 10;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    collisions.forEach(({ collision: { collisionPoint: { x, y } } }) => {
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
    });
    ctx.fill();
}

function draw_polygon( points, fillcolor = '#11cc00') {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    
    ctx.fillStyle = fillcolor;
    ctx.beginPath();
    points.forEach((point) => {
	ctx.lineTo(point[0],point[1]);
    });
    ctx.closePath();
    ctx.fill();
}

function redraw() {
    const c = document.getElementById('root');
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    draw_polygon(state.current.home);
    draw_collisions(state.current.collisions);
    draw_player(state.current.selfPos);
    const { conquerLine } = state.current;
    if (Array.isArray(conquerLine)) {
        draw_poly_line(ctx, conquerLine);
    }
    
}

function nGonAround (n, distCenterCorner, center) {
    if(n < 3) {
	throw new Error('area needs at least 3 corners');
    }
    const dPhi = 2*Math.PI / n;
    return [...Array(n).keys()]
	.map((i) => [center.x +  distCenterCorner * Math.cos(i * dPhi), center.y + distCenterCorner * Math.sin(i* dPhi)]);
}
