import React from 'react'
import { useGlobalContext } from '../context'

/* looking for the function setSearchTerm so every time we type, we will invoke the function and pass in the value from the form*/
const SearchForm = () => {
  const {setSearchTerm} = useGlobalContext()
  const searchValue = React.useRef('');

React.useEffect(()=>{
  searchValue.current.focus()
},[])

const searchCocktail = () => {
  setSearchTerm(searchValue.current.value)
}

const handleSubmit = (e) => {
  e.preventDefault()
}

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input type="text" id="name" ref={searchValue} onChange={searchCocktail}/>
        </div>
      </form>
    </section>
  )
}

export default SearchForm