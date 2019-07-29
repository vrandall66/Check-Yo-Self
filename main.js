var toDosArr = JSON.parse(localStorage.getItem('toDoArr')) || [];
var toDoTasks = [];

var addNewTask = document.querySelector('.form__image--add');
var clearBtn = document.querySelector('.form__button--reset');
var nav = document.querySelector('.navigation');
var newTaskSection = document.querySelector('.section__ul');
var newTask = document.querySelector('.form__label--text');
var submitBtn = document.querySelector('.form__button-submit');
var taskTitle = document.querySelector('.form__label--input');
var taskSection = document.querySelector('.section__tasks');
var welcomeText = document.querySelector('.aside__section--container');

addNewTask.addEventListener('click', createTaskItem);
nav.addEventListener('keyup', disableBtns);
// clearBtn.addEventListener('click', disableClearBtn);
newTaskSection.addEventListener('click', removeLiFromNav)
submitBtn.addEventListener('click', submitHandler);
window.addEventListener('load', onPageLoad);

function onPageLoad(e) {
	welcomeMessage();
	reinstantiateToDos(e);
	disableBtns(e);
}

function submitHandler(e) {
	createNewToDo(e);
	clearNavUl(e);
}

function removeLiFromNav(e) {
	if (e.target.className === 'li__delete') {
		event.target.parentNode.remove();
		// e.target.parentElement is what to remove
		// parent Element has unique ID
		// use ID to delete from array
		// find element based on ID on document
		// look into removing child node on parent node from line 30
		// remove parent node
		// splice? 
		// remove ID at index of toDoTasks array
	}
}

function welcomeMessage() {
	if (toDosArr.length > 0) {
    welcomeText.classList.add('hidden');
	}
	if (toDosArr.length < 0) {
		welcomeText.classList.remove('hidden');
	}
}

function createNewToDo(e) {
	e.preventDefault();
	var toDo = new ToDo(Date.now(), taskTitle.value, toDoTasks);
	toDo.saveToStorage(toDosArr);
	appendNewTask(toDo);
	taskTitle.value = "";
	toDoTasks = [];
};

function createTaskItem(e) {
	e.preventDefault();
	var id = Date.now();
	var newToDoTask = new ToDoTask(id, newTask.value);
	newTaskSection.insertAdjacentHTML('beforeend',
		`<li class="li--task" data-id=${id}>
		<input type="image" src="images/delete.svg" class="li__delete">${newTask.value}</li>`);
	newTask.value = "";
	toDoTasks.push(newToDoTask);
}

function makeLiList(toDo) {
var returnString = "";
	toDo.tasks.forEach(function(task) {
		returnString += `<li class="li--task">
		<input type="image" src="images/checkbox.svg" class="li__delete">${task.text}</li>`;
	})
	return returnString;
}

function appendNewTask(toDo) {
	var urgent;
  if (toDo.urgent) {
    urgent = 'images/urgent-active.svg';
  } else {
    urgent = 'images/urgent.svg';
  };
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

function disableBtns(e) {
	if (taskTitle.value !== "" || newTask.value !== "") {
			clearBtn.disabled = false;
			submitBtn.disabled = false;
			clearBtn.classList.remove('disabled');
			submitBtn.classList.remove('disabled');
	} else {
			clearBtn.disabled = true;
			submitBtn.disabled = true;
			clearBtn.classList.add('disabled');
			submitBtn.classList.add('disabled');
	}
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