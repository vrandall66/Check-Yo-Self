const toDosArr = JSON.parse(localStorage.getItem('toDosArr')) || [];
const addNewTask = document.querySelector('.form__image--add');
const clearBtn = document.querySelector('.form__button--reset');
const nav = document.querySelector('.navigation');
const newTaskSection = document.querySelector('.section__ul');
const newTask = document.querySelector('.form__label--text');
const submitBtn = document.querySelector('.form__button-submit');
const taskTitle = document.querySelector('.form__label--input');
const taskSection = document.querySelector('.section__tasks');

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
	let toDo = new ToDo(id, title, tasks, urgent, finished);
	toDosArr.splice(i, 1, toDo);
}

function reassignTaskClass() {
	let tasks = Array.from(document.querySelectorAll('.li--temp-task'));
	tasks = tasks.map((task) => {
		return new ToDoTask(task.id, task.innerText);
	});
	return tasks;
}

function createNewToDo(e) {
	let tasks = reassignTaskClass();
	let toDo = new ToDo(Date.now(), taskTitle.value, tasks);
	toDosArr.push(toDo);
	toDo.saveToStorage(toDosArr);
	appendNewToDo(toDo);
	taskTitle.value = "";
	newTask.value = "";
}

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
	let italic = "";
	let returnString = "";
	toDo.tasks.forEach((task) => {
		task.checked ? italic = "checked" : italic = "";
		returnString += `<li class="li--task ${italic}" id=${task.id}>
		<input type="image" src=${task.checkedImg()} class="li__delete">${task.text}</li>`;
	});
	return returnString;
}

function appendNewToDo(toDo) {
	const urgentSrc = toDo.urgentImg();
	const urgentClass = toDo.urgent ? "section__tasks--urgent" : "";
	const urgentFont = toDo.urgent ? "section__label--urgent" : "";
	const urgentBorder = toDo.urgent ? "section__section--borders" : "";
	taskSection.insertAdjacentHTML('afterbegin',
		`<section class="section__tasks--status ${urgentClass}" id=${toDo.id}>
			<section class="section__section--title">
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
	</section>`);
}

function clearToDoData(e) {
	document.querySelector('.section__ul').innerHTML = "";
}

function persistedToDos(e) {
	toDosArr.forEach((toDo, index) => {
		const id = toDo.id;
		const title = toDo.title;
		const tasks = toDo.tasks;
		const urgent = toDo.urgent;
		const finished = toDo.finished;
		const i = index;
		reassignClass(id, title, tasks, urgent, finished, i);
	});
}

function reinstantiateToDos() {
	toDosArr.forEach((object) => {
		appendNewToDo(object);
	});
}

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
	const taskId = e.target.closest('.li--task').id;
	const task = ToDoTask.getById(taskId);
	task.updateTask({ checked: !task.checked });
	e.target.src = task.checkedImg();
	e.target.closest('li').classList.toggle('checked');
}

function urgentStatus(e) {
	let card = e.target.closest('.section__tasks--status');
	let toDo = ToDo.getById(card.id);
	const text = e.target.nextSibling.nextSibling;
	const gGParent = e.target.parentNode.parentNode.parentNode;
	const gParentSibling1 = e.target.parentNode.parentNode.previousSibling.previousSibling;
	toDo.updateToDo({ urgent: !toDo.urgent });
	toDo.saveToStorage();
	toDo.urgent ? gGParent.classList.add('section__tasks--urgent') : gGParent.classList.remove('section__tasks--urgent');
	toDo.urgent ? gParentSibling1.classList.add('section__section--borders') : gParentSibling1.classList.remove('section__section--borders');
	toDo.urgent ? text.classList.add('section__label--urgent') : text.classList.remove('section__label--urgent');
	e.target.src = toDo.urgentImg();
}

function deleteToDoCard(e) {
	let card = e.target.parentNode.parentNode.parentNode;
	let toDo = ToDo.getById(card.id);
	let newArr = toDo.tasks.filter(obj => obj.checked === true);
	if (newArr.length === toDo.tasks.length) {
		card.remove();
		toDo.deleteFromStorage();
	}
}