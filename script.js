// Selectors
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// State
let tasks = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
});

// Load tasks from LocalStorage
function loadTasks() {
    const stored = localStorage.getItem('cyberpunkTasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem('cyberpunkTasks', JSON.stringify(tasks));
}

// Add New Task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

// Toggle Complete
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(id, event) {
    event.stopPropagation(); // Prevent toggling when clicking delete
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // click to toggle
        li.addEventListener('click', () => toggleTask(task.id));

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        // Data attribute for glitch effect content duplication
        span.setAttribute('data-content', task.text);

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'X';
        delBtn.addEventListener('click', (e) => deleteTask(task.id, e));

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
