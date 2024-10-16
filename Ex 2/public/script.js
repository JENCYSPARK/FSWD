let token = '';

document.getElementById('loginBtn').onclick = () => {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    })
    .then(data => {
        token = data.token;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('taskContainer').style.display = 'block';
        loadTasks();
    })
    .catch(err => alert(err.message));
};

document.getElementById('registerBtn').onclick = () => {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => {
        if (!res.ok) throw new Error('Registration failed');
        alert('User registered successfully');
    })
    .catch(err => alert(err.message));
};

document.getElementById('addTaskBtn').onclick = () => {
    const taskText = document.getElementById('taskInput').value;
    fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ text: taskText })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('taskInput').value = '';
        loadTasks();
    })
    .catch(err => alert(err.message));
};

function loadTasks() {
    fetch('http://localhost:4000/api/tasks', {
        headers: { 'Authorization': token }
    })
    .then(res => res.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(task._id);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    })
    .catch(err => alert(err.message));
}

function deleteTask(id) {
    fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
    })
    .then(() => loadTasks())
    .catch(err => alert(err.message));
}
