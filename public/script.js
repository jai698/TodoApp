

async function signup(){
    const name = document.getElementById('sign-up-input').value;
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;

    try {
        await axios.post("http://localhost:3001/signup", {
            name: name,
            email:email,
            password: password,
        });
        alert("Sign-up completed!");
    } catch (error) {
        console.error('There was an error during sign-up:', error);
        alert("Sign-up failed!");
    }
}

async function login(){
    const password = document.getElementById('login-password').value;
    const email = document.getElementById('login-email').value;

    try {
        const response = await axios.post("http://localhost:3001/login",{
            email: email,
            password: password,
        });
        localStorage.setItem("token",response.data.token);
        alert("Login completed!");
    } catch (error) {
        console.error('There was an error during Login:', error);
        alert("Login failed!");
    }
}

async function createTodo() {
    const title = document.getElementById('entry-in-todo').value;
    const token = localStorage.getItem('token'); 

    try {
        await axios.post('http://localhost:3001/todo', {
            title: title, 
        }, {
            headers: {
                token: token
            }
        });
        alert("Todo Registered");
    } catch (error) {
        console.error('There was an error', error);
        alert("Todo Register failed");
    }
}


async function showTodo() { 
    try {
        const response = await axios.get("http://localhost:3001/todos", {
            headers: {
                token: localStorage.getItem("token")      
            }
        });
        
        const todos = response.data.todos; 
        let todosList = ''; 
        todos.forEach(todo => {
            todosList += `<li>${todo.title}</li>`; 
        });

        document.getElementById('populate').innerHTML = `<ul>${todosList}</ul>`; 

    } catch (error) {
        console.error('There was an error fetching the todos', error);
        alert("Failed to fetch todos");
    }
}
showTodo();