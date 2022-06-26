
function loadData(){
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
async function test() {

  const title = document.querySelector('.new-post-title').value.trim();
  const post_text = document.querySelector('.new-post-text').value.trim();
    if(title && post_text){
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({title,post_text}),
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok){
        document.location.replace('/')
    } else{
        alert(response.statusText)
    };
}
};

document.querySelector('.new-postbtn')
.addEventListener('click', test);


loadData();