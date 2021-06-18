import { HomePage } from './HomePage'
import { connect } from 'react-redux'

import { getAllCommunities, clearCommunityItems } from "util/redux/actions/community.actions";

const mapStateToProps = state => ({
    communities: state.community.items
})

const mapDispatchToProps = {
    getAllCommunities,
    clearCommunityItems
}

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)