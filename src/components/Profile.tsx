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
    <div>
      <h1>{data.name}</h1>
      <p>Gender: {data.gender}</p>
      <p>Born: {data.born}</p>
      <p>Culture: {data.culture}</p>
      <button onClick={handleClick}>Back</button>
    </div>
  );
}

export default Profile
