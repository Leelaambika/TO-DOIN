// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Current filter and search query
let currentFilter = 'all';
let currentSearch = '';

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks based on current filter and search query
function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (currentSearch.trim() !== '') {
    filteredTasks = filteredTasks.filter(task =>
      task.text.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.setAttribute('draggable', 'true');
    li.setAttribute('data-index', index);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement('span');
    span.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveT
