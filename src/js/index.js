'use strict'
let nameInput = document.getElementById("name")
let emailInput = document.getElementById("email")
let passwordInput = document.getElementById("password")
let rePassword = document.getElementById("rePassword")
let phoneNumber = document.getElementById("phoneNumber")
let submitButton = document.getElementById("submit")
let form = document.getElementById("registerForm")
// prevent behavior of the form
form.addEventListener("submit", (e) => {
    e.preventDefault()
})
const addUser = async () => {
    if (nameValidate(nameInput.value) && emailValidate(emailInput.value) && passwordValidate(passwordInput.value)) {
        let registerInputsValue = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            rePassword: rePassword.value,
            phone: phoneNumber.value
        }

        let response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerInputsValue),
        })


        const data = await response.json();
        console.log(data);

        if (data.message === "success") {
            setTimeout(() => { window.location.pathname = 'shoppingCart/src/login.html' }, 1500)
            console.log(data);

            document.getElementById("RegisteredBefore").classList.add("hidden")
        } else {
            console.log('error', data);

            document.getElementById("RegisteredBefore").classList.remove("hidden")
            setTimeout(() => { window.location.pathname = 'shoppingCart/src/login.html' }, 1500)
        }
    }

}
// on submitting 
submitButton.addEventListener("click", () => {
    addUser()

})
// validating while writing
nameInput.addEventListener("input", (e) => {
    nameValidate(e.target.value)
})
emailInput.addEventListener("input", (e) => {
    emailValidate(e.target.value)
})
passwordInput.addEventListener("input", (e) => {
    passwordValidate(e.target.value)
})
rePassword.addEventListener("input", (e) => {
    rePasswordValidate(e.target.value)
})
phoneNumber.addEventListener("input", (e) => {
    phoneValidate(e.target.value)
})
// validation
function nameValidate(val) {
    const regex = /^[A-Za-z][A-Za-z -]{2,}$/gmi
    const validClasses = ["border-green-500", "focus:ring-green-500", "focus:border-green-500"];
    const invalidClasses = ["border-red-500", "focus:ring-red-500", "focus:border-red-500"];
    if (regex.test(val)) {
        validClasses.forEach(cls => nameInput.classList.add(cls))
        invalidClasses.forEach(cls => nameInput.classList.remove(cls))
        nameInput.nextElementSibling.classList.add("hidden")
        return true
    }
    else {
        validClasses.forEach(cls => nameInput.classList.remove(cls))
        invalidClasses.forEach(cls => nameInput.classList.add(cls))
        nameInput.nextElementSibling.classList.remove("hidden")
        return false
    }
}
function emailValidate(val) {
    const regex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/gmi
    const validClasses = ["border-green-500", "focus:ring-green-500", "focus:border-green-500"];
    const invalidClasses = ["border-red-500", "focus:ring-red-500", "focus:border-red-500"];
    if (regex.test(val)) {
        validClasses.forEach(cls => emailInput.classList.add(cls))
        invalidClasses.forEach(cls => emailInput.classList.remove(cls))
        emailInput.nextElementSibling.classList.add("hidden")
        return true
    }
    else {
        validClasses.forEach(cls => emailInput.classList.remove(cls))
        invalidClasses.forEach(cls => emailInput.classList.add(cls))
        emailInput.nextElementSibling.classList.remove("hidden")
        return false
    }
}
function passwordValidate(val) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{5,10}$/gmi
    const validClasses = ["border-green-500", "focus:ring-green-500", "focus:border-green-500"];
    const invalidClasses = ["border-red-500", "focus:ring-red-500", "focus:border-red-500"];
    if (regex.test(val)) {
        validClasses.forEach(cls => passwordInput.classList.add(cls))
        invalidClasses.forEach(cls => passwordInput.classList.remove(cls))
        passwordInput.nextElementSibling.classList.add("hidden")
        return true
    }
    else {
        validClasses.forEach(cls => passwordInput.classList.remove(cls))
        invalidClasses.forEach(cls => passwordInput.classList.add(cls))
        passwordInput.nextElementSibling.classList.remove("hidden")
        return false
    }
}
function rePasswordValidate(val) {

    const validClasses = ["border-green-500", "focus:ring-green-500", "focus:border-green-500"];
    const invalidClasses = ["border-red-500", "focus:ring-red-500", "focus:border-red-500"];
    if (passwordInput.value === val) {
        validClasses.forEach(cls => rePassword.classList.add(cls))
        invalidClasses.forEach(cls => rePassword.classList.remove(cls))
        rePassword.nextElementSibling.classList.add("hidden")
        return true
    }
    else {
        validClasses.forEach(cls => rePassword.classList.remove(cls))
        invalidClasses.forEach(cls => rePassword.classList.add(cls))
        rePassword.nextElementSibling.classList.remove("hidden")
        return false
    }
}
function phoneValidate(val) {
    const regex = /^(010|011|012|015)\d{8}$/gm
    const validClasses = ["border-green-500", "focus:ring-green-500", "focus:border-green-500"];
    const invalidClasses = ["border-red-500", "focus:ring-red-500", "focus:border-red-500"];
    if (regex.test(val)) {
        validClasses.forEach(cls => phoneNumber.classList.add(cls))
        invalidClasses.forEach(cls => phoneNumber.classList.remove(cls))
        phoneNumber.nextElementSibling.classList.add("hidden")
        return true
    }
    else {
        validClasses.forEach(cls => phoneNumber.classList.remove(cls))
        invalidClasses.forEach(cls => phoneNumber.classList.add(cls))
        phoneNumber.nextElementSibling.classList.remove("hidden")
        return false
    }
}


