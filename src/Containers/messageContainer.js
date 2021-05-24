import {connect} from 'react-redux';
import Message from '../Messenger/Components/messenger';
import {setuser,unsetuser,setNotifications} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
    setNotifications: data => dispatch(setNotifications(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Message);
