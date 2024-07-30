import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function User() {
  const { id } = useParams();
  const {
    userDetailsData,
    setUserDetailsData,
    pokesList,
    handleAddToPokes,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getUserDetails() {
      const response = await fetch(
        `/api/pet/by_id?id=${id}`
      );
      const data = await response.json();

      console.log(data);
      if (data?.data) {
        setUserDetailsData(data?.data);
      }
    }

    getUserDetails();
  }, []);

  console.log(userDetailsData, "userDetailsData");

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={`http://localhost/uploads/${userDetailsData?.pets[0]?.profile_photo}`}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-2xl truncate text-black">
          {userDetailsData?.pets[0]?.name}
        </h3>
        <span className="text-sm text-cyan-700 font-medium">
          Breed: {userDetailsData?.pets[0]?.breed}
        </span>
        <span className="text-sm text-cyan-700 font-medium">
          Age: {userDetailsData?.pets[0]?.age}
        </span>
        <div>
          <button
            onClick={() => handleAddToPokes(userDetailsData?.pets[0])}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {pokesList && pokesList.length > 0 && pokesList.findIndex(
              (item) => item.id === userDetailsData?.pets[0]?.id
            ) !== -1
              ? "Remove from pokes"
              : "Add to pokes"}
          </button>
        </div>
      </div>
    </div>
  );
}
