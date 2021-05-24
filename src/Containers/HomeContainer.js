import {connect} from 'react-redux';
import Home from '../Pages/Home';
import {setuser,unsetuser} from '../Service/actions/actions';

const mapStateToProps = state=>({
    main:state
})

const mapDispatchToProps = dispatch=>({
    setuser: data => dispatch(setuser(data)),
    unsetuser: data => dispatch(unsetuser(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
