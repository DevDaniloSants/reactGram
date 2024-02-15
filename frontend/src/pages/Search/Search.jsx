import styles from './Search.module.css';

// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../../hooks/useResetComponents';
import { useQuery } from '../../hooks/useQuery';

// components
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import LikeContainer from '../../components/LikeContainer/LikeContainer';

import { Link, useNavigate } from 'react-router-dom';

import { searchPhotos, like } from '../../slices/photoSlice';

const Search = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const search = query.get('q');

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  // get photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  // check if user is auth
  useEffect(() => {
    let userAuth = localStorage.getItem('user');
    if (userAuth) {
      return;
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLike = (photo = null) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div id={styles.search}>
      <h2>Você está buscando por: {search}</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className={`${styles.btn} btn`} to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <h2 className={styles.no_photos}>
          Não foram encontrados resultados para sua busca...
        </h2>
      )}
    </div>
  );
};

export default Search;
