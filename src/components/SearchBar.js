import React, {Component} from 'react';
import { Icon, Input, AutoComplete, Button } from 'antd';
const { Search } = Input;

function onSelect(value) {
    console.log('onSelect', value);
}

class SearchBar extends Component {

    handleSearch = value => {
        console.log('search', value);
    };

    render() {
        return (
            <div className="tracking-search-wrapper" style={{width: 300}}>
                <AutoComplete
                    className="tracking-search"
                    size="large"
                    style={{ width: '100%' }}
                    onSelect={onSelect}
                    onSearch={this.handleSearch}
                    placeholder="Your tracking number"
                    optionLabelProp="text"
                >
                    <Search
                        onSearch={value => console.log(value)}
                    />
                </AutoComplete>
            </div>
        );
    }
}

export default SearchBar;