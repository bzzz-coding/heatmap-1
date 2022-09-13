
const svg = document.querySelector("svg");
const pwInput = document.querySelector(".pw-input");
svg.addEventListener("click", function () {
	this.classList.toggle("close");
	setTimeout(() => {
		pwInput.type = pwInput.type === "password" ? "text" : "password";
	}, 125);
});
