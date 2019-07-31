var toDosArr 				= JSON.parse(localStorage.getItem('toDosArr')) || [];
var addNewTask		 	= document.querySelector('.form__image--add');
var clearBtn 				= document.querySelector('.form__button--reset');
var nav 						= document.querySelector('.navigation');
var newTaskSection 	= document.querySelector('.section__ul');
var newTask 				= document.querySelector('.form__label--text');
var submitBtn 			= document.querySelector('.form__button-submit');
var taskTitle 			= document.querySelector('.form__label--input');
var taskSection 		= document.querySelector('.section__tasks');

nav.addEventListener('keyup', navKeyHandler);
nav.addEventListener('click', checkEventLocation);
taskSection.addEventListener('click', toDoTaskHandler);
window.addEventListener('load', onPageLoad);


function onPageLoad(e) {
	welcomeMessage();
	persistedToDos();
	reinstantiateToDos();
	disableClearBtn(e);
	disableSubmitBtn(e);
	checkTaskInputValue(e);
}

function navKeyHandler(e) {
	disableClearBtn(e);
	disableSubmitBtn(e);
	checkTaskInputValue(e);
}

function checkEventLocation(e) {
	if (e.target.closest('.form__image--add')) {
		checkTaskInputValue(e);
		appendTempTask(e);
		checkTaskInputValue(e);
	}
	if (e.target.closest('.form__button-submit')) {
		createNewToDo(e);
		clearToDoData(e);
		disableClearBtn(e);
		disableSubmitBtn(e);
		welcomeMessage();
	}
	if (e.target.closest('.section__ul')) {
		removeTasks(e);
	}
	if (e.target === clearBtn) {
		clearTasks(e);
		disableClearBtn(e);
	}
}

function toDoTaskHandler(e) {
	if (e.target.classList.contains('section__input--delete')) {
		deleteToDoCard(e);
	}
	if (e.target.classList.contains('section__input--urgent')) {
		urgentStatus(e);
	}
	if (e.target.classList.contains('li__delete')) {
		checkedStatus(e);
	}
}

function welcomeMessage() {
	var welcomeText = document.querySelector('.aside__section--container');
	if (toDosArr.length > 0) {
		welcomeText.classList.add('hidden');
	}
	if (toDosArr.length < 0) {
		welcomeText.classList.remove('hidden');
	}
}

function clearTasks(e) {
	newTaskSection.innerHTML = "";
}

function removeTasks(e) {
	if (e.target.className === 'li__delete') {
		event.target.parentNode.remove();
	}
}

function reassignClass(id, title, tasks, urgent, finished, i) {
	var toDo = new ToDo(id, title, tasks, urgent, finished);
	toDosArr.splice(i, 1, toDo);
};

function reassignTaskClass() {
	var tasks = Array.from(document.querySelectorAll('.li--temp-task'));
	tasks = tasks.map(function(task) {
		return new ToDoTask(task.id, task.innerText)
	});
	return tasks;
}

function createNewToDo(e) {
	var tasks = reassignTaskClass();
	var toDo = new ToDo(Date.now(), taskTitle.value, tasks);
	toDosArr.push(toDo);
	toDo.saveToStorage(toDosArr);
	appendNewToDo(toDo);
	taskTitle.value = "";
	newTask.value = "";
};

function checkTaskInputValue(e) {
	if (newTask.value === "") {
		addNewTask.disabled = true;
		addNewTask.classList.add('disabled');
	} else {
		addNewTask.disabled = false;
		addNewTask.classList.remove('disabled');
	}
}

function appendTempTask(e) {
	e.preventDefault();
	newTaskSection.insertAdjacentHTML('beforeend',
		`<li class="li--task li--temp-task" id=${Date.now()}>
		<input type="image" src="images/delete.svg" class="li__delete">${newTask.value}</li>`);
	newTask.value = "";
}

function appendTask(toDo) {
	var italic = "";
	var returnString = "";
	toDo.tasks.forEach(function(task) {
		task.checked ?  italic = "checked" : italic = "";
		returnString += `<li class="li--task ${italic}" id=${task.id}>
		<input type="image" src=${task.checkedImg()} class="li__delete">${task.text}</li>`;
	})
	return returnString;
}

function appendNewToDo(toDo) {
	var urgentSrc = toDo.urgentImg();
	var urgentClass = toDo.urgent ? "section__tasks--urgent" : "";
	var urgentFont = toDo.urgent ? "section__label--urgent" : "";
	var urgentBorder = toDo.urgent ? "section__section--borders" : "";
	taskSection.insertAdjacentHTML('afterbegin',
		`<section class="section__tasks--status ${urgentClass}" id=${toDo.id}>
			<section class="section__section--title ${urgentBorder}">
				<h2 class="section__section--h2">${toDo.title}</h2>
			</section>
			<section class="section__section--tasks ${urgentBorder}">
				<ul class="section__ul--tasks">
					${appendTask(toDo)}
				</ul>
			</section>
		<section class="section__section--status">
			<section class="section__section--left">
				<input type="image" src=${urgentSrc} name="section__input--urgent" class="section__input--urgent icon--small" alt="Red lightning bolt icon">
				<label for="section__input--urgent" class="section__section--label ${urgentFont}">URGENT</label>
			</section>
			<section class="section__section--right">
				<input type="image" src="images/delete.svg" name="section__input--delete" class="section__input--delete icon--small" alt="Circle with X in the center">
				<label for="section__input--delete" class="section__section--label">DELETE</label>
			</section>
		</section>
	</section>`)
}

function clearToDoData (e) {
	document.querySelector('.section__ul').innerHTML = "";
}

function persistedToDos(e) {
	for (var i = 0; i < toDosArr.length; i++) {
		var id = toDosArr[i].id;
		var title = toDosArr[i].title;
		var tasks = toDosArr[i].tasks;
		var urgent = toDosArr[i].urgent;
		var finished = toDosArr[i].finished;
		var index = i;
		reassignClass(id, title, tasks, urgent, finished, i);
	}
}

function reinstantiateToDos() {
	toDosArr.forEach(function(object) {
		appendNewToDo(object);
	});
};

function disableClearBtn(e) {
	if (taskTitle.value !== "" ||
		newTask.value !== "") {
			clearBtn.disabled = false;
			clearBtn.classList.remove('disabled');
	} else {
			clearBtn.disabled = true;
			clearBtn.classList.add('disabled');
	}
}

function disableSubmitBtn(e) {
	if (taskTitle.value !== "") {
		submitBtn.disabled = false;
		submitBtn.classList.remove('disabled');
	} else {
		submitBtn.disabled = true;
		submitBtn.classList.add('disabled');
	}
}

function checkedStatus(e) {
	var taskId = e.target.closest('.li--task').id;
	var task = ToDoTask.getById(taskId);
	task.updateTask({checked: !task.checked});
	e.target.src = task.checkedImg();
	e.target.closest('li').classList.toggle('checked');
}

function urgentStatus(e) {
	var card = e.target.closest('.section__tasks--status');
	var toDo = ToDo.getById(card.id);
	var text = e.target.nextSibling.nextSibling;
	var gGParent = e.target.parentNode.parentNode.parentNode;
	var gParentSibling1 = e.target.parentNode.parentNode.previousSibling.previousSibling;
	var gParentSibling2 = e.target.parentNode.parentNode.parentNode.firstChild.nextSibling;	
	toDo.updateToDo({urgent: !toDo.urgent});
	toDo.saveToStorage();
	toDo.urgent ? gGParent.classList.add('section__tasks--urgent') : gGParent.classList.remove('section__tasks--urgent');
	toDo.urgent ? gParentSibling1.classList.add('section__section--borders') : gParentSibling1.classList.remove('section__section--borders');
	toDo.urgent ? gParentSibling2.classList.add('section__section--borders') : gParentSibling2.classList.remove('section__section--borders');
	toDo.urgent ? text.classList.add('section__label--urgent') : text.classList.remove('section__label--urgent');
	e.target.src = toDo.urgentImg();
}

function deleteToDoCard(e) {
	var card = e.target.parentNode.parentNode.parentNode;
	var toDo = ToDo.getById(card.id);
	var newArr = toDo.tasks.filter(obj => obj.checked === true)
	if (newArr.length === toDo.tasks.length) {
		card.remove();
		toDo.deleteFromStorage();
	} 
}