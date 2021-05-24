import {connect} from 'react-redux';
import Navbar2 from '../Components/Navbar2';
import {setuser,unsetuser,setProfile,setAnimation,setCart,setRequests} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
    setProfile:data=> dispatch(setProfile(data)),
    setAnimation: data => dispatch(setAnimation(data)),
    setCart: data => dispatch(setCart(data)),
    setRequests: data => dispatch(setRequests(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Navbar2);
