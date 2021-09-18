import { EditPostPage } from './CreatePostPage'
import { connect } from 'react-redux'

// import { fetchUsersCommunities, createNewPost, addNewPostContents } from "./../../../services/community.service";
import { getUsersCommunities, getCommunityCategories,clearCommunityItems, clearCategoryItems} from "util/redux/actions/community.actions";
import { addNewPost, addNewPostContents } from "util/redux/actions/posts.actions";

const mapStateToProps = state => ({
    communities: state.community.items,
    categories: state.community.categoryItems,
})

const mapDispatchToProps = {
    getUsersCommunities, 
    getCommunityCategories,
    addNewPost,
    addNewPostContents,
    clearCommunityItems, 
    clearCategoryItems
}

export const CreatePostPageContainer =  connect(mapStateToProps, mapDispatchToProps)( CreatePostPage)