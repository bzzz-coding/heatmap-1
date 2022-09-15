/* DELETING ENTRIES */
const deleteLink = document.querySelector('.delete-btn')

deleteLink.addEventListener('click', deleteEntry)

async function deleteEntry() {
  const entryId = this.dataset.id
  // successfully logs id of document to be deleted
  console.log(entryId)
  try {
    const response = await fetch('/heatmap/delete', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'idToDelete': entryId
      })
    })
    const data = await response.json()
    console.log(data)
    window.location.href = '/heatmap'
  } catch (err) {
    console.log(err)
  }
}

const buttons = document.querySelectorAll('.btn')
Array.from(buttons).forEach(button => button.addEventListener('click', () => {
  console.log('clicked')
  button.classList.add('clicked-btn')
}))