import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button, Input } from "@nextui-org/react";
import { FiEdit2 } from "react-icons/fi";
import moment from "moment";

const UpdateBillCard = ({ bill, onSave, onCancel }) => {
  const [billDetails, setBillDetails] = useState(bill.bill_details);
  const [isEditable, setIsEditable] = useState(false);

  const handleSave = () => {
    if (billDetails.trim() === "") {
      alert("Bill details cannot be empty.");
      return;
    }
    onSave(bill.id, billDetails);
    setIsEditable(false); 
  };

  const handleCancel = () => {
    setBillDetails(bill.bill_details); 
    setIsEditable(false); 
    onCancel(bill.id);
  };

  const handleEdit = () => {
    setIsEditable(true); 
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex justify-between items-center">
        <div className="flex gap-3">
          <Image
            alt="staff avatar"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4" // Placeholder avatar
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md font-bold">{bill.entry_no}</p>
            <p className="text-small text-default-500">{bill.item_name}</p>
          </div>
        </div>
        <Button
          isIconOnly
          size="sm"
          color="primary"
          variant="light"
          onClick={handleEdit}
          disabled={isEditable} 
        >
          <FiEdit2 />
        </Button>
      </CardHeader>
      <Divider />
      <CardBody>
      <p className="text-md font-semibold">To: <span className="font-normal">{bill.department || "No Bill"}</span></p>
<p className="text-md font-semibold">Date: <span className="font-normal">{moment(bill.date_time).format("YYYY-MM-DD HH:mm:ss") || "No Bill"}</span></p>
<p className="text-md font-semibold">Current Bill Details: <span className="font-normal">{bill.bill_details || "No Bill"}</span></p>

        <Input
          isDisabled={!isEditable} 
          value={billDetails}
          label="Bill Details"
          onChange={(e) => setBillDetails(e.target.value)}
          placeholder="Enter new bill details"
        />
      </CardBody>
      <Divider />
      {isEditable && <CardFooter className="flex justify-end gap-3">
        <Button
          size="sm"
          color="success"
          onClick={handleSave}
          disabled={!isEditable} 
        >
          Save
        </Button>
        <Button
          size="sm"
          color="error"
          onClick={handleCancel}
          disabled={!isEditable} 
        >
          Cancel
        </Button>
      </CardFooter>}
    </Card>
  );
};

export default UpdateBillCard;
