import "./style.css"
import { useNavigate } from 'react-router-dom';
const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();
    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        };
        navigate('/chat', { replace: true });
    };
    return (
        <div className="container">
            <div className="formContainer">
                <h1>{`<>DevRooms</>`}</h1>
                <input className="input" placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <select className="input"
                    onChange={(e) => setRoom(e.target.value)}
                >
                    <option>-- Select Room --</option>
                    <option value='Javascript'>JavaScript</option>
                    <option value='Node'>Node</option>
                    <option value='Express'>Express</option>
                    <option value='Eeact'>React</option>

                </select>
                <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinRoom} >Join Room</button>
            </div>
        </div >
    );
};

export default Home;