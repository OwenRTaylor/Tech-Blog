const login = async (event) => {
  event.preventDefault();
  const email = document.querySelector('.login-email').value.trim();
  const password = document.querySelector('.login-password').value.trim();
console.info(email,password)
  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if (response.ok) {
    //   document.location.replace('/');
    // } else {
    //   alert('Failed to log in.');
    // }
  }; 
}

const signup = async (event) =>{
  event.preventDefault();
  const username = document.querySelector('.signup-username').value.trim();
  const email = document.querySelector('.signup-email').value.trim();
  const password = document.querySelector('.signup-password').value.trim();
console.info(username,email,password)
  if (username && email && password) {
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ 
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    // if (response.ok) {
    //   // document.location.replace('/');
    // } else {
    //   alert('Failed to sign up.');
    // }
}
};
document
.querySelector('.login-form')
.addEventListener('submit',  login)
console.log('stuff');

document
  .querySelector('.signup-form')
  .addEventListener('submit', signup);
