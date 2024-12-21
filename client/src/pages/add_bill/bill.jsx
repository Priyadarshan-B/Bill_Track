import React, { useState } from "react";
import FormBill from "./form";
import UpdateBills from "./update_form";
import { Button } from "@nextui-org/react";

const BillManager = () => {
  const [showUpdateBills, setShowUpdateBills] = useState(false);

  const toggleComponent = () => setShowUpdateBills((prev) => !prev);

  return (
    <div className="bill-manager-wrapper w-full  p-1 rounded-lg">
      <div  >
        <h1 className="text-xl font-bold">
          {showUpdateBills ? "No Bill Details" : "New Bill"}
        </h1>
        <Button color="secondary" onClick={toggleComponent}>
          {showUpdateBills ? "Add New Bill" : "Update Bills"}
        </Button>
      </div>

      {showUpdateBills ? <UpdateBills /> : <FormBill />}
    </div>
  );
};

export default BillManager;
