import {SETUSER,UNSETUSER,PROFILE,CENTRAL,NOTIFICATION,ANIMATION,CART,REQUESTS,ADMIN,ACTIVEUSERS} from '../constants';

const initialState = {
    user:'',
    _id:'',
    token:'',
    profile:false,
    cart:false,
    request:false,
    name:'',
    email:'',
    count:'',
    class:'',
    socket:null,
    socket_data:[],
    animate:true,
    admin_d:[],
    active_users:[]
}

export default function master_user(state=initialState,action) {
    
    switch(action.type){
        
        case SETUSER:
            
            return{
                ...state,
                user:action.data.name,
                token:action.data.init_token,
                _id: action.data._id
            }

        case UNSETUSER:
            return{
                ...state,
                user:'',
                token:'',
                
            }
        
        case PROFILE:
            
            return{
                ...state,
                profile:action.data
            } 
        
        case CENTRAL:
            return{
                ...state,
                name:action.data.name,
                email:action.data.email,
                count:action.data.count,
                class:action.data.class
            }

        case NOTIFICATION:
            return{
                ...state,
                socket:action.data.socket
            }

        case ANIMATION:
            return{
                ...state,
                animate:action.data
            }

        case CART:
            return{
                ...state,
                cart:action.data
            }
        
        case REQUESTS:
            return{
                ...state,
                request:action.data
            }

        case ADMIN:
            return{
                ...state,
                admin_d:action.data
            }

        case ACTIVEUSERS:
            return{
                ...state,
                active_users:action.data
            }

        default:
            return state
    }
}