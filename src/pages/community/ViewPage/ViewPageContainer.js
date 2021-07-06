import { ViewPageComponent } from './ViewPage'
import { connect } from 'react-redux'

import { getCommunityData, createCommunityCategory, getCommunityCategories, getCommunityCategoryData, getCommunityFollowers, followCommunity, clearCommunityData, clearCategoryItems, clearCategoryData, clearFollow} from "util/redux/actions/community.actions";
import { getCommunityPosts, getCommunityPostsByCategory, clearPosts } from "util/redux/actions/posts.actions";

const mapStateToProps = state => ({
    community: state.community.item,
    followers: state.community.followers,
    categories: state.community.categoryItems,
    posts: state.posts.items
})

const mapDispatchToProps = {
    getCommunityData,
    getCommunityPosts,
    getCommunityPostsByCategory,
    createCommunityCategory, 
    getCommunityCategories, 
    getCommunityCategoryData, 
    getCommunityFollowers, 
    followCommunity, 
    clearCommunityData,
    clearPosts,
    clearFollow,
    clearCategoryItems, 
    clearCategoryData
}

export const ViewPageContainer = connect(mapStateToProps, mapDispatchToProps)(ViewPageComponent)