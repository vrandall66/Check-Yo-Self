var toDosArr = JSON.parse(localStorage.getItem('toDoArr')) || [];

var addNewTask = document.querySelector('.form__image--add');
var clearBtn = document.querySelector('.form__button--reset');
var newTaskSection = document.querySelector('.section__ul');
var newTask = document.querySelector('.form__label--text');
var submitBtn = document.querySelector('.form__button-submit');
var taskTitle = document.querySelector('.form__label--input');
var taskSection = document.querySelector('.section__tasks');

addNewTask.addEventListener('click', newTaskItem);
clearBtn.addEventListener('click', resetFields);
submitBtn.addEventListener('click', submitHandler);
window.addEventListener('load', onPageLoad);

function onPageLoad(e) {
	reinstantiateToDos(e);
}

function submitHandler(e) {
	transferTaskItems(e);
	clearNavUl(e);
}

function getTasksFromDom() {
	var tasks = [];
	var tasksOnDom = document.querySelectorAll('.li--task');
	tasksOnDom.forEach(function(li) {
	var task = new ToDoTask(Date.now(), li.innerText);
	tasks.push(task);
	})
	return tasks;
}

function transferTaskItems(e) {
	e.preventDefault();
	var tasks = getTasksFromDom();
	console.log(tasks);
	var toDo = new ToDo(Date.now(), taskTitle.value, tasks);
	toDo.saveToStorage(toDosArr);
	appendNewTask(toDo);
	taskTitle.value = "";
};

function newTaskItem(e) {
	e.preventDefault();
	var id = Date.now();
	newTaskSection.insertAdjacentHTML('beforeend',
		`<li class="li--task" data-id=${id}>
		<input type="image" src="images/delete.svg" class="li__delete">${newTask.value}</li>`);
	newTask.value = "";
}

function makeLiList(toDo) {
var returnString = "";
	toDo.tasks.forEach(function(task) {
	returnString += `<li class="li--task">
	<input type="image" src="images/delete.svg" class="li__delete">${task.text}</li>`;
	})
	return returnString;
}

function appendNewTask(toDo) {
	taskSection.insertAdjacentHTML('afterbegin',
		`<section class="section__tasks--status" data-id=${toDo.id}>
				<section class="section__section--title">
					<h2 class="section__section--h2">${toDo.title}</h2>
				</section>
				<section class="section__section--tasks">
					<ul class="section__ul--tasks">
					${makeLiList(toDo)}
					</ul>
				</section>
				<section class="section__section--status">
					<input type="image" src="images/urgent.svg" name="section__input--urgent" class="section__input--urgent icon--small" alt="Red lightning bolt icon">
					<label for="section__input--urgent">Urgent</label>
					<input type="image" src="images/delete.svg" name="section__input--delete" class="section__input--delete icon--small" alt="Circle with X in the center">
					<label for="section__input--delete">Delete</label>
				</section>
			</section>`)
}

function clearNavUl (e) {
	document.querySelector('.section__ul').innerHTML = "";
}



function reinstantiateToDos(e) {
	if (toDosArr !== []) {
		toDosArr.forEach(function(object) {
			object = new ToDo(object.id, object.title, object.tasks, object.urgent);
		})
		toDosArr.forEach(function(toDo) {
			appendNewTask(toDo);
		})
	}
}

function resetFields(e) {
	// if (taskTitle.value === "" &&
	// 	newTask.value === "") {
	// 	clearBtn.disabled = true;
	// }
}

// function locateIndex(event) {
// 	var taskId = findID(event);
// 	toDos.map(function() {
// 		if (taskId === toDos[i].id) {
// 			return parseInt(i);
// 		}
// 	})
// }

// function locateTaskId(event) {
// 	return parseInt(event.target.closest('.section__tasks--status').dataset.id);
// }

// function persistedTask() {
// 	toDos.map(function(task) {
// 		var taskReload = 
// 	return new ToDoList()
// 	});
// }