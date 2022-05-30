console.log('MAGIC NOTE WEBSITE')
showNote();
impNoteShow();
let addbtn = document.getElementById('addbtn');
// console.log(addbtn)
addbtn.addEventListener('click', function (e) {
    let titlenote = document.getElementById('titlenote');
    let addnote = document.getElementById('addnote');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let noteObj;
    let titleObj;
    if (notes == null) {
        noteObj = [];
        titleObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }
    if (addnote.value != '' && titlenote.value != '') {
        noteObj.push(addnote.value);
        titleObj.push(titlenote.value);
        localStorage.setItem('notes', JSON.stringify(noteObj));
        localStorage.setItem('titles', JSON.stringify(titleObj));
        // console.log(noteObj);
        // console.log(titleObj);
        addnote.value = '';
        titlenote.value = '';
    }
    showNote();
})

//FUNCTION TO DISPLAY NOTES
function showNote() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let noteObj;
    let titleObj;
    if (notes == null) {
        noteObj = [];
        titleObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }
    let html = '';
    noteObj.forEach(function (element, index) {
        html += `
    <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${titleObj[index]}</h5>
          <p class="card-text">${element}</p>
          <button id="delnote${index}" onclick='delNote(this.id)' class="card-link btn btn-success">DELETE</button>
          <button id="${index}" onclick='impNote(this.id)'class="card-link btn btn-success">IMPORTANT</button>
        </div>
      </div>`
    });
    let noteelem = document.getElementById('note');
    if (noteObj.length != 0) {
        noteelem.innerHTML = html;
    }
    else {
        noteelem.innerHTML = `Your Note Will Display Here`
    }

}

//function to delete note on click
function delNote(index) {
    // console.log('we are delting this note',index);
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let alert=document.getElementById('alert');
    let noteObj;
    let titleObj;
    if (notes == null) {
        noteObj = [];
        titleObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }
    noteObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    localStorage.setItem('titles', JSON.stringify(titleObj));

        alert.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
      </svg>
      <div class="alert alert-success d-flex align-items-center alert-dismissible fade show" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
          YOUR NOTE HAS BEEN DELETED SUCCESSFULLY
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `
    showNote();
}

// important function notes 
function impNote(index) {
    console.log('we mark it as important', index);
    // let impNteObj;
    // let impTtlObj;
    let impNte = localStorage.getItem('impNte');
    let impTtl = localStorage.getItem('impTtl');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let noteObj;
    let titleObj;
    if (impNte == null) {
        impNteObj = [];
        impTtlObj = [];
    }
    else {
        impNteObj = JSON.parse(impNte);
        impTtlObj = JSON.parse(impTtl);
    }
        noteObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
        impNteObj.push(noteObj[index]);
        impTtlObj.push(titleObj[index]);
        localStorage.setItem('impNte', JSON.stringify(impNteObj))
        localStorage.setItem('impTtl', JSON.stringify(impTtlObj))
    
    impNoteShow();
}

// show important note functions
function impNoteShow() {
    // let impNteObj;
    // let impTtlObj;
    let impNte = localStorage.getItem('impNte');
    let impTtl = localStorage.getItem('impTtl');
    if (impNte == null) {
        impNteObj = [];
        impTtlObj = [];
    } else {
        impNteObj = JSON.parse(impNte);
        impTtlObj = JSON.parse(impTtl);
    }
    let html = '';
    impNteObj.forEach(function (element, index) {
        html += `
    <div class="noteCard card my-2 mx-2" style="width: 18rem;">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pin-angle-fill" viewBox="0 0 16 16" style="position: absolute; top: 10px; right: 10px;">
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                      </svg>
         <div class="card-body">
           <h5 class="card-title">${impTtlObj[index]}</h5>
           <p class="card-text">${element}</p>
           <button id="${index}" onclick='impNoteRemove(this.id)' class="card-link btn btn-success">REMOVE</button>
         </div>
       </div>`
    });
    let impnote = document.getElementById('impnote');
    if (impNteObj.length != 0) {
        impnote.innerHTML = html;
    }
    else {
        impnote.innerHTML = `Your Important Note Will Display Here`
    }
}

//REMOVE IMPORTANT NOTE
function impNoteRemove(index) {
    let impNte = localStorage.getItem('impNte');
    let impTtl = localStorage.getItem('impTtl');
    let alert=document.getElementById('alert');
        impNteObj = JSON.parse(impNte);
        impTtlObj = JSON.parse(impTtl);
    
    impNteObj.splice(index, 1);
    impTtlObj.splice(index, 1);
    localStorage.setItem('impNte', JSON.stringify(impNteObj));
    localStorage.setItem('impTtl', JSON.stringify(impTtlObj));

    alert.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </symbol>
  </svg>
  <div class="alert alert-secondary d-flex align-items-center alert-dismissible fade show" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    <div>
      YOUR NOTE HAS BEEN REMOVED SUCCESSFULLY
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
    impNoteShow();
}

//searching function
let search = document.getElementById('srch');
search.addEventListener('input', function () {
    let inVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerHTML;
        let titleTxt = element.getElementsByTagName('h5')[0].innerHTML;
        if (cardTxt.includes(inVal) || titleTxt.includes(inVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
})