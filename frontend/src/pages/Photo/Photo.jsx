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
import { getPhotoById } from '../../slices/photoSlice';

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id={styles.photo}>
      <PhotoItem photo={photo} />
    </div>
  );
};

export default Photo;
