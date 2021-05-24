import {connect} from 'react-redux';
import Entry from '../Pages/Entry';
import {setuser,unsetuser,setCentral,setNotifications} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
    setCentral: data=> dispatch(setCentral(data)),
    setNotifications: data => dispatch(setNotifications(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Entry);
