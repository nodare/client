import { ViewPostPage } from './ViewPostPage'
import { connect } from 'react-redux'

import { getCommunityData, clearCommunityData} from "util/redux/actions/community.actions";
import { getPostData, getPostContents, removeContentsByPost, removePost, clearPost, clearContents } from "util/redux/actions/posts.actions";
import { getPostComments, addPostComment, removePostComment, addCommentReply, clearComments } from "util/redux/actions/comments.actions";
import { verifyPostUpvote, togglePostUpvote } from "util/redux/actions/upvotes.actions";

const mapStateToProps = state => ({
    communityData: state.community.item,
    postData: state.posts.item,
    contents: state.posts.contents,
    comments: state.comments.items,
    postUpvoteData: state.upvotes.postUpvoteItem
})

const mapDispatchToProps = {
    verifyPostUpvote,
    togglePostUpvote,
    getCommunityData,
    getPostData,
    removePost,
    getPostContents,
    getPostComments,
    addPostComment,
    removePostComment,
    removeContentsByPost,
    clearCommunityData,
    clearPost,
    clearContents,
    clearComments
}

export const ViewPostPageContainer = connect(mapStateToProps, mapDispatchToProps)(ViewPostPage)