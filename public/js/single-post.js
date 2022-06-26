const post = document.querySelector('.post')
const post_id = document.location.toString().split('/')[
    document.location.toString().split('/').length - 1
]
function loadData() {
    document.querySelectorAll('.comment-delete-btn').forEach((button) => {
        button.addEventListener('click',deleteComment);
    });
    document.querySelectorAll('.comment-update-btn').forEach((button) => {
        button.addEventListener('click',updateComment);
    });
    document.querySelectorAll('.last-updated').forEach((utcDate) => {
        let newDate = utcDate.innerHTML.split('last updated:')[1].split('(')[0];
        newDate = new Date(newDate).toLocaleString('en-US');
        utcDate.innerHTML = 'Last updated: ' + newDate
    })
    document.querySelectorAll('.created-at').forEach((utcDate) => {
        console.log(utcDate)

        let newDate = utcDate.innerHTML.split('created at:')[1].split('(')[0];
        newDate = new Date(newDate).toLocaleString('en-US');
        utcDate.innerHTML = 'Created: ' + newDate +'    '
    })
}

async function newComment(event) {
    event.preventDefault();
    const comment_text = document.querySelector('.new-comment-text').value.trim();
      console.log('success!');
      console.log(comment_text);
    if(comment_text){
      const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({comment_text}),
          headers: {'Content-Type': 'application/json'}
      })
    if (response.ok){
        document.location.reload();
    }else{
        alert(response.statusText)
    }
    
    }
  
  };
async function deletePost(event) {
    event.preventDefault();
    console.log(this.value)

        const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok){
        document.location.reload();
    }else{
        alert(response.statusText)
    }


}
async function deleteComment(event) {
    event.preventDefault();

        const response = await fetch(`/api/comments/${this.value}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok){
        document.location.reload();
    }else{
        alert(response.statusText)
    }
}

async function updatePost(event){
    event.preventDefault();

  let title = document.querySelector('.post-updated-title').value.trim();
  let post_text = document.querySelector('.post-updated-text').value.trim();
if(title && post_text){
  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body:JSON.stringify({title,post_text}),
    headers: {'Content-Type': 'application/json'}
})
document.location.reload();


if (response.ok){
    document.location.reload();
}else{
    alert(response.statusText)
}
}
};

async function updateComment(event){
    event.preventDefault();
  let comment_text = document.querySelector('.comment-updated-text').value.trim();
if(comment_text){
  const response = await fetch(`/api/comments/${this.value}`, {
    method: 'PUT',
    body:JSON.stringify({comment_text}),
    headers: {'Content-Type': 'application/json'}
})
if (response.ok){
    document.location.reload();
}else{
    alert(response.statusText)
}

}
}
try{
document.querySelector('.new-commentbtn')
  .addEventListener('click', newComment);
  document.querySelector('.post-delete-btn')
  .addEventListener('click',deletePost);
  

document.querySelector('.post-update-btn')
.addEventListener('click',updatePost);
}
catch{
    console.log('log in')
}



loadData();

