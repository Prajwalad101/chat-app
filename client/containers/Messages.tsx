import { useRef } from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context';

function MessagesContainer() {
  const { socket, roomId, username, messages, setMessages } = useSockets();

  const newMessageRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    const message = newMessageRef.current?.value;

    if (!String(message).trim() || !message || !username || !roomId) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        userName: 'You',
        message,
        time: `${date.getHours()}: ${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = '';
  };

  if (!roomId) {
    return <div />;
  }

  return (
    <div>
      {messages?.map(({ message }, index) => (
        <p key={index}>{message}</p>
      ))}
      <div>
        <textarea
          rows={1}
          placeholder="Tell us what you are thinking"
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
