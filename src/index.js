document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  const nameInput = document.querySelector('input[type="name"]')
  const breedInput = document.querySelector('input[type="breed"]')
  const sexInput = document.querySelector('input[type="sex"]')

  const state = {
    dogs: [],
    selectedDog: undefined
  }

  const renderDog = dog => {
    const tableRowItem = document.createElement('tr')
    tableRowItem.classList.add('table-row')
    tableRowItem.dataset.dogId = dog.id
    tableRowItem.innerHTML = `<td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class="edit-btn" data-dog-id ="${dog.id}">Edit Dog</button></td>
    <td><button class="remove-btn" data-dog-id ="${
      dog.id
    }">Delete Dog</button></td>
    `

    tableBody.appendChild(tableRowItem)

    tableRowItem.querySelector('.edit-btn').addEventListener('click', () => {
      state.selectedDog = dog
      prefillFormValues(dog)
    })

    tableRowItem.querySelector('.remove-btn').addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete ${dog.name}?`)) {
        const tableRowItem = document.querySelector(
          `tr[data-dog-id='${dog.id}']`
        )
        tableRowItem.remove()
        deleteDog(dog)
      }
    })
  }

  const prefillFormValues = dog => {
    nameInput.value = dog.name
    breedInput.value = dog.breed
    sexInput.value = dog.sex
  }

  const renderDogs = dogs => {
    dogs.forEach(dog => renderDog(dog))
  }

  getDogs()
    .then(dogs => {
      state.dogs = [...dogs]
      renderDogs(state.dogs)
    })

  const editDog = () => {
    state.selectedDog.name = nameInput.value
    state.selectedDog.breed = breedInput.value
    state.selectedDog.sex = sexInput.value

    updateDog(state.selectedDog)
      .then(getDogs)
      .then(dogs => {
        state.dogs = [...dogs]
        tableBody.innerHTML = ''
        renderDogs(state.dogs)
      })
  }

  const newDog = () => {
    const dog = {
      name: nameInput.value,
      breed: breedInput.value,
      sex: sexInput.value
    }

    postNewDog(dog)
      .then(getDogs)
      .then(dogs => {
        state.dogs = [...dogs]
        tableBody.innerHTML = ''
        renderDogs(state.dogs)
      })
  }

  const formContainsData = () => {
    return nameInput.value.length > 0 && breedInput.value.length > 0 && sexInput.value.length > 0
  }

  dogForm.addEventListener('submit', event => {
    event.preventDefault()

    // if we've selected a dog to edit
    if (state.selectedDog !== undefined) {
      // edit that dog
      editDog()
    } else if (formContainsData()) { // if the user has filled in something anyway
      // let's take what the user has filled in and create a new dog!
      newDog()
    }

    state.selectedDog = undefined
    dogForm.reset()
  })
})
