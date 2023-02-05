
var titleInput = document.getElementById('title');
var descInput = document.getElementById('disc');
var searchInput = document.getElementById('search')
var deleteBtn = document.getElementById('deleteBtn');
var updateBtn = document.getElementById('updateBtn');
notesContainer = [];
if ( localStorage.getItem("notes") != null){
    notesContainer =JSON.parse( localStorage.getItem("notes")) 
    displaynotes(notesContainer) 
}

function addnotes(){ //add notes

    if(validateProductNumber() == true){
note = {
        title:titleInput.value ,
        desc :descInput.value
    }
    notesContainer.push(note)
    localStorage.setItem("notes", JSON.stringify(notesContainer) )
    displaynotes(notesContainer);
    clearForm();
    }else{
        alert ('title name is invalid ')
    }
    
}

function displaynotes(){ //display
    var cartona ="";
    for(i=0;i<notesContainer.length;i++){
        cartona+=`
        <div class="col-md-3">
    <div class="item text-center bg-info-subtle shadow-sm p-2 border border-1 border-primary rounded-2">
        <i class="fas fa-diagnoses fa-4x text-success" ></i>
            <h1 class="text-main">${notesContainer[i].title}</h1>
            <p class="text-muted ">${notesContainer[i].desc}</p>
            <button class="btn btn-sm btn-outline-danger px-3 " onclick="deleteNotes(${i})" >delete    </button>
            <button class="btn btn-sm btn-outline-warning px-3 " onclick="updatenotes(${i})" data-bs-target="#offcanvasExample" data-bs-toggle="offcanvas">Update</button>

        <i class="fas fa-check text-white m-1 fa-2x" ></i>
    </div>
</div>
        `
    }
    document.getElementById('notes').innerHTML = cartona;
    
}

function clearForm(){  //clear
    titleInput.value ="",
    descInput.value = ""
}

function deleteNotes(notesIndex){ //delete
    notesContainer.splice(notesIndex,1)
    localStorage.setItem("notes", JSON.stringify(notesContainer) )
    displaynotes();
}

function searchnotes(term){
    var box ='';
   for(i=0;i<notesContainer.length;i++){
    if( notesContainer[i].title.toLowerCase().includes(term.toLowerCase()) ==true ){
        box += `
        <div class="col-md-3">
        <div class="item text-center bg-info-subtle shadow-sm p-2 border border-1 border-primary rounded-2">
            <i class="fas fa-diagnoses fa-4x text-success" ></i>
                <h1 class="text-main">${notesContainer[i].title.replace(term, '<span> '+term+'</span>'  )}</h1>
                <p class="text-muted ">${notesContainer[i].desc}</p>
                <button class="btn btn-sm btn-outline-danger px-3 " onclick="deleteNotes(${i})" >delete    </button>
               
                <button class="btn btn-sm btn-outline-warning px-3 " onclick="updatenotes(${i})" >update</button>
               
            <i class="fas fa-check text-white m-1 fa-2x" ></i>
        </div>
    </div>
        `
    }
   }
    document.getElementById('notes').innerHTML = box;
}

function updatenotes(i){
    deleteBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none','d-block');
    titleInput.value = notesContainer[i].title
    descInput.value =notesContainer[i].desc
     box3=``;
    for(i=0;i<notesContainer.length;i++){
        box3+=`
        <div class="col-md-3">
    <div class="item text-center bg-info-subtle shadow-sm p-2 border border-1 border-primary rounded-2">
        <i class="fas fa-diagnoses fa-4x text-success" ></i>
            <h1 class="text-main">${notesContainer[i].title}</h1>
            <p class="text-muted ">${notesContainer[i].desc}</p>
            <button class="btn btn-sm btn-outline-danger px-3 " onclick="deleteNotes(${i})" >delete    </button>
            <button class="btn btn-sm btn-outline-warning px-3 " onclick="updatenotes(${i})" data-bs-target="#offcanvasExample" data-bs-toggle="offcanvas">Update</button>

        <i class="fas fa-check text-white m-1 fa-2x" ></i>
    </div>
</div>
        `
    }
    document.getElementById('notes').innerHTML = box3;
}

function validateProductNumber(){
    var regex = /^[A-Z][a-z]{3,8}$/
    return regex.test(titleInput.value)
}