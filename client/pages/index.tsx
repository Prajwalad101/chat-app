import { useRef } from 'react';
import MessagesContainer from '../containers/Messages';
import RoomsContainer from '../containers/Rooms';
import { useSockets } from '../context/socket.context';

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleSetUsername() {
    const value = usernameRef.current?.value;
    if (!value) {
      return;
    }

    setUsername(value);

    localStorage.setItem('username', value);
  }

  return (
    <div>
      {!username && (
        <div>
          <input placeholder="Username" ref={usernameRef} />
          <button onClick={handleSetUsername}>START</button>
        </div>
      )}
      {username && (
        <>
          <RoomsContainer />
          <MessagesContainer />
        </>
      )}
    </div>
  );
}
