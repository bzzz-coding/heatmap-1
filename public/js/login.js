
const svg1 = document.querySelector(".svg1")
const pwInput1 = document.querySelector(".pw-input1")
svg1.addEventListener("click", function () {
	this.classList.toggle("close")
	setTimeout(() => {
		pwInput1.type = pwInput1.type === "password" ? "text" : "password";
	}, 125)
})


const svg2 = document.querySelector(".svg2")
const pwInput2 = document.querySelector(".pw-input2")
svg2.addEventListener("click", function () {
	this.classList.toggle("close")
	setTimeout(() => {
		pwInput2.type = pwInput2.type === "password" ? "text" : "password";
	}, 125)
})

const buttons = document.querySelectorAll(".btn")
buttons.forEach(button => button.addEventListener("click", ()=> {
  console.log('clicked')
  button.classList.add('clicked-btn')
}))