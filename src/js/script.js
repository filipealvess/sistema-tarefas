const all_tasks = document.getElementById('all-tasks');
const text_task = document.getElementById('text-task');

const LINE_THROUGH = "line-through";
const CHECKED = "img/checked.png";
const UNCHECKED = "img/unchecked.png";

let LIST;
let id;

let date = localStorage.getItem("TASKS");

if (date) {
	LIST = JSON.parse(date);
	id = LIST.length;
	loadList(LIST);
} else {
	LIST = [];
	id = 0;
}

function loadList(list) {
	list.forEach((item) => {
		addTask(item.name, item.id, item.done, item.trash);
	});
}

function addTask(name, id, done, trash) {
	if (!trash) {
		const LINE = done ? LINE_THROUGH : "";
		const DONE = done ? CHECKED : UNCHECKED;

		const item = `<div id="${id}" class="task">
                      <img class="check" src="${DONE}" alt="Círculo de conclusão da tarefa" data-job="complete">
                      <p class="${LINE}">${name}</p>
                      <img class="trash" src="img/trash.png" alt="Lixeira para excluir tarefa" onmouseover="toggleTrashColor(this)" onmouseout="toggleTrashColor(this)" data-job="delete" />
                  </div>
        `;

		const position = "beforeend";

		all_tasks.insertAdjacentHTML(position, item);
		text_task.value = "";
	}
}

function checkTask() {
	if (text_task.value) {
		const task = text_task.value;
		addTask(task, id, false, false);

		LIST.push({
			name: task,
			id: id,
			done: false,
			trash: false
		});

		localStorage.setItem("TASKS", JSON.stringify(LIST));

		id++;
	}
}

document.addEventListener("keydown", (event) => {
	if (event.key.toLowerCase() === "enter") {
		checkTask();
	}
});

function completeTask(element) {
	const check = element.children[0];
	const text = element.children[1];

	text.classList.toggle(LINE_THROUGH);

	toggleCompleteColor(element.children[0]);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

function deleteTask(element) {
	element.parentNode.removeChild(element);

	LIST[element.id].trash = true;
}

all_tasks.addEventListener("click", (event) => {
	const element = event.target;
	const job = element.dataset.job;

	if (job === "complete") {
		completeTask(element.parentNode);
	} else if (job === "delete") {
		deleteTask(element.parentNode);
	}

	localStorage.setItem("TASKS", JSON.stringify(LIST));
});

/* ALTERAR IMAGEM/COR DA LIXEIRA */

function toggleTrashColor(element) {
	const src = element.getAttribute("src");
	const trash_black = "img/trash.png";
	const trash_red = "img/trash-active.png";

	const newSrc = src === trash_black ? trash_red : trash_black;
	element.setAttribute("src", newSrc);
}

/* ALTERAR IMAGEM/COR DO CÍRCULO DE CONCLUSÃO DA TAREFA */

function toggleCompleteColor(element) {
	const src = element.getAttribute("src");

	const newSrc = src === CHECKED ? UNCHECKED : CHECKED;
	element.setAttribute("src", newSrc);
}