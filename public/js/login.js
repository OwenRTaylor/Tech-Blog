console.log('stuff');
var testUser = {
    'username': 'Ortaylo'
}


const login = async (event) => {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
    event.preventDefault();
    const response = await fetch('/api/user/login',{
        method: 'POST',
        body: JSON.stringify({email,password}),
        headers: {'Content-Type': 'application/json'}
    });
    
    if(response.ok){
        document.location.replace('/')
    } else {
        console.log('Failed to log in')
    }      
}

const signup = async (event) => {
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
      event.preventDefault();
      const response = await fetch('/api/user',{
          method: 'POST',
          body: JSON.stringify({username,email,password}),
          headers: {'Content-Type': 'application/json'}
      });
      
      if(response.ok){
          document.location.replace('/')
      } else {
          console.log('Failed to log in')
      }      
  }
document
    .querySelector('.login-form')
    .addEventListener('submit', login)


document
        .querySelector('.signup-form')
        .addEventListener('submit', signup)
