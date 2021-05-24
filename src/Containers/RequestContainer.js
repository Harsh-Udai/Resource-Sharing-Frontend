import {connect} from 'react-redux';
import Request from '../Pages/Requests';
import {setuser,unsetuser,setProfile,setCentral} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
    setProfile:data=> dispatch(setProfile(data)),
    setCentral: data=> dispatch(setCentral(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Request);
