const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]
// osoite http://localhost:3001/
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// GET reitti http://localhost:3001/info
app.get('/info', (request, response) => {
    const personCount = persons.length
    const currentTime = new Date()

    response.send(`
        <p> Phonebook has info for ${personCount} people</p>
        <p>${currentTime}</p>
    `)
})

// osoite http://localhost:3001/api/persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  // Jos poisto onnistuu eli poistettava muistiinpano on olemassa, vastataan
  // statuskoodilla 204 no content sillä mukaan ei lähetetä mitään dataa
  // ELI:
  // palvelin on käsitellyt pyynnön onnistuneesti, mutta se ei palauta
  // vastauksessa mitään sisältöä
  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    // 404 statuskoodi, kun id:tä ei löydy
    response.status(404).end()
  }
})


const generateId = () => {
  const maxId = 1000000000
  return String(Math.floor(Math.random() * maxId))
}


app.post('/api/persons', (request, response) => {
  const body = request.body

  // puuttuuko nimi tai nro?
  if (!body.name || !body.number) {

    // tässä nyt 400 statuskoodi, koska virhe (bad request)
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  // tarkistetaan, onko nimi jo olemassa
  const nameExists = persons.some(person => person.name === body.name)

  if (nameExists){
    return response.status(400).json({
        error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  // statuskoodi 201 created
  response.status(201).json(person)
})

morgan.token('body', (request) => {
    return JSON.stringify(request.body)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
