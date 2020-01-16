const screenPosition = window.innerHeight / 1.5
const text = document.querySelector("#animate")
let i = 0

window.addEventListener("scroll", () => {
    appear(".greeting", 1, 0)
    appear(".code", 1, .2)
    appear(".echo", 0, 10)
    if(text.getBoundingClientRect().top < screenPosition){
        setTimeout(() => setInterval(typeWriter, 100, "#animate"), 2500)
    }
},)

function appear(ele, speed, delay){
    const item = document.querySelector(ele)
    const itemPosition = item.getBoundingClientRect().top
    if(itemPosition < screenPosition){
        item.style.transition = `${speed}s ${delay}s all ease-in-out`
        item.classList.add("appear")
    }
}

function typeWriter(selector){
    let text = `echo "I'm a web developer, this is just a showcase of my projects."`
    let ele = document.querySelector(selector)
    if(i < text.length){
        ele.innerHTML += text.charAt(i)
        i++
    }
}