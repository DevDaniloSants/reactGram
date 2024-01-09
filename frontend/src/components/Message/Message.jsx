import styles from './Message.module.css';

const Message = ({ msg, type }) => {
  let messageTypeClass = '';

  if (type === 'error') {
    messageTypeClass = styles.error;
  } else if (type === 'success') {
    messageTypeClass = styles.success;
  }

  return (
    <div className={`${styles.message} ${messageTypeClass}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
