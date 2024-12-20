// src/components/BillDetailsModal.js

import React from 'react';
import { Modal, Button } from 'antd';
import moment from 'moment';

const BillDetailsModal = ({ open, bill, onClose }) => {
  return (
    <Modal
      title="Bill Details"
      open={open} // Use 'open' instead of 'visible'
      onCancel={onClose} // Use 'onCancel' instead of 'onClose'
      footer={null} // To hide default footer
    >
      {bill && (
        <>
          <p><strong>Item Name:</strong> {bill.item_name}</p>
          <p><strong>Department:</strong> {bill.department}</p>
          <p><strong>Bill Details:</strong> {bill.bill_details}</p>
          <p><strong>Shop Address:</strong> {bill.shop_address}</p>
          <p><strong>Staff:</strong> {bill.staff}</p>
          <p><strong>Date:</strong> {moment(bill.date_time).format('YYYY-MM-DD HH:mm:ss')}</p>
        </>
      )}
      <Button type="danger" onClick={onClose}>
        Close
      </Button>
      <Button type="primary" onClick={onClose}>
        Yes
      </Button>
    </Modal>
  );
};

export default BillDetailsModal;
