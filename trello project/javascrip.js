const form = document.getElementById('login-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const phoneError = document.getElementById('phone-error');

form.addEventListener('btn primary', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const phone = phoneInput.value.trim();

  let isValid = true;

  if (name === '') {
    nameError.textContent = 'Name is required';
    nameInput.style.border = '1px solid red';
    isValid = false;
  } else {
    nameError.textContent = '';
    nameInput.style.border = '';
  }

  if (email === '') {
    emailError.textContent = 'Email is required';
    emailInput.style.border = '1px solid red';
    isValid = false;
  } else if (!validateEmail(email)) {
    emailError.textContent = 'Invalid email format';
    emailInput.style.border = '1px solid red';
    isValid = false;
  } else {
    emailError.textContent = '';
    emailInput.style.border = '';
  }

  if (password === '') {
    passwordError.textContent = 'Password is required';
    passwordInput.style.border = '1px solid red';
    isValid = false;
  } else if (password.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters long';
    passwordInput.style.border = '1px solid red';
    isValid = false;
  } else {
    passwordError.textContent = '';
    passwordInput.style.border = '';
  }

  if (phone === '') {
    phoneError.textContent = 'Phone number is required';
    phoneInput.style.border = '1px solid red';
    isValid = false;
  } else if (!validatePhone(phone)) {
    phoneError.textContent = 'Invalid phone number format';
    phoneInput.style.border = '1px solid red';
    isValid = false;
  } else {
    phoneError.textContent = '';
    phoneInput.style.border = '';
  }

  if (isValid) {
    // Submit the form or call a registration function
    console.log('Login form is valid');
    location.href = 'index.html';
  }
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$|^\d{10}$/;
  return phoneRegex.test(phone);
}