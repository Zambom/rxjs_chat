const { of, fromEvent } = rxjs;
const { map, switchMap } = rxjs.operators;

const socket$ = of(io("http://localhost:3000"));

const connect$ = socket$.pipe(
    switchMap(socket => fromEvent(socket, 'connect').pipe(
        map(() => socket)
    ))
);

const listenOnConnect = (event) => {
    return connect$.pipe(
        switchMap(socket => fromEvent(socket, event))
    );
}

const emitOnConnect = (observable$) => {
    return connect$.pipe(
        switchMap(socket => observable$.pipe(
            map(data => ({ socket, data }))
        ))
    );
}