import React from 'react';
import { Input } from 'antd'; // Importing Ant Design Input
import { SearchOutlined } from '@ant-design/icons'; // Search icon from Ant Design

const SearchBar = ({ filterText, handleSearchChange }) => {
    return (
        <Input
            addonAfter={<SearchOutlined />}
            placeholder="Search by Entry No or Item Name"
            value={filterText}
            onChange={handleSearchChange}
            style={{ backgroundColor: 'white' }}
            allowClear
            size='large'
            enterButton="Search"
        />
    );
};

export default SearchBar;
