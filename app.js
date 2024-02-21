const inpElement = document.getElementById('title');
const listElements = document.getElementById('list');
const btAdd = document.getElementById('create');

const notes = [
  {
    title : 'досмотреть видосик',
    completed : false
  },
  {
    title : 'дописать blame your code',
    completed : false
  }
]

function render () {
  listElements.innerHTML = ''
  for (let i = 0; i < notes.length; i++) {
    listElements.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
  }
}

render()

btAdd.onclick = function () {
  if (inpElement.value.length === 0) {
    return
	}

  const newNote = {
		title: inpElement.value,
    completed : false
	}

  notes.push(newNote)
  render()

  inpElement.value = '';
};

listElements.onclick = function(event) {
  if(event.target.dataset.index) {
    const index = Number(event.target.dataset.index)
    const type = event.target.dataset.type

    if (type == "toggle"){
      notes[index].completed = !notes[index].completed
    } else if (type == "remove"){
      notes.splice(index, 1)
    }
  }
  render()
}

function getNoteTemplate (note, index) {
        return `
                <li
                  class="list-group-item d-flex justify-content-between align-items-center">
                  <span class = "${
										note.completed ? 'text-decoration-line-through' : ''
									} ">${note.title}</span>
                  <span>
                    <span class="btn btn-small btn-${
											note.completed ? 'warning' : 'success'
										}" data-index = "${index}" data-type = "toggle">&check;</span>
                    <span class="btn btn-small btn-danger" data-index = "${index}" data-type = "remove">&times;</span>
                  </span>
                </li>
             `
}