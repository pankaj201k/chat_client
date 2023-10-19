import styles from './style.module.css';
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);

    const messagesColumnRef = useRef(null);
    useEffect(() => {
        socket.on('receive_messages', (data) => {
            // console.log(data, "ewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
            setMessagesReceived((state) => ([...state, data]));
        });
        return () => socket.off('receive_messages');
    }, [socket]);


    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef.current.scrollHeight;
    }, [messagesRecieved]);

    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (

        <div className={styles.messagesColumn} ref={messagesColumnRef}>
            {messagesRecieved.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: "auto" }}>
                        <span className={styles.msgMeta}>{msg.message}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                        </span>
                        <span className={styles.msgMeta}>
                            {msg.username}
                        </span>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Messages;