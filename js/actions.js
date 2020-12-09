export const mouseMoveAction = (() => {
    const type = 'MOUSE_MOVE';

    return {
        type,
        create: e => ({
            type,
            mousePos: {
                x: e.clientX,
                y: e.clientY,
            },
        }),
        handle: (state, action) => ({
            ...state,
            mousePos: action.mousePos,
        }),
    };
})();

function detectFirstCollision(from, polyLine, to) {
    const minTau = 2;// invalid because [0, 1] is valid
    const combined = polyLine.map((_, idx) => [polyLine[idx - 1], polyLine[idx]])
        .slice(1);
    console.log(combined);
    throw new Error('TODO');
}

export const clickAction = (() => {
    const type = 'CLICK';

    return {
        type,
        create: e => ({
            type,
            mousePos: {
                x: e.clientX,
                y: e.clientY,
            },
        }),
        handle: (state, action) => {
            const totalNumberOfClicks = state.totalNumberOfClicks + 1;

            const isPlayerMovingToThatPosition = true;
            const selfPos = isPlayerMovingToThatPosition
                ? action.mousePos
                : state.selfPos;
            const isConquering = Array.isArray(state.conquerLine);
            if (isConquering) {
                const collision = detectFirstCollision(state.selfPos, state.conquerLine, action.mousePos);
                if (collision) {
                    return { ...state, alive: false };
                }
            }
            const conquerLine = isConquering
                ? [...state.conquerLine, selfPos]
                : [state.selfPos, selfPos];
            return { ...state, totalNumberOfClicks, selfPos, conquerLine };
        }
    }
})();
