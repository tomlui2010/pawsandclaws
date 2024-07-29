import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link } from "react-router-dom";

export default function UserItem({ item }) {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  console.log("Item is ", item)

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get(`http://localhost/uploads/${item?.profile_photo}`, {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        setProfilePhotoUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching profile photo:', error);
      }
    };

    if (item?.profile_photo) {
      fetchProfilePhoto();
    }
  }, [item?.profile_photo]);
  return (
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img src={`http://localhost/uploads/${item?.profile_photo}`} alt="user" className="block w-full" />
      </div>
      <div>
        <h3 className="font-bold text-2xl truncate text-black">
          {item?.name}
        </h3>
        <div>
          <span className="text-sm text-cyan-700 font-medium">
            Breed : {item?.breed}
          </span>
          <br></br>
          <span className="text-sm text-cyan-700 font-medium">
            Age : {item?.age}
          </span>
        </div>

        <Link
          to={`/user-item/${item?.id}`}
          className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
        >
          User Details
        </Link>
      </div>
    </div>
  );
}
