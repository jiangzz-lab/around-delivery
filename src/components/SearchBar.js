import React, {Component} from 'react';
import { Input, AutoComplete } from 'antd';
const { Search } = Input;

function onSelect(value) {
    console.log('onSelect', value);
}

class SearchBar extends Component {

    render() {
        return (
            <div className="tracking-search-wrapper" style={{width: 300}}>
                <AutoComplete
                    className="tracking-search"
                    size="large"
                    style={{ width: '100%' }}
                    onSelect={onSelect}
                    placeholder="Your order number"
                    optionLabelProp="text"
                >
                    <Search
                        onSearch={value => this.props.handleSearch(value)}
                    />
                </AutoComplete>
            </div>
        );
    }
}

export default SearchBar;