const dogsURL = 'http://localhost:3000/dogs'

const getDogs = () =>
  fetch(dogsURL)
    .then(resp => resp.json())

const updateDog = dog =>
  fetch(`${dogsURL}/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dog)
  })

const postNewDog = dog =>
  fetch(dogsURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dog)
  })

const deleteDog = dog => {
  fetch(`${dogsURL}/${dog.id}`, {
    method: 'DELETE'
  })
}
