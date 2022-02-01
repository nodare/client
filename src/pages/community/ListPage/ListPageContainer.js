import { ListPageComponent } from './ListPage'
import { connect } from 'react-redux'

import { getUsersCommunities,getUsersBlogs, clearCommunityItems, createCommunity } from "util/redux/actions/community.actions";

const mapStateToProps = state => ({
    communityItems: state.community.items,
    blogItems:state.community.blogs
})

const mapDispatchToProps = {
    getUsersCommunities,
    getUsersBlogs,
    createCommunity,    
    clearCommunityItems,
}

export const ListPageContainer = connect(mapStateToProps, mapDispatchToProps)(ListPageComponent)