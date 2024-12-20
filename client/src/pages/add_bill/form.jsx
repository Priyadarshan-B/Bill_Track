import React, { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import InputBox from "../../components/TextBox/textbox";
import requestApi from "../../components/utils/axios";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

const FormBill = () => {
  const [formData, setFormData] = useState({
    entry_no: "",
    item_name: "",
    department: "",
    bill_details: "",
    shop_address: "",
    staff: "",
    remarks: "",
  });

  const [teamOptions, setTeamOptions] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await requestApi("GET", "/team");
        if (response.data) {
          const options = response.data
            .filter((team) => team.status === "1")
            .map((team) => ({
              label: team.group,
              value: team.id,
            }));
          setTeamOptions(options);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      staff: value,
    }));
  };

  const isFormValid = () => {
    const requiredFields = [
      "entry_no",
      "item_name",
      "department",
      "bill_details",
      "shop_address",
      "staff",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field.replace("_", " ")} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    try {
      const response = await requestApi(
        "POST",
        "/add-bill",
        JSON.stringify(formData)
      );
      console.log("Response:", response.data);
      toast.success("Bill added Successfully!");
    } catch (error) {
      console.error("Error adding bill:", error);
      toast.error("Failed to add Bill");
    }
  };

  return (
    <div className="form-wrapper w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <p className="font-semibold text-center text-lg">Add Bill Details</p>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper w-full max-w-4xl mx-auto p-2 rounded-lg">
          <div className="form-field w-full md:w-1/2 px-4 mb-6">
            <InputBox
              label="Entry No."
              type="number"
              name="entry_no"
              value={formData.entry_no}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field w-full md:w-1/2 px-4 mb-6">
            <InputBox
              label="Item Name"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="full-width-field w-full px-4 mb-6">
            <InputBox
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="full-width-field w-full px-4 mb-6">
            <InputBox
              label="Bill Details"
              name="bill_details"
              value={formData.bill_details}
              onChange={handleChange}
              required
            />
          </div>

          <div className="full-width-field w-full px-4 mb-6">
            <InputBox
              label="Shop Address"
              name="shop_address"
              value={formData.shop_address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field w-full md:w-1/2 px-4 mb-6">
            <Select
              label="Select Team"
              placeholder="Select Team"
              selectedKeys={new Set([formData.staff])}
              onSelectionChange={(value) => handleSelectChange([...value][0])}
            >
              {teamOptions.map((option) => (
                <SelectItem key={option.label} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="full-width-field w-full px-4 mb-6">
            <InputBox
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field w-full md:w-1/2 px-4 mb-6 ">
          <Button type="submit" shadow variant="flat" color="primary" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormBill;
