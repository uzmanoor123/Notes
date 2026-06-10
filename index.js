let notes = JSON.parse(localStorage.getItem("notes")) || [];
function handleAddNote() {
  const Title = document.getElementById("title").value;
  const Description = document.getElementById("description").value;
  
  let note = {
    title: Title,
    description: Description,
    date: new Date()
  };

  notes.push(note);
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  
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
    let titleDiv = document.createElement("div");
    titleDiv.className = "titleCard";
    let descriptionDiv = document.createElement("div");
    let dateDiv = document.createElement("div");
    
    titleDiv.textContent = note.title;
    descriptionDiv.textContent = note.description;
    dateDiv.textContent = note.date;
    noteDiv.appendChild(titleDiv);
    noteDiv.appendChild(descriptionDiv);
    noteDiv.appendChild(dateDiv);
    Container.appendChild(noteDiv);
  });
}
showNotes();

