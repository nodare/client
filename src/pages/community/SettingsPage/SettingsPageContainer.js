import { SettingsPageComponent } from './SettingsPage'
import { connect } from 'react-redux'

import { getCommunityData, updateCommunity, updateCommunityFiles, clearCommunityData } from "util/redux/actions/community.actions";

const mapStateToProps = (state) => ({
    community: state.community.item,
})

const mapDispatchToProps = {
    getCommunityData,
    updateCommunity,
    updateCommunityFiles, 
    clearCommunityData
}

export const SettingsPageContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsPageComponent)