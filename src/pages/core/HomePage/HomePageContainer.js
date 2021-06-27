import { HomePage } from './HomePage'
import { connect } from 'react-redux'

import { getAllCommunities, getUsersFollowers, clearCommunityItems, clearFollow } from "util/redux/actions/community.actions";

const mapStateToProps = state => ({
    communities: state.community.items,
    followers: state.community.followers

})

const mapDispatchToProps = {
    getAllCommunities,
    getUsersFollowers,
    clearCommunityItems,
    clearFollow
}

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)