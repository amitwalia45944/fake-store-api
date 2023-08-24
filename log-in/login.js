const reset_button = document.getElementById("reset-button");

reset_button.addEventListener("click", () => {
    const errors_list = document.querySelectorAll(".show-error");

    errors_list.forEach((error) => {
        error.textContent = "";
    })
});

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

    let name = document.forms['log-in-form']["name"].value;

    if (name.length == 0) {
        set_error("fname", "*Required");
        flag = false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        set_error("fname", "*Invalid Name Format.");
        flag = false;
    } else if (name.length <= 4) {
        set_error("fname", "*shorter length");
        flag = false;
    }

    let email = document.forms['log-in-form']["email"].value;

    if (email === '') {
        set_error("femail", "*Required");
        flag = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        set_error("femail", "*Invalid Email Format.");
        flag = false;
    }

    let phone = document.forms['log-in-form']["phone"].value;

    if (phone.length > 10 || phone.length < 10) {
        set_error("fphone", "*Required 10 digits!");
        flag = false;
    } else if (!/^\d{10}$/.test(phone)) {
        set_error("fphone", "*Invalid mobile format.")
        flag = false;
    }

    let password = document.forms['log-in-form']["password"].value;

    if (password.length < 4 || password === '') {
        set_error("fpassword", "*Required atleast 6 character");
        flag = false;
    } else if (!/[A-Z]/.test(password)) {
        set_error("fpassword", "*Include atleast one uppercase");
        flag = false;
    } else if (!/[a-z]/.test(password)) {
        set_error("fpassword", "**Include atleast one lowercase");
        flag = false;
    } else if (!/[0-9]/.test(password)) {
        set_error("fpassword", "**Include atleast one one digit");
        flag = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
        set_error("fpassword", "**Include atleast one special character");
        flag = false;
    }

    let confirm_password = document.forms['log-in-form']["confirm-password"].value;

    if (confirm_password != password) {
        set_error("fconfirm-password", "*Required matched password!");
        flag = false;
    }

    const checkbox = document.getElementById("agree-checkbox");

    if (!checkbox.checked) {
        set_error("tick-box", "*Required");
        flag = false
    }

    if (flag) {
        localStorage.setItem('authenticatedEmail', email);
        localStorage.setItem('authenticatedPassword', password);
        show_successful_mssg();
    }
}
