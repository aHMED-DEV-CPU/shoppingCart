'use strict'
//preventing going to products without login
window.onload = function () {
    if (!JSON.parse(localStorage.getItem('token'))) {
        window.location.pathname = 'shoppingCart/index.html'
    }
}
//display products
const productsContainer = document.getElementById("allProducts");


(async function displayProducts() {
    var container = ""
    const respond = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
        method: "GET"
    })
    const data = await respond.json()
    data.data.map((product) => {
        container += `                <div class=" p-4 lg:w-1/4 md:w-1/3 w-full sm:w-1/2 ">
                    <div
                        class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-green-500">
                        <div >
                            <img class="rounded-t-lg" src="${product.imageCover}" alt="" />
                        </div>
                        <div class="p-5">

                                <h3 class=" text-green-600">${product.category.name}</h3>

                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${product.title.split(" ").splice(0, 7).join(" ")}</p>
                            <div class=" flex justify-between my-4"><span>${product.price}EGP</span><span>${product.ratingsAverage} <i class="fa-solid fa-star text-yellow-300"></i></span></div>
                            <button 
                            onclick=addToCart("${product._id}")
                                class="  w-full px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>`
    })
    productsContainer.innerHTML = container
})()
// logout
const logout = document.getElementById("logout")
logout.addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "shoppingCart/index.html"


})
// add to cart
async function addToCart(productId) {
    ShowingMsg(`product added`,)
    let respond = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem("token"))
        },
        body: JSON.stringify({ productId })
    })
    let data = await respond.json()

    if (data.status = 'success') {

        customAlert.classList.add("hidden")
    }


}
// switch between products and cart 
const productsPage = document.getElementById("productsPage")
const cartPage = document.getElementById("cartPage")
const cartButton = document.getElementById("cart1")
const homeButton = document.getElementById("Home")

cartButton.addEventListener("click", () => {
    cartPage.classList.remove("hidden")
    productsPage.classList.add("hidden")
    cartButton.classList.add("text-green-700")
    homeButton.classList.remove("text-green-700")
    showingCart()
})
homeButton.addEventListener("click", () => {
    cartPage.classList.add("hidden")
    productsPage.classList.remove("hidden")
    cartButton.classList.remove("text-green-700")
    homeButton.classList.add("text-green-700")
})
// showing cart 
const productDetails = document.getElementById("productDetails")
async function showingCart() {
    const respond = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem("token"))
        }
    })
    const data = await respond.json()
    console.log(data.numOfCartItems);
    if (data.numOfCartItems === 0) {
        productDetails.innerHTML = '<h1 class="text-red-600 text-center   text-4xl">Your cart is Empty</h1>'
    } else {

        var container = ''
        data?.data?.products.map((product) => {
            container += `<div class=" flex  items-center border-b">
                            <div class="p-4 w1/6">
                                <img src="${product.product.imageCover}" class="w-16 md:w-32 max-w-full max-h-full" >
                            </div>
                            <div class="bg-white  flex justify-between   flex-1 ">

                                <div>
                                    <div class=" text-green-400">${product.product.title.split(" ").splice(0, 3).join(" ")}</div>
                                    <div class=" my-4">${product.price}EGP</div>
                                    <button href="#" onclick=removeFromCart("${product.product.id}")
                                        class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                </div>

                                <div class="px-6 py-4">
                                    <div class="flex items-center">

                                        <div class="ms-3" id="itemCount">Number of items :${product.count}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>`

        })

        productDetails.innerHTML = container;

    }
    document.getElementById("totalPrice").innerHTML = data?.data.totalCartPrice
}

// alert
let customAlert = document.createElement("div");
function ShowingMsg(msg) {
    let alertBox = document.getElementById("alertBox")

    customAlert.classList.add("customAlert")
    customAlert.classList.remove("hidden")

    customAlert.innerHTML = `        <h5 class=" px-2 py-2 ">${msg}</h5>
        `
    alertBox.appendChild(customAlert)
    customAlert

}
//remove from cart
async function removeFromCart(id) {
    ShowingMsg("product removed")
    let respond = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem("token"))
        }
    })
    let data = await respond.json()
    if (data.status = 'success') {

        customAlert.classList.add("hidden")
    }
    showingCart()

}
