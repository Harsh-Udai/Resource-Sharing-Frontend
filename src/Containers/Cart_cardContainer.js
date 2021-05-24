import {connect} from 'react-redux';
import Card from '../Components/Cart_card';
import {setuser,unsetuser,setProfile} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data)),
    setProfile:data=> dispatch(setProfile(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Card);
