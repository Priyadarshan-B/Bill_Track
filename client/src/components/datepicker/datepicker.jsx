import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment'; // For date manipulation

const CustomDate = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    onDateSelect(dateString); 
  };

  return (
    <div>
      <DatePicker
        value={selectedDate ? moment(selectedDate) : null} // Handle moment.js conversion
        onChange={handleDateChange}
        aria-label="Select a date"
        allowClear
        bordered
        // size='large'
        format="YYYY-MM-DD" // Adjust the format as needed
        defaultValue={moment()} // Set default date to today
      />
    </div>
  );
};

export default CustomDate;
