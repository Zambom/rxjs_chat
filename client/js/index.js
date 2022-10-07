const { merge, filter } = rxjs;

const username$ = of(getUsername());
const messageSend$ = merge(
    fromEvent($("#send-btn"), 'click').pipe(
        filter(e => $("#msg-input").val().trim() != ""),
        map(e => $("#msg-input").val())
    ),
    fromEvent($("#msg-input"), 'keydown').pipe(
        filter(evt => evt.key == "Enter" || evt.keyCode === 13),
        filter(evt => evt.target.value.trim() != ""),
        map(e => e.target.value)
    )
);

emitOnConnect(username$).subscribe(({ socket, data }) => {
    const username = data;

    socket.emit('introduction', username);
});

emitOnConnect(messageSend$).subscribe(({ socket, data }) => {
    $("#msg-input").val("");

    $(".msgs-container").append(oursMsg({ message: data, datetime: "" }));

    socket.emit('new message', data);
});

listenOnConnect('incoming message').subscribe(data => {
    const { username, message } = data;

    $(".msgs-container").append(theirsMsg({ username, message, datetime: "" }));
});

listenOnConnect('rooms list').subscribe(data => {
    const { rooms } = data;
    
    $(".rooms").html(rooms.map(el => roomItem(el)));
});

listenOnConnect('new user').subscribe(data => {
    $(".msgs-container").append(systemMsg({ message: `${data.data} has arrived!` }));
});