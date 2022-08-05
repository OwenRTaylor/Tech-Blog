
const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application.json'}
    });
    
    if(response.ok) {
        document.location.reload();
    } else {
        alert('failed to log out')
    }

}

document.querySelector('.logoutBtn')
.addEventListener('click', logout)