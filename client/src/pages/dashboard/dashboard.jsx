import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import BillCard from "../../components/Cards/billcard";
import requestApi from "../../components/utils/axios";
import CountCard from "../../components/Cards/count_card";
import moment from "moment";
import toast from "react-hot-toast";
import SearchBar from "../../components/TextBox/search";
import BillDetailsModal from "../../components/Modals/bill_modal";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [bills, setBills] = useState([]);
  const [count, setCount] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const formatDate = (date) => {
    return date.format("YYYY-MM-DD");
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    if (!date) return;

    try {
      const formattedDate = formatDate(date);
      const response = await requestApi("POST", "/bills", {
        date: formattedDate,
      });

      if (response.data && Array.isArray(response.data.bills)) {
        setBills(response.data.bills);
        setCount(response.data);
      } else {
        console.error("Bills data is not in expected format");
        setBills([]);
      }
    } catch (error) {
      console.error("Error sending date:", error);
      alert("Error sending date to API.");
    }
  };

  useEffect(() => {
    const today = moment();
    setSelectedDate(today);
    handleDateSelect(today);
  }, []);

  const handleConfirmApproval = async () => {
    if (!selectedBill) return;
    try {
      await requestApi("PUT", "/approve-up", { id: selectedBill.id });
      toast.success("Bill Approved Successfully...");
      handleDateSelect(selectedDate);
      setModalOpen(false);
    } catch (error) {
      console.error("Error  bill approval:", error);
      toast.error("Failed to Approve...");
    }
  };

  const filteredBills = bills.filter((bill) => {
    const isEntryNoMatch =
      !isNaN(filterText) && bill.entry_no.toString().includes(filterText); 
    const isItemNameMatch = bill.item_name
      .toLowerCase()
      .includes(filterText.toLowerCase()); 
    return isEntryNoMatch || isItemNameMatch;
  });

  const handleSearchChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleCardClick = (bill) => {
    setSelectedBill(bill);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="p-4 justify-between flex gap-4 items-center">
        <div className="pl-2 pb-5">
          <div className="flex flex-col justify-center">
            <DatePicker
              value={selectedDate}
              onChange={handleDateSelect}
              format="DD-MM-YYYY"
              placeholder="Select a date"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CountCard title="Pending Bills" count={count.bill_count} />
          <CountCard title="Approved Bills" count={count.app_count} />
          <CountCard title="Rejected Bills" count={count.rej_count} />
        </div>
      </div>

      <h4 className="font-semibold text-lg">Bill Details</h4>

      <div className="form-field w-full md:w-1/3 px-4 mb-3 mt-1">
        <SearchBar
          filterText={filterText}
          handleSearchChange={handleSearchChange}
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
              date={moment(bill.date_time).format("YYYY-MM-DD HH:mm:ss")}
              onPress={() => handleCardClick(bill)}
            />
          ))
        ) : (
          <p className="w-full flex justify-center items-center">
            No bills available for the selected date.
          </p>
        )}
      </div>

      <BillDetailsModal
        open={modalOpen}
        bill={selectedBill}
        onClose={handleCloseModal}
        onConfirm={handleConfirmApproval}
      />
    </div>
  );
};

export default Dashboard;
