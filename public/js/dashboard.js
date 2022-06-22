

function test(event) {
  const title = document.querySelector('.new-post-title').value.trim();
  const post_url = document.querySelector('.new-posturl').value.trim();
    console.log('success!');
    console.log(title + ' ' + post_url);
    const response = fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({title,post_url}),
        headers: {'Content-Type': 'application/json'}
    })

};

document.querySelector('.new-postbtn')
.addEventListener('click', test);