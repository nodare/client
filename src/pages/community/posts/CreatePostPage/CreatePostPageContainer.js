import { CreatePostPage } from './CreatePostPage'
import { connect } from 'react-redux'

// import { fetchUsersCommunities, createNewPost, addNewPostContents } from "./../../../services/community.service";
import { getUsersCommunities, getCommunityCategories,clearCommunityItems, clearCategoryItems,getCommunityData,clearCommunityData,clearFollow} from "util/redux/actions/community.actions";
import { addNewPost, addNewPostContents,clearPosts } from "util/redux/actions/posts.actions";

const mapStateToProps = state => ({
    communities: state.community.items,
    categories: state.community.categoryItems,
})

const mapDispatchToProps = {
    getUsersCommunities,
    getCommunityData,
    getCommunityCategories,
    addNewPost,
    addNewPostContents,
    clearCommunityItems, 
    clearCategoryItems,
    clearCommunityData,
    clearPosts,
    clearFollow
}

export const CreatePostPageContainer =  connect(mapStateToProps, mapDispatchToProps)( CreatePostPage)