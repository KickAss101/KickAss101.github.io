window.addEventListener("scroll", appearOnScroll)

function appearOnScroll(){
    let greeting = document.querySelector(".greeting")
    let greetingPosition = greeting.getBoundingClientRect().top
    let screenPosition = window.innerHeight / 1.3
    if(greetingPosition < screenPosition)
        greeting.classList.add("appear")
}