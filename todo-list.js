class ToDo {
	constructor(id, title, tasks, urgent) {
		this.id = id;
		this.title = title;
		this.tasks = tasks || [];
		this.urgent = urgent || false;
	}
	saveToStorage(array) {
		array.push(this);
		localStorage.setItem('toDoArr', JSON.stringify(array));
	}

	// deleteFromStorage() {

	// }
	// updateToDo() {

	// }
	// updateTask() {

	// }
}

class ToDoTask {
	constructor(id, text) {
		this.id = id;
		this.text = text;
		this.checked = false;
	}
}