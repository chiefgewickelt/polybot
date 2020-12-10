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

const dotProduct = (v1, v2) => {
    return (v1.map((e, idx) => [e, v2[idx]])).reduce((acc, p) => acc + p.reduce((acc, x) => acc * x, 1), 0);
};

function detectFirstCollisionWithPolyline(from, polyline, to) {
    const edges = polyline
        .map((_, pointIdx) => pointIdx)
        .slice(1)// first point cannot be used as `nextPoint`
        .map(nextPointIdx => ({
            edgeIdx: nextPointIdx - 1,
            prevPoint: polyline[nextPointIdx - 1],
            nextPoint: polyline[nextPointIdx],
        }));
    const realCollisions = edges
        .map(edge => detectCollisionWithEdge(from, edge, to))
        .filter(({ isReal }) => isReal);
    if (realCollisions.length === 0) {
        return null;
    }
    const minimizeTau = (curr, next) => (next.tau < curr.tau) ? next : curr;
    const initialCollision = realCollisions.shift();
    return realCollisions.reduce(minimizeTau, initialCollision);
}

const calcDirectionVector = (from, to) => ({
    dx: to.x - from.x,
    dy: to.y - from.y,
});

function detectCollisionWithEdge(from, edge, to) {
    const { prevPoint, nextPoint } = edge;

    const walkDirection = calcDirectionVector(from, to);
    const edgeDirection = calcDirectionVector(prevPoint, nextPoint);
    // from + tau * walkDirection = prevPoint + mu * edgeDirection
    const den = (
        edgeDirection.dy * walkDirection.dx
        - edgeDirection.dx * walkDirection.dy);
    if (den === 0) {
        throw new Error("TODO: handle parallel and degenerate cases");
    }

    // tau * (edgeNormal, walkDirection) = (edgeNormal, prevPoint - from)
    const tauNum = (
        edgeDirection.dy * (prevPoint.x - from.x)
        - edgeDirection.dx * (prevPoint.y - from.y));
    const tau = tauNum / den;
    const collisionPoint = {
        x: from.x + tau * walkDirection.dx,
        y: from.y + tau * walkDirection.dy,
    };

    // mu * (edgeNormal, walkDirection) = (walkNormal, prevPoint - from)
    const muNum = (
        walkDirection.dy * (prevPoint.x - from.x)
        - walkDirection.dx * (prevPoint.y - from.y));
    const mu = muNum / den;

    return {
        edge,
        tau,
        mu,
        isReal: tau >= 0 && tau <= 1 && mu >= 0 && mu <= 1,
        collisionPoint,
    };
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

            if (!state.isAlive) {
                return { ...state, totalNumberOfClicks };
            }

            const isPlayerMovingToThatPosition = true;
            const selfPos = isPlayerMovingToThatPosition
                ? action.mousePos
                : state.selfPos;
            const isConquering = Array.isArray(state.conquerLine);
            const conquerLine = isConquering
                ? [...state.conquerLine, selfPos]
                : [state.selfPos, selfPos];

            const collision = detectFirstCollisionWithPolyline(
                state.selfPos,
                conquerLine.slice(0, conquerLine.length - 2),
                action.mousePos);
            if (collision) {
                return {
                    ...state,
                    totalNumberOfClicks,
                    selfPos,
                    conquerLine,
                    isAlive: false,
                    collisions: [...state.collisions, { collision, totalNumberOfClicks }],
                };
            }
	    //no collision with conquerLine here,
	    const  homeEdges =
		  [...(state.home.map((_,indx) => indx).slice(1)
		       .map((endIndx) => ({
			   prevPoint: ({
			       x: state.home[endIndx - 1 ][0],
			       y: state.home[endIndx - 1][1],
			   }),
		       	   nextPoint: ({
			       x: state.home[endIndx][0],
			       y: state.home[endIndx][1],
			   })
		       }))),
		  ({//edge connecting last and first point:
		      prevPoint: ({
			  x: state.home[state.home.length - 1][0],
			  y: state.home[state.home.length - 1][1]
		      }),
		      nextPoint: ({
			  x:state.home[0][0],
			  y: state.home[0][1]
		      })
		  })];
	    const realCollisionsWithHomeEdges = homeEdges
		  .map( (homeEdge) => detectCollisionWithEdge( state.selfPos, homeEdge, action.mousePos ))
		  .filter( ({isReal}) => isReal);
	    console.log('homeCollisions:');
	    console.log(realCollisionsWithHomeEdges);
            return {
                ...state,
                totalNumberOfClicks,
                selfPos,
                conquerLine,
            };
        }
    }
})();
