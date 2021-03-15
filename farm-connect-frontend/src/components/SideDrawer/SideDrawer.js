import React from 'react';
import { connect } from 'react-redux';
import SideNavBar from '../SideNavBar/SideNavBar';

import * as listingsActions from '../../actions/listingsActions';
import { fetchListingsInterests } from '../../actions/interestsActions';
import { signOutUser } from '../../actions/userActions';

import './SideDrawer.css';

const SideDrawer = (props) => {
    let assignedClasses = ["SideDrawer", "CloseSideDrawer"];

    if(props.show) {
        assignedClasses = ["SideDrawer", "OpenSideDrawer"];
    }

    return (
        <div className={assignedClasses.join(' ')} onClick={props.closeBackdrop}>
            <SideNavBar
                userId={props.userId}
                userAttributes={props.userAttributes}
                hasListingChanged={props.hasListingChanged}
                countUserInterestsListings={props.countUserInterestsListings}
                openListingsRendered={props.openListingsRendered}
                myInterestsRendered={props.myInterestsRendered}
                userConnects={props.userConnects}
                userSignOut={() => props.signOutUser()}
                fetchUserClosedListings={(userId) => props.fetchUserClosedListings(userId)}
                listingsRendered={() => props.listingsRendered()}
                listingsUnrendered={() => props.listingsUnrendered()}
                fetchListings={() => props.fetchListings()}
                fetchListingsInterests={() => props.fetchListingsInterests()}
                fetchUserInterestsListings={(userId) => props.fetchUserInterestsListings(userId)}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.currentUser.userId,
        userAttributes: state.currentUser.userAttributes,
        countUserInterestsListings: state.listings.countUserInterestsListings,
        hasListingChanged: state.listings.hasListingChanged,
        openListingsRendered: state.listings.openListingsRendered,
        myInterestsRendered: state.listings.myInterestsRendered,
        userConnects: state.connects.userConnects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOutUser: () => dispatch(signOutUser()),
        fetchUserClosedListings: (userId) => dispatch(listingsActions.fetchUserClosedListings(userId)),
        listingsRendered: () => dispatch(listingsActions.listingsRendered()),
        listingsUnrendered: () => dispatch(listingsActions.listingsUnrendered()),
        fetchListings: () => dispatch(listingsActions.fetchListings()),
        fetchListingsInterests: () => dispatch(fetchListingsInterests()),
        fetchUserInterestsListings: (id) => dispatch(listingsActions.fetchUserInterestsListings(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);