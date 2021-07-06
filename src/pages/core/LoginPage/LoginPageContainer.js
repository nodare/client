import { LoginPageComponent } from './LoginPage'
import { connect } from 'react-redux'
import  { loginUser, testIsAuth, clearToken } from "util/redux/actions/auth.actions";

const mapStateToProps = state => ({
    userDetails: state.auth.userDetails,
    token: state.auth.token
})

const mapDispatchToProps = {
    loginUser,
    testIsAuth,
    clearToken
}

export const LoginPageContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent)