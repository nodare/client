import { ListPageComponent } from './ListPage'
import { connect } from 'react-redux'

import { getUsersCommunities, clearCommunityItems, createCommunity } from "util/redux/actions/community.actions";

const mapStateToProps = state => ({
    communityItems: state.community.items
})

const mapDispatchToProps = {
    getUsersCommunities,
    createCommunity,    
    clearCommunityItems
}

export const ListPageContainer = connect(mapStateToProps, mapDispatchToProps)(ListPageComponent)