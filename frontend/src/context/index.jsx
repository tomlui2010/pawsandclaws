import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [userListData, setUserListData] = useState([]);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [pokesList, setPokesList] = useState([])
  

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `http://localhost/pet/by_name?search=${searchParam}`
      );

      if (res.ok) {
        const data = await res.json();
        console.log('response is: ' ,data)
      
        if (data?.data?.pets) {
          setUserListData(data?.data?.pets);
          setLoading(false);
          setSearchParam("");
          navigate('/search')
        }
      }
      else { 
        console.log(searchParam + " not found.");
        setLoading(false);
        setSearchParam("");
      }


    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToPokes(getCurrentItem){
    console.log('getCurrentItem : ', getCurrentItem);
    let cpyPokesList = [...pokesList];
    console.log('getCurrentItem.id :', getCurrentItem.id);
    const index = cpyPokesList.findIndex(item => item.id === getCurrentItem.id)
    console.log('index: ' ,index)

    if(index === -1) {
      cpyPokesList.push(getCurrentItem)
    } else {
      cpyPokesList.splice(index)
    }

    setPokesList(cpyPokesList)
  }

  console.log(pokesList, 'pokesList');

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        setSearchParam,
        handleSubmit,
        userDetailsData,
        setUserDetailsData,
        handleAddToPokes,
        pokesList,
        userListData,
        setUserListData,
        setLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
