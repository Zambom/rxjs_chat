const theirsMsg = ({ username, message, datetime }) => `
    <div class="d-flex msg-item theirs-msgs">
        <div class="alert alert-secondary">
            <h6 class="username fw-bold">${username}</h6>
            <p class="textmsg">${message}</p>
            <p class="datetime text-end">${datetime}</p>
        </div>
    </div>
`;

const oursMsg = ({ message, datetime }) => `
    <div class="d-flex msg-item ours-msgs justify-content-end">
        <div class="alert alert-info ours-msg">
            <p class="textmsg">${message}</p>
            <p class="datetime text-end">${datetime}</p>
        </div>
    </div>
`;

const systemMsg = ({ message }) => `
    <div class="d-flex msg-item system-msgs justify-content-center">
        <div class="alert alert-warning rounded-pill">
            ${message}
        </div>
    </div>
`;

const roomItem = ({ name, participants }) => `
    <li id="${name.toLowerCase()}" class="list-group-item d-flex justify-content-between align-items-start">
        <div class="room-item d-flex">
            <div class="ms-2 me-auto">
                <div class="fw-bold room-name">${name}</div>
                <small class="room-participants">${participants} participantes</small>
            </div>
        </div>
        <span class="badge bg-primary rounded-pill align-self-center">10</span>
    </li>
`