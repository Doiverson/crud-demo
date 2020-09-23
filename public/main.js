/* eslint-env browser */
// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelectorAll('.delete-button')
const editButton = document.querySelectorAll('.edit-button')
const messageDiv = document.querySelector('#message')

const editInput = document.querySelector('.edit-input')

let input;


editInput.addEventListener('change', e => {
  input = e.target.value;
})

editButton.forEach(item => {
  item.addEventListener('click', e => {
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.value,
        quote: input
      })
    })
        .then(res => {
          if (res.ok) return res.json()
        })
        .then(response => {
          window.location.reload(true)
        })
  })
})

// update.addEventListener('click', _ => {
//   fetch('/quotes', {
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: 'a',
//       quote: 'I find your lack of faith disturbing.'
//     })
//   })
//     .then(res => {
//       if (res.ok) return res.json()
//     })
//     .then(response => {
//       window.location.reload(true)
//     })
// })

deleteButton.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.value
      })
    })
        .then(res => {
          if (res.ok) return res.json()
        })
        .then(response => {
          if (response === 'No quote to delete') {
            messageDiv.textContent = 'No Darth Vadar quote to delete'
          } else {
            window.location.reload(true)
          }
        })
        .catch(console.error)
  })
})
