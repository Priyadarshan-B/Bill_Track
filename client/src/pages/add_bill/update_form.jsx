import React, { useState, useEffect } from "react";
import UpdateBillCard from "../../components/Cards/no_billcard";
import toast from "react-hot-toast";
import requestApi from "../../components/utils/axios";

const UpdateBills = () => {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const response = await requestApi("GET", "/no-bill");
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
      toast.error("Failed to fetch bills");
    }
  };
  useEffect(() => {
    fetchBills();
  }, []);

  const handleSave = async (id, updatedBillDetails) => {
    try {
      const response = await requestApi("PUT", `/up-no-bill`, {
        id:id,
        bill_details: updatedBillDetails,
      });
      console.log(response)
      toast.success("Bill updated successfully!");
      fetchBills()
      setBills((prev) =>
        prev.map((bill) =>
          bill.id === id ? { ...bill, bill_details: updatedBillDetails } : bill
        )
      );
    } catch (error) {
      console.error("Error updating bill:", error);
      toast.error("Failed to update bill");
    }
  };

  const handleCancel = (id) => {
    toast("Update cancelled");
  };

  return (
    <div className="update-bills-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {bills.length > 0 ? (
        bills.map((bill) => (
          <UpdateBillCard
            key={bill.id}
            bill={bill}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-600">
          <p>No Bills</p>
        </div>
      )}
    </div>
  );
};

export default UpdateBills;
