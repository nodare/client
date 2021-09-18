import { HomePage } from './HomePage'
import { connect } from 'react-redux'

import { getAllCommunities, getUsersFollowers, clearCommunityItems, clearFollow,getAllBlogs,clearBlogItems } from "util/redux/actions/community.actions";

const mapStateToProps = state => ({
    communities: state.community.items,
    followers: state.community.followers,
    blogs: state.community.blogs

})

const mapDispatchToProps = {
    getAllCommunities,
    getAllBlogs,
    getUsersFollowers,
    clearCommunityItems,
    clearBlogItems,
    clearFollow
}

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)