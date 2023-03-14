// Get the form and input elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

// Get the ul element for the to-do list items
const list = document.getElementById('todo-list');

// Load the to-do list items from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render the to-do list items on page load
renderTodos();

// Add an event listener to the form for when it's submitted
form.addEventListener('submit', (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the value of the input element
  const todoText = input.value.trim();

  // If the input value is not empty and valid
  if (todoText.length >= 3 && todoText.length <= 50) {
    // Add the new to-do item to the list
    todos.push({
      id: Date.now(),
      text: todoText,
      completed: false
    });

    // Save the updated to-do list to local storage
    localStorage.setItem('todos', JSON.stringify(todos));

    // Render the to-do list items
    renderTodos();

    // Clear the input value
    input.value = '';

    // Remove the error message and style if present
    input.classList.remove('todo-input-error');
    const errorMessage = form.querySelector('.todo-input-error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  } else {
    // Show an error message to the user
    const errorMessage = form.querySelector('.todo-input-error-message');
    if (errorMessage) {
      errorMessage.textContent = 'Please enter a to-do item between 3 and 50 characters.';
    } else {
      const error = document.createElement('span');
      error.className = 'todo-input-error-message';
      error.textContent = 'Please enter a to-do item between 3 and 50 characters.';
      input.classList.add('todo-input-error');
      form.insertBefore(error, input.nextSibling);
    }
  }
});

// Render the to-do list items
function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-list-item';
    if (todo.completed) {
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.className = 'todo-list-item-text';
    span.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'todo-list-item-delete';
    deleteButton.textContent = 'Delete';

    const completeButton = document.createElement('button');
    completeButton.className = 'todo-list-item-complete';
    completeButton.textContent = todo.completed ? 'Incomplete' : 'Complete';

    deleteButton.addEventListener('click', () => {
      todos = todos.filter((t) => t.id !== todo.id);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });

    completeButton.addEventListener('click', () => {
      todo.completed = !todo.completed;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(completeButton);
    list.appendChild(li);
  });
}
