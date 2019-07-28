class ToDoList {
	constructor(id, title, tasks) {
		this.id = id;
		this.title = title;
		this.tasks = tasks || [];
		this.urgent = false;
	}
	saveToStorage(array) {
		array.push(this);
		localStorage.setItem('taskArr', JSON.stringify(array));
	}

	// deleteFromStorage() {

	// }
	// updateToDo() {

	// }
	// updateTask() {

	// }
}