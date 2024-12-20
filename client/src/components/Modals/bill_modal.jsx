import React from 'react';
import { Modal, Button } from 'antd';
import moment from 'moment';

const BillDetailsModal = ({ open, bill, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose} 
      footer={null} 
    >
      {bill && (
        
        <div className='flex-row space-y-4'>
          <h3 className='w-full text-center text-lg size-4 font-bold'>Bill Details</h3>
          <p><strong>Item Name:</strong> {bill.item_name}</p>
          <p><strong>Department:</strong> {bill.department}</p>
          <p><strong>Bill Details:</strong> {bill.bill_details}</p>
          <p><strong>Shop Address:</strong> {bill.shop_address}</p>
          <p><strong>Staff:</strong> {bill.staff}</p>
          <p><strong>Date:</strong> {moment(bill.date_time).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
      )}
      <div className='mt-6 text-md font-bold tracking-wide'>
       Is Bill Received ?
      </div>
      <div className='mt-3 flex justify-end'>
  <div className='flex-1 max-w-[100px]'>
    <Button type="error" onClick={onClose}>
      Close
    </Button>
  </div>
  <div className='flex-1 max-w-[100px]'>
    <Button type="primary" onClick={onConfirm}>
      Confirm
    </Button>
  </div>
</div>
    </Modal>
  );
};

export default BillDetailsModal;
