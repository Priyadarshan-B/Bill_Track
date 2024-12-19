import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/select/select";
import InputBox from "../../components/TextBox/textbox";
import requestApi from "../../components/utils/axios";
import { Button } from "@nextui-org/react";

const FormBill = () => {
  const [formData, setFormData] = useState({
    entry_no: 0,
    item_name: "",
    department: "",
    bill_details: "",
    shop_address: "",
    staff: "",
    remarks: ""
  });
  
  const [teamOptions, setTeamOptions] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await requestApi("GET", "/team");
        if (response.data) {
            console.log(response.data)
          const options = response.data
            .filter((team) => team.status === "1") 
            .map((team) => ({
              label: team.group, 
              value: team.id 
            }));
          setTeamOptions(options);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleChange = (e, name) => {
    const value = e.target ? e.target.value : e;  // e.target.value for input, e for select
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestApi("POST", "/add-bill",
         JSON.stringify(formData), {
      });
      console.log("Response:", response.data);
      alert("Bill added successfully!");
    } catch (error) {
      console.error("Error adding bill:", error);
      alert("Failed to add bill.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputBox
        label="Entry No."
        type="number"
        name="entry_no"
        value={formData.entry_no}
        onChange={handleChange}
        required
      />
      
      <InputBox
        label="Item Name"
        name="item_name"
        value={formData.item_name}
        onChange={handleChange}
        required
      />
      
      <InputBox
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      />
      
      <InputBox
        label="Bill Details"
        name="bill_details"
        value={formData.bill_details}
        onChange={handleChange}
        required
      />
      
      <InputBox
        label="Shop Address"
        name="shop_address"
        value={formData.shop_address}
        onChange={handleChange}
        required
      />
      
      <CustomSelect
  label="Select Team"
  name="staff"
  value={formData.staff}
  onChange={(e) => handleChange(e, "staff")}  // Pass the name explicitly here
  options={teamOptions}
/>
      
      <InputBox
        label="Remarks"
        name="remark"
        value={formData.remarks}
        onChange={handleChange}
        required
      />
      
      <Button type="submit" shadow color="primary" auto fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default FormBill;
