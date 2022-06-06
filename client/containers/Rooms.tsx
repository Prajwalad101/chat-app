import { useRef } from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context';

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<HTMLInputElement>(null);

  function handleCreateRoom() {
    // get the room name
    const roomName = newRoomRef.current?.value || '';

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name to empty string
    if (newRoomRef.current) {
      newRoomRef.current.value = '';
    }
  }

  function handleJoinRoom(key: string) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder="Room name" />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>

      {Object.keys(rooms).map((key) => (
        <div key={key}>
          <button
            disabled={key === roomId}
            title={`Join ${rooms[key].name}`}
            onClick={() => handleJoinRoom(key)}
          >
            {rooms[key].name}
          </button>
        </div>
      ))}
    </nav>
  );
}

export default RoomsContainer;
