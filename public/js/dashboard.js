

function test(event) {
    event.pre
  const title = document.querySelector('.new-post-title').value.trim();
  const post_text = document.querySelector('.new-post-text').value.trim();
    console.log('success!');
    console.log(title + ' ' + post_text);
    const response = fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({title,post_text}),
        headers: {'Content-Type': 'application/json'}
    })

};

document.querySelector('.new-postbtn')
.addEventListener('click', test);