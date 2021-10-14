import { ViewPostPage } from './ViewPostPage'
import { connect } from 'react-redux'

import { getCommunityData, clearCommunityData,getCommunityCategories} from "util/redux/actions/community.actions";
import { getPostData, getPostContents, removeContentsByPost, removePost, clearPost, clearContents,updatePost,addNewPostContents } from "util/redux/actions/posts.actions";
import { getPostComments, addPostComment, removePostComment, addCommentReply, clearComments,removePostComments } from "util/redux/actions/comments.actions";
import { verifyPostUpvote, togglePostUpvote,getPostUpvoteCount } from "util/redux/actions/upvotes.actions";

const mapStateToProps = state => ({
    communityData: state.community.item,
    postData: state.posts.item,
    contents: state.posts.contents,
    categories: state.community.categoryItems,
    comments: state.comments.items,
    postUpvoteCount:state.upvotes.postUpvoteCount,
    postUpvotedBoolean: state.upvotes.postUpvotedBoolean,
})

const mapDispatchToProps = {
    verifyPostUpvote,
    togglePostUpvote,
    getCommunityData,
    getPostUpvoteCount,
    getPostData,
    removePost,
    updatePost,
    getPostContents,
    getPostComments,
    addPostComment,
    addNewPostContents,
    removePostComment,
    removePostComments,
    removeContentsByPost,
    clearCommunityData,
    getCommunityCategories,
    clearPost,
    clearContents,
    clearComments
}

export const ViewPostPageContainer = connect(mapStateToProps, mapDispatchToProps)(ViewPostPage)