import {connect} from 'react-redux';
import Section from '../Pages/Section';
import {setuser,unsetuser,setProfile,setCart,setRequests} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
    setProfile:data=> dispatch(setProfile(data)),
    setCart: data => dispatch(setCart(data)),
    setRequests: data => dispatch(setRequests(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Section);
