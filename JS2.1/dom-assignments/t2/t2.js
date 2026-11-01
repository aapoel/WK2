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

for (const item of todoList) {
  
  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');

  
  input.type = 'checkbox';
  input.id = `todo-${item.id}`;
  input.checked = item.completed;

  
  label.htmlFor = `todo-${item.id}`;
  label.textContent = item.task;

  
  li.append(input, label);
  ul.append(li);
}
