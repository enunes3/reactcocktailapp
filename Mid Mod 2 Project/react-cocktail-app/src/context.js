import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
/*creates a Context object*/
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  /*loading state value*/
  const [loading, setLoading] = useState(true);
  
  /*whatever the user types in the input, it will search for the specific drink*/
  /*put the value as 'a' because drinks will already load as the user is inputting a value */
  const [searchTerm, setSearchTerm] =useState('a');
  const [cocktails, setCocktails] = useState([]);
  
  /*every time a user types in the input, it'll be fetching the drink and setLoading will run as well*/
  const fetchDrinks = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      const {drinks} = data;
      if(drinks){
        const newCocktail = drinks.map((item) =>{
          const {
            idDrink, 
            strDrink, 
            strDrinkThumb, 
            strAlcoholic, 
            strGlass
          } = item;
          return {
            id:idDrink, 
            name:strDrink,
            image:strDrinkThumb, 
            info:strAlcoholic, 
            glass:strGlass}
        })
        setCocktails(newCocktail)
      }
      else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(()=> {
fetchDrinks()
  },[searchTerm, fetchDrinks])

  /*provider component accepts a value prop to be passed to consuming components that are descendants of this Provider.*/
  return <AppContext.Provider value={{
    loading,  
    cocktails,
    setSearchTerm,
  }}
  >
    {children}
    </AppContext.Provider>
}
// make sure use
/* Rendering SearchForm && CocktailList and grab those values through GlobalContext and then pass the AppContext so in both components you can access the values*/
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
