import SocketIO from 'socket.io-client';
const uri = 'https://rsp-backend.herokuapp.com/';
const socket = SocketIO(uri,{
    withCredentials: true,
});

export default socket;