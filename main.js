var toDos = JSON.parse(localStorage.getItem('taskArr')) || [];

var addNewTask = document.querySelector('.form__image--add');
var newTaskSection = document.querySelector('.form__section--item');
var newTask = document.querySelector('.form__label--text');
var submitBtn = document.querySelector('.form__button-submit');
var taskTitle = document.querySelector('.form__label--input');
var taskSection = document.querySelector('.section__tasks');

addNewTask.addEventListener('click', newTaskItem);
submitBtn.addEventListener('click', newToDo);
// window.addEventListener('load', onPageLoad);

// function onPageLoad() {
// 	persistedTask();
// }

// when click "make task list"
// grab all li values
// push li's into ToDoList.tasks arr
// grab title
// pass to new card


function createNewTask(e) {
	e.preventDefault();
	var tasks = [];
	var allTasks = document.querySelectorAll('.li--task');
	allTasks.forEach(function(li) {
		tasks.push({taskId: li.id,
								taskText: li.innerText,
								checked: false,
							});
	});
	console.log(allTasks);
  // var toDo = new ToDoList(Date.now(), taskTitle.value, tasks);
  // taskTitle.value = "";
  // appendNewTask(toDo);
  // toDo.saveToStorage(toDos);
}

function newToDo(e) {
	var toDo = new ToDoList(Date.now(), taskTitle.value, tasks);
  taskTitle.value = "";
  appendNewTask(toDo);
  toDo.saveToStorage(toDos);
}

function newTaskItem(e) {
	e.preventDefault();
	var item = newTask.value;
	newTaskSection.insertAdjacentHTML('beforeend',
		`<li class="li--task">${item}</li>`);
	newTask.value = "";
}
 // data-id=${task.id}
// this.humanWards.push(infant);

function transferTaskItems(task) {

}

function appendNewTask(toDo) {
	taskSection.insertAdjacentHTML('afterbegin',
		`<section class="section__tasks--status" data-id=${toDo.id}>
				<section class="section__section--title">
					<h2 class="section__section--h2">${toDo.title}</h2>
				</section>
				<section class="section__section--tasks">
					<ul class="section__ul--tasks">
					</ul>
				</section>
				<section class="section__section--status">
					<input type="image" src="images/urgent-active.svg" name="section__input--urgent" class="section__input--urgent icon--small" alt="Red lightning bolt icon">
					<label for="section__input--urgent">Urgent</label>
					<input type="image" src="images/delete.svg" name="section__input--delete" class="section__input--delete icon--small" alt="Circle with X in the center">
					<label for="section__input--delete">Delete</label>
				</section>
			</section>`)
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