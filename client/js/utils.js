const getUsername = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const username = `Operator ${randomNumber}`;

    sessionStorage.setItem('username', username);

    return username;
}