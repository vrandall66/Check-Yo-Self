var toDosArr 				= JSON.parse(localStorage.getItem('toDosArr')) || [];

var addNewTask		 	= document.querySelector('.form__image--add');
var clearBtn 				= document.querySelector('.form__button--reset');
var nav 						= document.querySelector('.navigation');
var newTaskSection 	= document.querySelector('.section__ul');
var newTask 				= document.querySelector('.form__label--text');
var submitBtn 			= document.querySelector('.form__button-submit');
var taskTitle 			= document.querySelector('.form__label--input');
var taskSection 		= document.querySelector('.section__tasks');
var welcomeText 		= document.querySelector('.aside__section--container');

nav.addEventListener('keyup', navKeyHandler);
nav.addEventListener('click', checkEventLocation);
taskSection.addEventListener('click', toDoTaskHandler);
taskSection.addEventListener('mouseover', deleteBtnHover);
taskSection.addEventListener('mouseout', deleteBtnHoverOut);
window.addEventListener('load', onPageLoad);

function toDoTaskHandler(e) {
	if (e.target.classList.contains('section__input--delete')) {
	deleteToDoItem(e);
	}
	if (e.target.classList.contains('section__input--urgent')) {
	urgentStatus(e);
	}
}

function checkEventLocation(e) {
	if (e.target.closest('.form__image--add')) {
		checkTaskInputValue(e);
		appendTempTask(e);
		checkTaskInputValue(e);
	}
	if (e.target.closest('.form__button-submit')) {
		createNewToDo(e);
		clearNavUl(e);
		disableClearBtn(e);
		disableSubmitBtn(e);
		welcomeMessage();
	}
	if (e.target.closest('.section__ul')) {
		removeLiFromNav(e);
	}
	if (e.target === clearBtn) {
		removeAllLi(e);
		disableClearBtn(e);
	}
}

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

function removeLiFromNav(e) {
	if (e.target.className === 'li__delete') {
		event.target.parentNode.remove();

		// parent Element has unique ID
		// use ID to delete from array
		// find element based on ID on document
		// look into removing child node on parent node from line 30
		// remove parent node
		// splice? 
		// remove ID at index of toDoTasks array
	}
}

function removeAllLi(e) {
	newTaskSection.innerHTML = "";
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
	var tasks = Array.from(document.querySelectorAll('.li--temp-task'));
	tasks = tasks.map(function(task) {
		return new ToDoTask(task.id, task.innerText)
	});
	var toDo = new ToDo(Date.now(), taskTitle.value, tasks);
	toDosArr.push(toDo);
	toDo.saveToStorage(toDosArr);
	appendNewTask(toDo);
	taskTitle.value = "";
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

function makeLiList(toDo) {
	var returnString = "";
	toDo.tasks.forEach(function(task) {
		returnString += `<li class="li--task">
		<input type="image" src="images/checkbox.svg" class="li__delete">${task.text}</li>`;
	})
	return returnString;
}

function appendNewTask(toDo) {
	var urgentSrc = toDo.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
	taskSection.insertAdjacentHTML('afterbegin',
		`<section class="section__tasks--status" id=${toDo.id}>
			<section class="section__section--title">
				<h2 class="section__section--h2">${toDo.title}</h2>
			</section>
			<section class="section__section--tasks">
				<ul class="section__ul--tasks">
					${makeLiList(toDo)}
				</ul>
			</section>
		<section class="section__section--status">
			<section class="section__section--left">
				<input type="image" src=${urgentSrc} name="section__input--urgent" class="section__input--urgent icon--small" alt="Red lightning bolt icon">
				<label for="section__input--urgent" class="section__section--label">URGENT</label>
			</section>
			<section class="section__section--right">
				<input type="image" src="images/delete.svg" name="section__input--delete" class="section__input--delete icon--small" alt="Circle with X in the center">
				<label for="section__input--delete" class="section__section--label">DELETE</label>
			</section>
		</section>
	</section>`)
}

function clearNavUl (e) {
	document.querySelector('.section__ul').innerHTML = "";
}

function persistedToDos(e) {
	for (var i = 0; i < toDosArr.length; i++) {
		var id = toDosArr[i].id;
		var title = toDosArr[i].title;
		var tasks = toDosArr[i].tasks;
		var urgent = toDosArr[i].urgent;
		var index = i;
		reassignClass(id, title, tasks, urgent, i);
	}
}

function reassignClass(id, title, tasks, urgent, i) {
	var toDo = new ToDo(id, title, tasks, urgent);
	toDosArr.splice(i, 1, toDo);
};

function reinstantiateToDos() {
	toDosArr.forEach(function(object) {
		appendNewTask(object);
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

function urgentStatus(e) {
		var card = e.target.closest('.section__tasks--status');
		var cardIndex = findIndexByCardId(card.id);
		toDosArr[cardIndex].urgent = !toDosArr[cardIndex].urgent;
		toDosArr[cardIndex].saveToStorage(toDosArr);
	if (toDosArr[cardIndex].urgent) {
		event.target.src = 'images/urgent-active.svg';
	} else {
		event.target.src = 'images/urgent.svg';
	}
}
// var urgentSrc = toDo.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';

function findToDoId(event) {
  return parseInt(event.target.closest('.section__tasks--status').dataset.id);
};

function locateIndex() {
	var taskId = findToDoId();
  for (var i = 0; i < toDosArr.length; i++) {
    if (taskId === toDosArr[i].id) {
			return parseInt(i);
		}
	}
}

function findIndexByCardId(id) {
	return toDosArr.findIndex(function(toDo) {
		return parseInt(toDo.id) === parseInt(id);
	})
}

function deleteToDoItem(e) {
	if (e.target.classList.contains('section__input--delete')) {
		var card = e.target.parentNode.parentNode.parentNode;
		toDosArr[0].deleteFromStorage(findIndexByCardId(card.id));
		card.remove();
	}
}

function deleteBtnHover(e) {
	if (e.target.classList.contains('section__input--delete')) {
		e.target.src = "images/delete-active.svg";
	}
}

function deleteBtnHoverOut(e) {
	if (e.target.classList.contains('section__input--delete')) {
		e.target.src = 'images/delete.svg';
	}
}
