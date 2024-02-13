// styles
import styles from './Home.module.css';

// components
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import { Link } from 'react-router-dom';

// hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useResetComponentMessage } from '../../hooks/useResetComponents';

/// redux
import { getAllPhotos, like } from '../../slices/photoSlice';

const Home = () => {
  const navigate = useNavigate();

  // check if user is auth
  useEffect(() => {
    let userAuth = localStorage.getItem('user');
    if (userAuth) {
      return;
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  const handleLike = (photo = null) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div id={styles.home}>
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
          Ainda não há fotos publicadas,{' '}
          <Link to={`/users/${user._id}`}>Clique Aqui</Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
