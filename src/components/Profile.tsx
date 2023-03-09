import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHouses, selectBooks, selectCurrentProfile } from '../store/Table/selectors';


function Profile() {
  const currentProfile = useSelector(selectCurrentProfile);
  console.log("maybe")

  const [data, setData] = useState(null);
  const [showTable, setShowTable] = useState(false);

  function handleClick() {
    setShowTable(true);
  }


  useEffect(() => {
    if (currentProfile !== '') {
      fetch(currentProfile)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }
  }, [currentProfile]);


  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.house}</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{data.name}</a>
          <p className="mt-2 text-gray-500">{data.description}</p>
          <div className="mt-4">
            <a href="{data.twitter}" className="text-indigo-500 hover:text-indigo-600"><i className="fab fa-twitter"></i></a>
            <a href="{data.facebook}" className="ml-3 text-indigo-500 hover:text-indigo-600"><i className="fab fa-facebook"></i></a>
            <a href="{data.instagram}" className="ml-3 text-indigo-500 hover:text-indigo-600"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
