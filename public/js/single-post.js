
function test() {
    document.querySelectorAll('.comment-delete-btn').forEach( (button) => {
        button.addEventListener('click',deleteComment);
    }

    )
}

function newComment(event) {
    event.preventDefault();
    const comment_text = document.querySelector('.new-comment_text').value.trim();
      console.log('success!');
      console.log(comment_text);
      const response = fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({comment_text}),
          headers: {'Content-Type': 'application/json'}
      })
  
  };
function deletePost(event) {
    event.preventDefault();
    const response = fetch(`/api/posts/${this.value}`, {
        method: 'Delete',
        headers: {'Content-Type': 'application/json'}
    })
}
function deleteComment(event) {
    event.preventDefault();
    const response = fetch(`/api/comments/${this.value}`, {
        method: 'Delete',
        headers: {'Content-Type': 'application/json'}
    })
    
}

function updatePost(event){
    event.preventDefault();
  let title = document.querySelector('.post-updated-title').innerHTML;
  let text = document.querySelector('.post-updated-text').innerHTML;

  const response = fetch(`/api/posts/${this.value}`, {
    method: 'PUT',
    body:JSON.stringify({title,text}),
    headers: {'Content-Type': 'application/json'}
})
}
document.querySelector('.new-commentbtn')
  .addEventListener('click', newComment);


  document.querySelector('.post-delete-btn')
.addEventListener('click',deletePost);

document.querySelector('.post-update-btn')
.addEventListener('click',updatePost);
console.log(document.querySelector('.post-update-btn'))

test();

