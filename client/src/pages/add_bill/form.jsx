import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import InputBox from "../../components/TextBox/textbox";
import requestApi from "../../components/utils/axios";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

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
  const [isNoBill, setIsNoBill] = useState(false);

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

  const handleInputChange = (value) => {
    const matchedItem = teamOptions.find((item) => item.label === value);
    if (matchedItem) {
      setFormData((prev) => ({
        ...prev,
        staff: matchedItem.label,
      }));
    }
  };

  const handleCheckboxChange = () => {
    setIsNoBill((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      bill_details: !isNoBill ? "No Bill" : "",
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
      await requestApi("POST", "/add-bill", JSON.stringify(formData));
      toast.success("Bill added Successfully!");
      setFormData({
        entry_no: "",
        item_name: "",
        department: "",
        bill_details: "",
        shop_address: "",
        staff: "",
        remarks: "",
      });
      setIsNoBill(false);
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

          <div className=" w-full  px-4 mb-6 flex gap-5 items-center">
            <div className="flex-1">
              <InputBox
                label="Bill Details"
                name="bill_details"
                value={formData.bill_details}
                onChange={handleChange}
                required
                disabled={isNoBill}
              />
            </div>
            <div className="flex-1">
              <Checkbox
                color="danger"
                isSelected={isNoBill}
                onChange={handleCheckboxChange}
              >
                No Bill
              </Checkbox>
            </div>
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
          <div className="form-field w-full px-4 mb-6">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Autocomplete
                className="max-w-xs"
                label="Select Team"
                placeholder="Search Team"
                defaultItems={teamOptions}
                onInputChange={handleInputChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value} id={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
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
