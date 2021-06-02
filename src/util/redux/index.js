import { combineReducers } from "redux";
import ui from "./reducers/ui.reducers.js";
import community from './reducers/community.reducers.js'
import posts from "./reducers/posts.reducers.js";
import comments from "./reducers/comments.reducers.js";
import upvotes from "./reducers/upvotes.reducers.js";
import auth from "./reducers/auth.reducers";
import messages from "./reducers/messages.reducers";
import users from "./reducers/users.reducers";

export default combineReducers({
    ui: ui,
    community: community,
    posts: posts,
    comments: comments,
    upvotes: upvotes,
    auth: auth,
    messages: messages,
    users: users
})