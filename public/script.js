

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

async function createTodo(){

}

async function showTodo(){

}