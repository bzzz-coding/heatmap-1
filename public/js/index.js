const buttons = document.querySelectorAll(".btn")
buttons.forEach(button => button.addEventListener("click", ()=> {
  console.log('clicked')
  button.classList.add('clicked-btn')
}))