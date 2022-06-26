
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

loadData();