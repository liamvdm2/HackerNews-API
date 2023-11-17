function submitForm() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform client-side validation
    if (username && password && name && email && surname && password) {
        // Send data to server
        const registermessage = document.getElementById('registermessage');
        registermessage.textContent = `Registered successfully as ${username}`;
        registermessage.style.color = 'green';
    } else {
        const registermessage = document.getElementById('registermessage');
        registermessage.textContent = 'Please enter all values';
        registermessage.style.color = 'red';
    }
};
