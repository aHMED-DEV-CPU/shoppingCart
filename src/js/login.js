'use strict'
let emailInput = document.getElementById("email")
let passwordInput = document.getElementById("password")
let submitButton = document.getElementById("submit")
let form = document.getElementById("login")
// prevent behavior of the form
form.addEventListener("submit", (e) => {
    e.preventDefault()
})



const addUSer = async () => {

    if (emailValidate(emailInput.value) && passwordValidate(passwordInput.value)) {

        let loginInputsValue = {
            email: emailInput.value,
            password: passwordInput.value,
        }
        let response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInputsValue),
        })
        const data = await response.json();

        if (data.message === "success") {


            setTimeout(() => { window.location.pathname = 'shoppingCart/src/home.html' }, 1500)
            document.getElementById("notRegistered").classList.add("hidden")
            localStorage.setItem('token', JSON.stringify(data.token))
        } else {
            document.getElementById("notRegistered").classList.remove("hidden")

        }
    }

}
// on submitting 
submitButton.addEventListener("click", () => {
    addUSer()

})
// validating while writing
emailInput.addEventListener("input", (e) => {
    emailValidate(e.target.value)
})
passwordInput.addEventListener("input", (e) => {
    passwordValidate(e.target.value)
})
// validation
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


