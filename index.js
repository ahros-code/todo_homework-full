let input = document.querySelector('.input');
let form = document.querySelector('form');
let list = document.querySelector('.ul');

let todo = [];

if (JSON.parse(localStorage.getItem('todo'))) {
	todo = JSON.parse(localStorage.getItem('todo'));
	renderTodo(todo, list);
}

form.addEventListener('submit', e => {
	e.preventDefault();
	if (input.value.trim() !== '') {
		todo.push(input.value.trim());
		localStorage.setItem('todo', JSON.stringify(todo));
		renderTodo(todo, list);
		input.value = '';
	} else {
		alert('Please enter anything');
	}
});

function renderTodo(item, node) {
	node.innerHTML = item
		.map(
			item =>
				`
			<div class='todo-item'>
			<li class='todo-li'>${item}</li>
			<button onclick='deleteItem()'>Delete</button>
			<button onclick='updateItem()'>Update</button>
			</div>
		`
		)
		.join('');
}

function deleteItem() {
	const item = event.target.parentNode.querySelector('.todo-li').innerText;
	const index = todo.indexOf(item);
	todo.splice(index, 1);
	localStorage.setItem('todo', JSON.stringify(todo));
	renderTodo(todo, list);
}

function updateItem() {
	const item = event.target.parentNode.querySelector('.todo-li');
	const index = todo.findIndex(todoItem => todoItem === item.innerText);
	const updatedText = prompt('Enter the updated todo item:', item.innerText);
	if (updatedText) {
		todo[index] = updatedText;
		localStorage.setItem('todo', JSON.stringify(todo));
		renderTodo(todo, list);
	}
}
