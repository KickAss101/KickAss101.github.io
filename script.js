const screenPosition = window.innerHeight / 1.5
const animateText = document.querySelector("#animate")
let i = 0

window.addEventListener("scroll", () => {
    const code = document.querySelector(".code")
    appear(".greeting", 1, 0)
    appear(".code", 1, .2)
    code.addEventListener("transitionend", typeWriter)
    animateText.addEventListener("animationend", () =>  appear(".echo", 0, 0))
},)

function appear(ele, speed, delay){
    const item = document.querySelector(ele)
    const itemPosition = item.getBoundingClientRect().top
    if(itemPosition < screenPosition){
        item.style.transition = `${speed}s ${delay}s all ease-in-out`
        item.classList.add("appear")
    }
}

function typeWriter(){
    let text = `echo "I'm a web developer, this is just a showcase of my projects."`
    if(i < text.length){
        animateText.innerHTML += text.charAt(i)
        i++
    }
    setInterval(typeWriter, 150)
}