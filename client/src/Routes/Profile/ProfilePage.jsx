import React from 'react';
import { useParams } from 'react-router-dom';

function ProfilePage(props) {
  const params = useParams();
  console.log(params);
  return <div></div>;
}

export default ProfilePage;
