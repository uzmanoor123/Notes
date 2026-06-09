let notes = JSON.parse(localStorage.getItem("notes")) || [];
function handleAddNote() {
  const Title = document.getElementById("title").value;
  const Description = document.getElementById("description").value;

  let note = {
    title: Title,
    description: Description,
  };
  notes.push(note);
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
}
