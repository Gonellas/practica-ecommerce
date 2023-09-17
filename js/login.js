class User {
    constructor(name, lastname, email, password, country, admin) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.country = country;
        this.admin = admin;
    }
}

let users = [
    new User('Diego', 'Fernandez', 'diego@gmail.com', '1245678', 'Argentina', false),
    new User('Camila', 'Gonella', 'camila@gmail.com', '12345678', 'Argentina', true),
    new User('Ale', 'Busi', 'ale@gmail.com', '1245678', 'Argentina', false),
    new User('Lucas', 'Ferruchi', 'lucas@gmail.com', '1245678', 'Argentina', false),
    new User('Nicole', 'Romero', 'nicole@gmail.com', '1245678', 'Argentina', false),
];

if (!localStorage.getItem('users')) {
    let usersJSON = JSON.stringify(users);
    localStorage.setItem("users", usersJSON);
}

function loginCheck(event) {
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let pass = document.getElementById('pass').value;
    let usersLS = localStorage.getItem('users');
    const usersLSConvertido = JSON.parse(usersLS);
    let userLogged = usersLSConvertido.find(user => user.email === email);
    if (userLogged && userLogged.password === pass) {
        window.location.assign(window.location.origin + '/main.html')
    } else {
        let dataError = document.createElement("div");
        dataError.innerText = "Los datos ingresados no son correctos";
        dataError.classList.add("alert", "alert-danger", "mt-3");
        let form = document.querySelector("form");
        form.appendChild(dataError);
        setTimeout(function () {
            form.removeChild(dataError);
        }, 5000)
    }
}

function register() {
    let email = document.getElementById('register-email').value;
    let lastname = document.getElementById('lastname').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let country = document.getElementById('country').value;

    let nameValidation = /^[A-Z]+$/i.test(name);
    let lastnameValidation = /^[A-Z]+$/i.test(lastname);
    let countryValidation = /^[A-Z]+$/i.test(country);
    let passwordValidation = /^[A-Z]-(?=\w*\d)(?=\w*[a-z])\S{8,16}/.test(password);
    let emailValidation = /([a-z]\w+@[a-z]+\.[a-z]{2,5})/.test(email);

    if (nameValidation && lastnameValidation && countryValidation && passwordValidation && emailValidation) {

        let newUser = new User(name, lastname, email, password, country);

        //Traer de local storage
        let data = localStorage.getItem('users');

        //Ponerlo en mi idioma
        let usersLS = JSON.parse(data);

        //Modificar el elemento que trajimos
        usersLS.push(newUser);

        //Poner en el idioma de local storage
        data = JSON.stringify(usersLS);

        //Volver a enviar a local a storage
        localStorage.setItem('users', data);

        window.location.assign(window.location.origin + '/main.html');
    } else {
        const error = document.createElement('div');
        error.innerHTML = 'Hay campos erroneos';
        error.classList.add('alert', 'alert-danger', 'mt-3');
        const modal = document.getElementById('registerModal');
        modal.appendChild(error);
        setTimeout(() =>{
            modal.removeChild(error);
        },5000);
    }
}