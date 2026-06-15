
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function handleAddNote(event) {
  event.preventDefault();
  const Title = document.getElementById("title").value;
  const Description = document.getElementById("description").value;

  let note = {
    title: Title,
    description: Description,
    createdAt: Date.now(),
    updatedAt:Date.now(),
    id: crypto.randomUUID()
  };
  notes.push(note);
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
}

function showNotes() {
  console.log("show Notes is running");
  let Container = document.getElementById("notesContainer");
  Container.innerHTML = "";
  notes.forEach((note) => {
    let noteDiv = document.createElement("div");
    noteDiv.className = "bg-[#F7F7F7] p-4  rounded noteCard";
    noteDiv.id = note.id;
    noteDiv.addEventListener("click", function () {
      window.location.href = `http://127.0.0.1:5500/Notes.html?id=${note.id}`;
    });
    let titleDiv = document.createElement("div");
    titleDiv.className = "titleCard";
    let descriptionDiv = document.createElement("div");
    descriptionDiv.className = "descriptionCard";
    let dateDiv = document.createElement("div");

    titleDiv.textContent = note.title;
    descriptionDiv.textContent = note.description;
    dateDiv.textContent = new Date(note.createdAt).toLocaleString();
    noteDiv.appendChild(titleDiv);
    noteDiv.appendChild(descriptionDiv);
    noteDiv.appendChild(dateDiv);

    Container.appendChild(noteDiv);
  });
}

let params = new URLSearchParams(document.location.search);
let selectedId = params.get("id");
let currentNote = notes.find((note) => note.id == selectedId);
if (currentNote) {
  document.getElementById("title").value = currentNote.title;
  document.getElementById("description").value = currentNote.description;

  document.getElementById("addBtn").classList.add("hidden");
  document.getElementById("updateBtn").classList.remove("hidden");
  document.getElementById("deleteBtn").classList.remove("hidden");
}
function updateNote() {
  currentNote.title = document.getElementById("title").value;
  currentNote.description = document.getElementById("description").value;
  currentNote.updatedAt = Date.now();
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
}
function deleteNote() {
  console.log(selectedId);
  notes = notes.filter((note) => note.id != selectedId);
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
}
function search(){
  let value = document.getElementById("inputSearch").value.toLowerCase();
  let cards = document.getElementsByClassName("noteCard");
  for(let i= 0; i<cards.length; i++){
    let title = cards[i].querySelector(".titleCard").innerText.toLowerCase();
    let description = cards[i].querySelector(".descriptionCard").innerText.toLowerCase();
    if(title.includes(value)|| (description.includes(value))){
      cards[i].style.display="block"
    }
    else{
      cards[i].style.display= "none"
    }
  } 
}
function sortNotes(){
  let value = document.getElementById("sorting").value;
if (value == "alphabets"){
  notes.sort((a,b)=>
    a.title.localeCompare(b.title)
)
}
else if (value == "edited"){
  notes.sort((a,b)=>
    b.updatedAt - a.updatedAt
  )
}
else if (value == "created"){
  notes.sort((a,b)=>
    b.createdAt - a.createdAt
  )
}
showNotes()
}