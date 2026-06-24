// 1. Task Data Structure State
let tasks = [];

// 2. DOM Elements Selection
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const taskPriorityInput = document.getElementById('taskPriority');
const taskImportantInput = document.getElementById('taskImportant');
const taskCompletedInput = document.getElementById('taskCompleted');
const taskManagerContainer = document.getElementById('taskmanager');

// 3. Form Submission Event Handler
taskForm.addEventListener('submit', function(event) {
    // Prevent default form submission refresh behavior
    event.preventDefault();

    // Input Validation: block empty strings or just whitespace
    const taskNameValue = taskNameInput.value.trim();
    if (!taskNameValue) {
        alert("Please enter a valid task name.");
        return;
    }

    // Capture the current system date string
    const todayStr = new Date().toLocaleDateString();

    // Construct the task object conforming to specifications
    const newTask = {
        id: Date.now(), // Generate unique numeric ID
        name: taskNameValue,
        priority: taskPriorityInput.value,
        isImportant: taskImportantInput.checked,
        isCompleted: taskCompletedInput.checked,
        date: todayStr
    };

    // Push task item into global application array state
    tasks.push(newTask);

    // Synchronize UI and console data log
    renderTasks();
    logTasksState();

    // Reset Form Input Fields for next entry
    taskForm.reset();
});

// 4. Global Dynamic DOM Engine
function renderTasks() {
    // Wipe current list presentation clean
    taskManagerContainer.innerHTML = "";

    if (tasks.length === 0) {
        taskManagerContainer.innerHTML = "<p>No tasks found. Add a task to get started!</p>";
        return;
    }

    // Traverse the task state array and append data cards sequentially
    tasks.forEach(task => {
        // Construct wrapper card
        const card = document.createElement('div');
        card.classList.add('task-card');
        
        // Populate core text elements inside card
        card.innerHTML = `
            <h3 id="title-${task.id}">${task.name}</h3>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Added On:</strong> ${task.date}</p>
            <div class="card-actions">
                <button class="toggle-btn" onclick="toggleTaskCompletion(${task.id})">Toggle Status</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        // Cache elements needing conditional formatting overrides
        const taskTitle = card.querySelector(`#title-${task.id}`);

        // SPEC REQUIREMENT: Highlight important tasks in RED using .style
        if (task.isImportant) {
            card.style.borderLeft = "6px solid red";
            taskTitle.style.color = "red";
        }

        // SPEC REQUIREMENT: Apply STRIKETHROUGH to completed tasks using .style
        if (task.isCompleted) {
            taskTitle.style.textDecoration = "line-through";
            card.style.opacity = "0.7";
        }

        // Append the configured single component node onto display canvas
        taskManagerContainer.appendChild(card);
    });
}

// 5. Functional Action Methods
function deleteTask(id) {
    // Filter array to exclude target item match
    tasks = tasks.filter(task => task.id !== id);
    
    // Refresh outputs
    renderTasks();
    logTasksState();
}

function toggleTaskCompletion(id) {
    // Locate match reference index and invert boolean property
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.isCompleted = !task.isCompleted;
        }
        return task;
    });

    // Refresh outputs
    renderTasks();
    logTasksState();
}

// 6. Mandatory Specification Console Log Echo
function logTasksState() {
    console.log(JSON.stringify(tasks));
}