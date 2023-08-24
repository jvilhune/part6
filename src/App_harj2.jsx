import { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'


const refresh = () => {
  window.location.reload(true)
  //console.log('testparam', testparam)
}

const PhoneBook = ( {persons, filterval, butfunction} ) => {
  let a=0
  let tempArr = [];
  /* const result = persons.map(person => person.number) */
  /* const result = persons.find(person => person.id === 4) */
  /* const result = persons.filter(person => person.id === 4) */

  console.log('PhoneBook executed')
  /* console.log('result =', result) */
  /* console.log('persons =', persons) */
  /* This is comment in Javascript */

  if(filterval.charAt(1) === "" || filterval.charAt(0) !== "|") {
    tempArr = persons
  }
  else
  {
    for(a=0;a<persons.length;a++) {
      if(persons[a].name.charAt(0).toUpperCase() === filterval.charAt(1) || persons[a].name.charAt(0).toLowerCase() === filterval.charAt(1) && filterval.charAt(0) === "|") {
        tempArr = [...tempArr, persons[a]];
      }
    }    
  }
  return (
    <div>
      {tempArr.map(person => <Person key={person.id} person={person} butfunction={butfunction} />)} 
      {/* This is comment in JSX */} 
    </div>
  )
}

const PersonForm = ( {subaction, fieldname1, value1, value2, fieldname2, value3, value4, type, text} ) => {
    return (
      <div>
        <form onSubmit={subaction}>
        {fieldname1}<input value={value1} onChange={value2} />
        <br />
        {fieldname2}<input value={value3} onChange={value4} />
        <br />
        <button type={type}>
        {text}
        </button>
        </form>
      </div>
   )
}

const Filter = ( {value1, value2} ) => {
return (
    <input type="text" value={value1} onChange={value2} />
  )
}

/*
function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}
*/

const Button = ({ handleClick, text }) => {
let param = 10
return(
  <div>
    <button onClick={handleClick(param)} >
    {text} 
    </button>
  </div>
  )
}

const Buttonpar = ({ handleClick, text }) => {
  let param = 'hello from Buttonpar'
  return (
      <button onClick={() => handleClick(param)}>
      {text}
      </button>
  )
}

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setnewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [fboxName, setfboxName] = useState('')
  const [reFresh, setreFresh] = useState(0)

  const [ counter, setCounter ] = useState(0)
  const increaseByOne = (param) => () => setCounter(param + counter + 1)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let updName = ""
    let updNumber = ""
    let updFbox = ""
    updName = personObject.name
    updNumber = personObject.number
    updFbox = fboxName

    if (persons.filter(e => e.name === updName).length > 0) {
      let text = "Press a button!\nEither OK or Cancel.";
      if (window.confirm(`${updName} is already added to phonebook. replace the old number with a new one`) == true) {
        /* Clicked OK. Replace the phone number with new one */
        const person = persons.find(n => n.name === updName)
        const changedPerson = { ...person, number: updNumber }

        console.log('person', person)
        console.log('changedPerson', changedPerson)

        personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        })

        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== changedPerson.id))
      })
      }
      else {
        /* Clicked cancel. Replace NOT the phone number with new one */
      }
    }
    else {
    /* Both the name and number was new. Add a new phone name and phone number */
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setnewName('')
        setnewNumber('')
        //setfboxName('')
      })
    }
  }

  const handleNameChange = (event) => {
    setnewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setnewNumber(event.target.value)
  }

  const handlefboxNameChange = (event) => {
    setfboxName(event.target.value)
  }

  const handledeleteClick = (personid) => {
    const person = persons.find(n => n.id === personid)

    if (window.confirm(`Delete ${person.name}?`) === true) {
      personService
      .delItem(person.id)
          .then(returnedPerson => {
          setPersons(persons.filter(n => n.id !== personid))
          console.log('personid', personid)
          //timeout(1000)
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== personid))
      })

      /*
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
          console.log(initialPersons)
        })
      */
    }
  }

  const updateDisplay = (param) => {
    setPersons([])
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log(initialPersons)
        console.log('param = ', param)
      })
  }

  return (
    <div>
      <h3>Phonebook</h3>
      <div>
        filter shown with: <Filter value1={fboxName} value2={handlefboxNameChange} />
      </div>
      <h3>add a new</h3>
        <PersonForm subaction={addPerson} fieldname1='name: ' value1={newName} value2={handleNameChange} fieldname2='number: ' value3={newNumber} value4={handleNumberChange} type={'submit'} text='add' />
      <h3>Numbers</h3>
        <PhoneBook persons={persons} filterval = {fboxName} butfunction = {handledeleteClick} />
      <h3>Refresh. Reload the page</h3>
      <button onClick={refresh}>Refresh page</button>
      <button onClick={() => refresh()}>Refresh page</button>
      <Buttonpar handleClick={updateDisplay} text='Update display' />

      <h3>Counter test</h3>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text = 'Counter test' />
    </div>
  )
}

export default App
