const form = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    errorMessage.style.display = 'none';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {   
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            errorMessage.textContent = data.message || "Login Failed";
            errorMessage.style.color = 'block';
            return;
        }

        localStorage.setItem('authToken', data.token);
        window.location.href = '/login.html';
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.style.display = 'block';
    }   
});  



//const loginForm = document.getElementById('loginForm');
//const emailInput = document.getElementById('email');
//onst passwordInput = document.getElementById('password');
//const message = document.getElementById('message');


//const errorBox = document.getElementById("error-message");
//if (errorBox) {
 // errorBox.style.display = "block";
//}


//loginForm.addEventListener('submit', function(e) {
  //  e.preventDefault();

    //const email = document.getElementById('email').value.trim();
    //const password = document.getElementById('password').value;

    //const user = users.find(user => user.email === email && user.password === password);

    //if (user) {
      //  message.style.color = 'green';
        //message.textContent = 'Login successful!';
    //} else {
      //  message.style.color = 'red';
        //message.textContent = 'Invalid email or password.';
    //}
//});
