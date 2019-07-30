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
	if (e.target.classList.contains('li__delete')) {
		checkedStatus(e);
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

function mapLis() {
	var tasks = Array.from(document.querySelectorAll('.li--temp-task'));
	tasks = tasks.map(function(task) {
		return new ToDoTask(task.id, task.innerText)
	});
	return tasks;
}

function createNewToDo(e) {
	var tasks = mapLis();
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
	var checkboxSrc = ToDoTask.checked ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
	toDo.tasks.forEach(function(task) {
		returnString += `<li class="li--task" id=${task.id}>
		<input type="image" src=${checkboxSrc} class="li__delete">${task.text}</li>`;
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
		var finished = toDosArr[i].finished;
		var index = i;
		reassignClass(id, title, tasks, urgent, finished, i);
	}
}

function reassignClass(id, title, tasks, urgent, finished, i) {
	var toDo = new ToDo(id, title, tasks, urgent, finished);
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

// function findLiId(id) {
// 	return toDosArr.ToDo.tasks.findIndex(function(toDoItem) {
// 		return parseInt(toDoItem.id) === parseInt(id);
// 	})
// }

// 


function checkedStatus(e) {
	var taskId = e.target.closest('.li--task').id;
	var toDoId = e.target.closest('.section__tasks--status').id;
	var toDoIndex = findIndexByCardId(toDoId);
	var taskIndex = findTaskIndexById(taskId);
	toDosArr[toDoIndex].tasks[taskIndex].checked = !toDosArr[toDoIndex].tasks[taskIndex].checked;
	toDosArr[toDoIndex].saveToStorage(toDosArr);
	console.log(taskId, toDoId, toDoIndex, taskIndex);
}

function urgentStatus(e) {
		var card = e.target.closest('.section__tasks--status');
		var cardIndex = findIndexByCardId(card.id);
		var greatGrandParent = e.target.parentNode.parentNode.parentNode;
		toDosArr[cardIndex].urgent = !toDosArr[cardIndex].urgent;
		e.target.src = toDosArr[cardIndex].urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'
		toDosArr[cardIndex].urgent ? greatGrandParent.classList.add('section__tasks--urgent') : greatGrandParent.classList.remove('section__tasks--urgent');
		toDosArr[cardIndex].saveToStorage(toDosArr);

}
// find toDo index by card id
function findIndexByCardId(id) {
	return toDosArr.findIndex(function(toDo) {
		return parseInt(toDo.id) === parseInt(id);
	})
}

function findTaskIndexById(id) {
	return toDosArr[toDoIndex].tasks.findIndex(function(task) {
		return parseInt(taskId) === parseInt(task.id);
}

function findToDoId(e) {
  return parseInt(e.target.closest('.section__tasks--status').dataset.id);
};

function locateIndex() {
	var taskId = findToDoId();
  for (var i = 0; i < toDosArr.length; i++) {
    if (taskId === toDosArr[i].id) {
			return parseInt(i);
		}
	}
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
