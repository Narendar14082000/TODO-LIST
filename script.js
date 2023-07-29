document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const uncompletedTasks = document.getElementById('uncompletedTasks');
    const allBtn = document.getElementById('allBtn');
    const completedBtn = document.getElementById('completedBtn');
    const uncompletedBtn = document.getElementById('uncompletedBtn');

    let count = 0;
    let completedCount = 0;

    addBtn.addEventListener('click', () => {
        const task = todoInput.value.trim();
        if (task !== '') {
            count++;
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <input type="checkbox" id="task_${count}">
                <label for="task_${count}">${task}</label>
                <span class="delete-btn">X</span>
                <span class="status-label">Uncompleted</span>
            `;
            todoList.appendChild(listItem);
            updateTotalTasks();
            todoInput.value = '';
        }
    });

    function updateTotalTasks() {
        totalTasks.textContent = `Total Tasks: ${count}`;
        completedTasks.textContent = `Completed: ${completedCount}`;
        uncompletedTasks.textContent = `Uncompleted: ${Math.max(count - completedCount, 0)}`;
    }

    function deleteTask(element) {
        const listItem = element.parentNode;
        const checkbox = listItem.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            completedCount--;
            updateCompletedTasks();
        }
        listItem.remove();
        count--;
        updateTotalTasks();
    }

    function updateStatusLabel(checkbox) {
        const statusLabel = checkbox.parentNode.querySelector('.status-label');
        statusLabel.textContent = checkbox.checked ? 'Completed' : 'Uncompleted';
        checkbox.checked ? completedCount++ : completedCount--;
        updateCompletedTasks();
        updateTotalTasks();
    }

    function updateCompletedTasks() {
        completedTasks.textContent = `Completed: ${completedCount}`;
    }

    todoList.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            updateStatusLabel(event.target);
        }
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            deleteTask(event.target);
        }
    });

    allBtn.addEventListener('click', () => {
        const tasks = todoList.querySelectorAll('li');
        tasks.forEach((task) => task.style.display = 'block');
    });

    completedBtn.addEventListener('click', () => {
        const tasks = todoList.querySelectorAll('li');
        tasks.forEach((task) => {
            const checkbox = task.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    });

    uncompletedBtn.addEventListener('click', () => {
        const tasks = todoList.querySelectorAll('li');
        tasks.forEach((task) => {
            const checkbox = task.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    });
});