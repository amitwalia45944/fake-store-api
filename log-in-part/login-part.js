
function show_successful_mssg() {
    const response_message = document.getElementById('form-response');
    const form = document.querySelector('main');
    response_message.classList.remove('active');
    form.style.display = "none";
};

function clear_error() {

    let errors = document.getElementsByClassName('show-error');

    for (let item of errors) {
        item.textContent = "";
    }
}

function set_error(id, error) {
    let element = document.getElementById(id);
    element.getElementsByClassName('show-error')[0].textContent = error;
}

function validate(event) {

    event.preventDefault();

    let flag = true;
    clear_error();

    let email = document.forms['log-in-form']["email"].value;
    let password = document.forms['log-in-form']["password"].value;

    const storedEmail = localStorage.getItem('authenticatedEmail');
    const storedPassword = localStorage.getItem('authenticatedPassword');
    
    if (!(email === storedEmail && password === storedPassword)) {
        set_error('fpassword',"unauthorized email or password");
        flag = false;
    } 
   else{
    if (flag) {
        show_successful_mssg();
    }
   }
}
