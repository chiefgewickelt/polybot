function makeDefaultReducer(actions) {
    return (state, action) => {
        const currAction = Object.values(actions).filter(a => a.type === action.type);
        if (currAction.length !== 1) {
            throw new Error(`unknown or ambiguous action ${action.type}`);
        }
        return currAction[0].handle(state, action);
    };
}

export function makeReducer(actions, makeInitialState) {
    const reducer = makeDefaultReducer(actions);

    if (!makeInitialState) {
        makeInitialState = () => ({});
    }
    const state = { current: makeInitialState() };
    const dispatch = action => {
        state.current = reducer(state.current, action);
    };
    return [state, dispatch];
}
