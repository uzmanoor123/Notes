let notes = JSON.parse(localStorage.getItem("notes")) || [];

function handleAddNote(event) {
  event.preventDefault();
  const Title = document.getElementById("title").value;
  const Description = document.getElementById("description").value;

  let note = {
    title: Title,
    description: Description,
    date: Date.now(),
    id: notes.length + 1
  };

  notes.push(note);
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
    window.location.href = "index.html";
  showNotes();
}

function showNotes() {
  console.log("show Notes is running");
  let Container = document.getElementById("notesContainer");
  Container.innerHTML = "";
  notes.forEach((note) => {
    let noteDiv = document.createElement("div");
    noteDiv.className = "noteCard";
    noteDiv.className = "bg-[#F7F7F7] p-4  rounded";
    noteDiv.addEventListener("click", function () {
      window.location.href = `http://127.0.0.1:5500/Notes.html?id=${note.id}`;
    });
    let titleDiv = document.createElement("div");
    titleDiv.className = "titleCard";
    let descriptionDiv = document.createElement("div");
    let dateDiv = document.createElement("div");

    titleDiv.textContent = note.title;
    descriptionDiv.textContent = note.description;
    dateDiv.textContent = new Date(note.date).toLocaleString();
    noteDiv.appendChild(titleDiv);
    noteDiv.appendChild(descriptionDiv);
    noteDiv.appendChild(dateDiv);

    Container.appendChild(noteDiv);
  });
}

let params = new URLSearchParams(document.location.search);
let selectedId = params.get("id");
let currenNote = notes.find((note) => note.id == selectedId);
if (currenNote) {
  document.getElementById("title").value = currenNote.title;
  document.getElementById("description").value = currenNote.description;

  document.getElementById("addBtn").classList.add("hidden");
  document.getElementById("updateBtn").classList.remove("hidden");
  document.getElementById("deleteBtn").classList.remove("hidden");
}
function updateNote() {
  currenNote.title = document.getElementById("title").value;
  currenNote.description = document.getElementById("description").value;
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
}
function deleteNote(){
notes = notes.filter(note => note.id != selectedId)
localStorage.setItem("notes", JSON.stringify(notes))
  localStorage.setItem("notes", JSON.stringify(notes));
  window.location.href = "index.html";
}