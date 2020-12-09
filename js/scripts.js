const ACTIONS = {
    MOUSE_MOVE: 'MOUSE_MOVE',
    CLICK: 'CLICK',
};

function createMouseMoveAction(e) {
    return {
        type: ACTIONS.MOUSE_MOVE,
        mousePos: {
            x: e.clientX,
            y: e.clientY,
        },
    };
}

function createMouseClickAction(e) {
    return {
        type: ACTIONS.CLICK,
    };
}

function stateReducer(state, action) {
    switch (action.type) {
        case ACTIONS.MOUSE_MOVE:
            return { ...state, mousePos: action.mousePos };
        case ACTIONS.CLICK:
            const totalNumberOfClicks = state.totalNumberOfClicks + 1;
            return { ...state, totalNumberOfClicks };
        default:
            throw new Error(`unknown action ${action.type}`);
    }
}

function makeState(reducer, makeInitialState) {
    if (!makeInitialState) {
        makeInitialState = () => ({});
    }
    const state = { current: makeInitialState() };
    const dispatch = action => {
        state.current = reducer(state.current, action);
    };
    return [state, dispatch];
}

const [state, dispatch] = makeState(stateReducer, () => ({
    name: 'Player',
    totalNumberOfClicks: 0,
    gameStartedAt: Date.now(),
}));

window.onload = () => {
    console.log(state);
    const canvas = createCanvas();
    document.body.append(canvas);
    console.log('foo!');
    draw_line(33, 100, 200, 83);
};

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = 'root';

    canvas.addEventListener('click', e => {
        dispatch(createMouseClickAction(e));
        console.log('clickCount', state.current.totalNumberOfClicks);
        console.log('when?', state.current.gameStartedAt);
        const elapsedMinutes = (Date.now() - state.current.gameStartedAt) / (1000 * 60);
        const apm = state.current.totalNumberOfClicks / elapsedMinutes;
        console.log('APM', apm);
    });

    canvas.addEventListener('mousemove', e => {
        dispatch(createMouseMoveAction(e));
    });

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
