class ToDo {
	constructor(id, title, tasks, urgent) {
		this.id 		= id;
		this.title 	= title;
		this.tasks 	= tasks || [];
		this.urgent = urgent || false;
	}
	saveToStorage(array) {
		localStorage.setItem('toDosArr', JSON.stringify(array));
	}

	deleteFromStorage(toDoIndex) {
    	toDosArr.splice(toDoIndex, 1);
    	this.saveToStorage(toDosArr);
  	};

	// updateToDo() {

	// }
	// updateTask() {

	// }
	// deleteTask() {

	// }
}

class ToDoTask {
	constructor(id, text, checked) {
		this.id 			= id;
		this.text 		= text;
		this.checked 	= checked || false;
	}
}