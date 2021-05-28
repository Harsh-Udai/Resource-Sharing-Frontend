import {connect} from 'react-redux';
import Dashboard from '../Pages/Dashboard';
import {setuser,unsetuser,setCentral,setAnimation,setNotifications,setActive} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
     setCentral: data=> dispatch(setCentral(data)),
     setAnimation: data => dispatch(setAnimation(data)),
     setNotifications: data => dispatch(setNotifications(data)),
     setActive: data => dispatch(setActive(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
