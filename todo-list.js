class ToDo {
	constructor(id, title, tasks, urgent, finished) {
		this.id 		= id;
		this.title 	= title;
		this.tasks 	= (tasks || []).map(function(task) {
	  	return new ToDoTask(task.id, task.text, task.checked)
	  });
		this.urgent = urgent || false;
		this.finished = finished || false;
	}

	static getById(id) {
		return toDosArr.find(function(toDo) {
			return toDo.id === parseInt(id);
		})
	}

	saveToStorage() {
		localStorage.setItem('toDosArr', JSON.stringify(toDosArr));
	}

	deleteFromStorage() {
		var id = this.id;
		var index = toDosArr.findIndex(function(toDo) {
			return parseInt(toDo.id) === parseInt(id);
		})
		toDosArr.splice(index, 1);
		this.saveToStorage();
	};

	updateToDo(obj) {
		Object.assign(this, obj)
		this.saveToStorage();
	}

	urgentImg() {
		return this.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
	}
}

class ToDoTask {
	constructor(id, text, checked) {
		this.id 			= id;
		this.text 		= text;
		this.checked 	= checked || false;
	}

	static getById(id) {
		var task;
		toDosArr.forEach(function(toDo) {
			toDo.tasks.forEach(function(t) {
				if (parseInt(t.id) === parseInt(id)){
					task = t;
					return;
				};
			})
		})
		return task;
	}

	saveToStorage() {
		localStorage.setItem('toDosArr', JSON.stringify(toDosArr));
	}

	updateTask(obj) {
		Object.assign(this, obj)
		this.saveToStorage();
	}

	checkedImg() {
		return this.checked ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
	}
}