import SocketIO from 'socket.io-client';
const uri = 'http://localhost:5000';
const socket = SocketIO(uri,{
    withCredentials: true,
});

export default socket;