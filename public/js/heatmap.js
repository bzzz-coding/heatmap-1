// defining dates
let today = new Date()
const year = today.getFullYear();
let month = today.getMonth() + 1;
const monthName = today.toLocaleString('default', { month: 'long' })
let day = today.getDate();

if (day < 10) {
  day = '0' + day;
}

if (month < 10) {
  month = '0' + month;
}

let todayFormatted = `${year}-${month}-${day}`


const dayBox = document.querySelectorAll('.dayBox')
// const close = document.querySelector('#close')



// Bubble: mouse over to show bubble
// When you mouse over each box,
Array.from(dayBox).forEach(box => box.addEventListener('mouseover', () => {
  // define the date from the box's id ('date_' + YYYY-MM-DD)
  let idDate = box.id.slice(5)
  // define the bubble and pointer elements
  let dayBoxBubble = document.querySelectorAll(`.bubble_${idDate}`)
  // add class 'show' to both bubble and pointer elements
  dayBoxBubble.forEach(bubble => bubble.classList.add('show'))
}))

// Bubble: mouse out to hide bubble
dayBox.forEach(box => box.addEventListener('mouseout', () => {
  // define the date from the box's id ('date_' + YYYY-MM-DD)
  let idDate = box.id.slice(5)
  // define the bubble and pointer elements
  let dayBoxBubble = document.querySelectorAll(`.bubble_${idDate}`)
  let dateErrorBubble = document.querySelector(`.error_${idDate}`)
  // remove class 'show' to hide both bubble and pointer elements
  dayBoxBubble.forEach(bubble => bubble.classList.remove('show'))
  dateErrorBubble.classList.remove('show')
}))


const buttons = document.querySelectorAll(".btn")
Array.from(buttons).forEach(button => button.addEventListener("click", ()=> {
  console.log('clicked')
  button.classList.add('clicked-btn')
}))


