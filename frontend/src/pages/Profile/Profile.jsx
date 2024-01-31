import styles from './Profile.module.css';

// components
import Message from '../../components/Message/Message';

// utils
import { uploads } from '../../utils/config';

// hooks
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, resetMessage } from '../../slices/photoSlice';

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  // new form and edit form refs

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key]),
    );

    formData.append('photo', photoFormData);

    dispatch(publishPhoto(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setImage(image);
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
              <input
                type="text"
                placeholder="Insira um título"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ''}
              />
            </label>
            <label>
              <span>Imagem</span>
              <input type="file" onChange={handleFile} />
            </label>
            {!loadingPhoto && <input type="submit" value="Postar" />}
            {loadingPhoto && (
              <input type="submit" value="Aguarde..." disabled />
            )}
            {errorPhoto && <Message msg={errorPhoto} type={'error'} />}
            {messagePhoto && <Message msg={messagePhoto} type={'success'} />}
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
