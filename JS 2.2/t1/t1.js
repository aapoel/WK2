// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];



const ul = document.querySelector('ul');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const textInput = document.querySelector('form input');
const addBtn = document.querySelector('.add-btn');


function addItemToPage(item) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'todo-' + item.id;
  checkbox.checked = item.completed;

  const label = document.createElement('label');
  label.htmlFor = checkbox.id;
  label.innerText = item.task;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';

  
  checkbox.addEventListener('change', function () {
    item.completed = checkbox.checked;
    console.log(todoList);
  });

  deleteBtn.addEventListener('click', function () {
    const index = todoList.indexOf(item);
    todoList.splice(index, 1);
    ul.removeChild(li);
    console.log(todoList);
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
}


for (const item of todoList) {
  addItemToPage(item);
}

addBtn.addEventListener('click', function () {
  dialog.showModal();
});

form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const newItem = {
    id: Date.now(),
    task: textInput.value,
    completed: false,
  };

  todoList.push(newItem);
  addItemToPage(newItem);
  console.log(todoList);

  textInput.value = '';
  dialog.close();
});