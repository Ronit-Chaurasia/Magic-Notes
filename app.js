// 1.Adding Event Listener

showNotes();

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("title");

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };

  if (addTxt.value.length != 0 && addTitle.value.length!=0) {
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  if(addTitle.value.length==0){
    alert("Add a title");

  }
  if(addTxt.value.length==0){
    alert("Type a note")
  }
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// Function to show data from localStorage

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class="my-2 mx-2 noteCard card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text"> ${element.text}</p>
          <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `<b>Nothing to show here! Use "Add a Note" section to add a note.<b>`;
  }
}

// Function to Delete note.

function deleteNote(index) {
  console.log("I am Deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    console.log(cardTxt);
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
