const screenPosition = window.innerHeight / 1.3

window.addEventListener("scroll", () => {
    appear(".greeting", 1, 0)
    appear(".code", 1.8, 0)
    appear(".echo", 0, 9)
    animateText(".line")
})

function appear(ele, speed, delay){
    const item = document.querySelector(ele)
    const itemPosition = item.getBoundingClientRect().top
    if(itemPosition < screenPosition){
        item.style.transition = `${speed}s ${delay}s all ease-in`
        item.classList.add("appear")
    }
}

function animateText(ele){
    const item = document.querySelector(ele)
    const itemPosition = item.getBoundingClientRect().top
    if(itemPosition < screenPosition){
        item.style.opacity = `${1}`
        item.classList.add("anim-typewriter")
    }
}