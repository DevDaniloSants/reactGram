import styles from './Profile.module.css';

// components
import Message from '../../components/Message/Message';
import { Link } from 'react-router-dom';

// utils
import { uploads } from '../../utils/config';

// hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/userSlice';

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  // photo

  // loading user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.profile}>
      <dir className={styles.profile_header}>
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className={styles.profile_description}>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </dir>
    </div>
  );
};

export default Profile;
