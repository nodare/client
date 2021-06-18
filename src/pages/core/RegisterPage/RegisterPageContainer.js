import { RegisterPageComponent } from './RegisterPage'
import { connect } from 'react-redux'

import { registerUser } from "util/redux/actions/auth.actions";

const mapDispatchToProps = {
    registerUser
}

export const RegisterPageContainer = connect(null, mapDispatchToProps)(RegisterPageComponent)