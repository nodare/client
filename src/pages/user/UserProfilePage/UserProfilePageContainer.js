import {UserProfilePage} from './UserProfilePage'
import {connect} from 'react-redux'
import {getUserDetails} from 'util/redux/actions/users.actions'
const mapStateToProps = state => ({
    userDetails:state.users.userDetails
})

const mapDispatchToProps = {
    getUserDetails
}

export const UserProfilePageContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfilePage)