import { useContext } from "react";
import UserItem from "../../components/user-item";
import { GlobalContext } from "../../context";

export default function Pokes() {
  const { pokesList } = useContext(GlobalContext);
  console.log('pokesList : ' , pokesList)

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {pokesList && pokesList.length > 0 ? (
        pokesList.map((item) => <UserItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            You currently do not have a favorite pet!.
          </p>
        </div>
      )}
    </div>
  );
}
