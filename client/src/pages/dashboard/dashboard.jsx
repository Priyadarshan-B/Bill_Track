// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import { DatePicker, Input } from 'antd'; // Import Ant Design Modal
import { SearchOutlined } from '@ant-design/icons';
import BillCard from '../../components/Cards/billcard';
import requestApi from '../../components/utils/axios';
import moment from 'moment';
import BillDetailsModal from '../../components/Modals/bill_modal';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [bills, setBills] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedBill, setSelectedBill] = useState(null); // Store selected bill for modal

  const formatDate = (date) => {
    return date.format('YYYY-MM-DD');
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    if (!date) return;

    try {
      const formattedDate = formatDate(date);
      const response = await requestApi("POST", '/bills', { date: formattedDate });

      if (response.data && Array.isArray(response.data.bills)) {
        setBills(response.data.bills);
      } else {
        console.error('Bills data is not in expected format');
        setBills([]);
      }
    } catch (error) {
      console.error('Error sending date:', error);
      alert('Error sending date to API.');
    }
  };

  useEffect(() => {
    const today = moment();
    setSelectedDate(today);
    handleDateSelect(today);
  }, []);

  const filteredBills = bills.filter((bill) => {
    const isEntryNoMatch = !isNaN(filterText) && bill.entry_no.toString().includes(filterText); // Match entry_no as partial match
    const isItemNameMatch = bill.item_name.toLowerCase().includes(filterText.toLowerCase()); // Match item_name as a string
    return isEntryNoMatch || isItemNameMatch;
  });

  const handleSearchChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleCardClick = (bill) => {
    setSelectedBill(bill); 
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div>
      <h1 className='font-semibold text-lg'>Select a Date</h1>

      <div className='pl-2 pb-5'>
        <DatePicker
          value={selectedDate}
          onChange={handleDateSelect}
          format="YYYY-MM-DD"
          placeholder="Select a date"
        />
      </div>

      <h4 className='font-semibold text-lg'>Bill Details</h4>

      <div className='form-field w-full md:w-1/3 px-4 mb-3 mt-1'>
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(filteredBills) && filteredBills.length > 0 ? (
          filteredBills.map((bill) => (
            <BillCard
              key={bill.id}
              imageUrl="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              title={bill.entry_no}
              subtitle={bill.item_name}
              description={`To: ${bill.department}\nBill details: ${bill.bill_details}\nShop: ${bill.shop_address}\nStaff: ${bill.staff}`}
              status={bill.entry_status}
              date={moment(bill.date_time).format('YYYY-MM-DD HH:mm:ss')}
              onPress={() => handleCardClick(bill)} 
            />
          ))
        ) : (
          <p className='w-full flex justify-center items-center'>No bills available for the selected date.</p>
        )}
      </div>

      {/* Modal component usage */}
      <BillDetailsModal
        open={modalOpen}
        bill={selectedBill}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Dashboard;
