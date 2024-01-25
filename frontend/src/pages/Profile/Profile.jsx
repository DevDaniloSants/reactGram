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

  // new form and edit form refs

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('clicou');
  };

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
      {id === userAuth._id && (
        <div className={styles.new_photo} ref={newPhotoForm}>
          <h3>Compartilhe algum momento</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título para foto</span>
              <input type="text" placeholder="Insira um título" />
            </label>
            <label>
              <span>Imagem</span>
              <input type="file" />
            </label>
            <input type="submit" value="Postar" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
