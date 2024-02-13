import styles from './Photo.module.css';

import { uploads } from '../../utils/config';
import { Link } from 'react-router-dom';

// components
import Message from '../../components/Message/Message';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import LikeContainer from '../../components/LikeContainer/LikeContainer';

// hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhotoById, like, comment } from '../../slices/photoSlice';
import { useResetComponentMessage } from '../../hooks/useResetComponents';

// Redux

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  const [commentText, setCommentText] = useState('');

  // load photo data
  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);

  // insert like
  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  // insert a comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText('');

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id={styles.photo}>
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className={styles.message_container}>
        {error && <Message msg={error} type={'error'} />}
        {message && <Message msg={message} type={'success'} />}
      </div>
      <div className={styles.comments}>
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário..."
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ''}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment) => (
              <div className={styles.comment} key={comment.comment}>
                <div className={styles.author}>
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.username}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    {comment.username}
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
