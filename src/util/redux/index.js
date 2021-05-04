import { combineReducers } from "redux";
import ui from "./reducers/ui.reducers.js";
import community from './reducers/community.reducers.js'
import posts from "./reducers/posts.reducers.js";
import comments from "./reducers/comments.reducers.js";

export default combineReducers({
    ui: ui,
    community: community,
    posts: posts,
    comments: comments
})