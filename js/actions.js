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

            return { ...state, totalNumberOfClicks, selfPos };
        }
    }
})();
