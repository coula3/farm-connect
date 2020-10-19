import React from 'react';
import { connect } from 'react-redux';

class MainPage extends React.Component {
    render (){
        return (
            <div style={{width: "60%", display: "inline", float: "left"}}>
                <h3>Main Page</h3>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userId,
        userAttributes: state.userAttributes
    }
}

export default connect(mapStateToProps)(MainPage);