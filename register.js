function submitForm() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const checkbox = document.getElementById('checkbox').checked;

    // Perform client-side validation
    if (name && username && email && password && checkbox) {
        // Send data to server
        const registermessage = document.getElementById('registermessage');
        registermessage.innerHTML = `Registered successfully as ${username}`;
        registermessage.style.color = 'green';
    } else {
        const registermessage = document.getElementById('registermessage');
        registermessage.innerHTML = 'Please enter all values';
        registermessage.style.color = 'blue';
    }
}

function togglePassword() {
    var passwordInput = document.getElementById('password');
    var showPasswordSpan = document.querySelector('.show-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordSpan.innerHTML = '<i class="bx bx-hide"></i>';
    } else {
        passwordInput.type = 'password';
        showPasswordSpan.innerHTML = '<i class="bx bx-show"></i>';
    }
}
