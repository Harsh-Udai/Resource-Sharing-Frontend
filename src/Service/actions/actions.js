import {SETUSER,UNSETUSER,PROFILE,CENTRAL,NOTIFICATION,ANIMATION,CART,REQUESTS,ADMIN,ACTIVEUSERS} from '../constants';

export const setuser = (data)=>{
    return{
        type:SETUSER,
        data
    }
}

export const unsetuser = (data)=>{
    return{
        type:UNSETUSER,
        data
    }
}

export const setProfile = (data)=>{
    return{
        type:PROFILE,
        data
    }
}

export const setCentral = (data)=>{
    return{
        type:CENTRAL,
        data
    }
}

export const setNotifications = (data)=>{
    return{
        type:NOTIFICATION,
        data
    }
}

export const setAnimation = (data)=>{
    return{
        type:ANIMATION,
        data
    }
}

export const setCart = (data)=>{
    return{
        type:CART,
        data
    }
}

export const setRequests = (data)=>{
    return{
        type:REQUESTS,
        data
    }
}

export const setAdmin = (data)=>{
    return{
        type:ADMIN,
        data
    }
}

export const setActive = (data)=>{
    return{
        type:ACTIVEUSERS,
        data
    }
}