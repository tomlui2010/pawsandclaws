import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import UserItem from "../../components/user-item";

export default function Home() {
  const { userListData, setUserListData, loading, setLoading } = useContext(GlobalContext);

  useEffect(() => {
    async function getUsers() {
      setLoading(true)
      const response = await fetch(
        `/pets`
      );
      if (response.ok) { 
        const data = await response.json();

        if (data?.data?.pets) { 
          setLoading(false)
          setUserListData(data?.data?.pets);
        }

      }
    }

    getUsers();
  }, [setUserListData, setLoading]);

  console.log(userListData, "userListData");

  if (loading) return <div>Loading...Please wait!</div>;

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {userListData && userListData.length > 0 ? (
        userListData.map((item) => <UserItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show. Please search something
          </p>
        </div>
      )}
    </div>
  );
}
