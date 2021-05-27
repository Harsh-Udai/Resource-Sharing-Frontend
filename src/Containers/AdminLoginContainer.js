import {connect} from 'react-redux';
import AdminLogin from '../Pages/Admin_login';
import {setuser,unsetuser,setProfile,setCentral,setAdmin} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
    setProfile:data=> dispatch(setProfile(data)),
    setCentral: data=> dispatch(setCentral(data)),
    setAdmin : data=> dispatch(setAdmin(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AdminLogin);
