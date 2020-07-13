import React, {Component} from 'react';

import {AutoComplete, Input, message} from "antd";

import { Route } from "react-router-dom";

import TrackingPage from "./TrackingPage";

function onSelect(value) {
    console.log('onSelect', value);
}

class Tracking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderToTrack: undefined,
            firstSearch: true,
        };
        this.pageRef = React.createRef();
    }

    resetFirstSearch = () => {
        this.setState({
            firstSearch: true,
        });
    }

    handleSearch = value => {
        const { match } = this.props;
        const { firstSearch } = this.state;
        if (value === "") {
            message.warning({
                content: 'Please enter your order number!',
                className: 'tracking-warning',
                style: {
                    fontSize: "large"
                },
            });
            return;
        }
        console.log('props of trakcing -->', this.props);
        this.props.history.push(match.url + '/' + value);
        console.log(this.state.firstSearch);
        if(!firstSearch){
            this.pageRef.current.resetTrackingStates();
        }
        this.setState({
            firstSearch: false,
        })
    };


    render() {
        const { Search } = Input;
        const { match } = this.props;
        console.log('props of Tracking -->', this.props);
        console.log('match of Tracking -->', match);
        return (
            <div>
                <div className="tracking-search-wrapper">
                    <AutoComplete
                        className="tracking-search"
                        size="large"
                        style={{ width: '100%' }}
                        onSelect={onSelect}
                        placeholder="Your order number"
                        optionLabelProp="text"
                    >
                        <Search
                            onSearch={value => this.handleSearch(value)}
                        />
                    </AutoComplete>
                </div>
                <Route path={`${match.url}/:number`} render={({match}) => {
                    return <TrackingPage
                        match={match}
                        ref={this.pageRef}
                        resetFirstSearch={this.resetFirstSearch}
                    />;
                }}/>
            </div>
        );
    }
}

export default Tracking;