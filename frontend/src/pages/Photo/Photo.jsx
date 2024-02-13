import styles from './Photo.module.css';

import { uploads } from '../../utils/config';

// components
import Message from '../../components/Message/Message';
import { Link } from 'react-router-dom';
import PhotoItem from '../../components/PhotoItem/PhotoItem';

// hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhotoById, like } from '../../slices/photoSlice';
import LikeContainer from '../../components/LikeContainer/LikeContainer';

// Redux

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);

  // like and comments
  const handleLike = () => {
    dispatch(like(photo._id));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id={styles.photo}>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
    </div>
  );
};

export default Photo;
