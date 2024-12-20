import React, { useEffect, useState } from "react";
import requestApi from "../../components/utils/axios"; 
import BillCard from "../../components/Cards/billcard";
import moment from "moment"; 
import SearchBar from "../../components/TextBox/search";

function AllBills() {
    const [bills, setBills] = useState([]); 
    const [rbills, setRBills] = useState([]); 
    const [filterText, setFilterText] = useState("");

    const fetchAppBills = async () => {
        try {
            const response = await requestApi("GET", "/bill-approvals"); 
            setBills(response.data); 
        } catch (error) {
            console.error("Error fetching bills:", error);
        }
    };

    const fetchRejBills = async () => {
        try {
            const response = await requestApi("GET", "/bill-reject"); 
            setRBills(response.data); 
        } catch (error) {
            console.error("Error fetching rejected bills:", error);
        }
    };

    useEffect(() => {
        fetchAppBills();
        fetchRejBills(); 
    }, []); 

    const handleSearchChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredBills = bills.filter((bill) => {
        const isEntryNoMatch = !isNaN(filterText) && bill.entry_no.toString().includes(filterText); // Match entry_no as partial match
        const isItemNameMatch = bill.item_name.toLowerCase().includes(filterText.toLowerCase()); // Match item_name as a string
        return isEntryNoMatch || isItemNameMatch;
    });

    const filteredRejBills = rbills.filter((bill) => {
        const isEntryNoMatch = !isNaN(filterText) && bill.entry_no.toString().includes(filterText); // Match entry_no as partial match
        const isItemNameMatch = bill.item_name.toLowerCase().includes(filterText.toLowerCase()); // Match item_name as a string
        return isEntryNoMatch || isItemNameMatch;
    });

    const handleCardClick = (bill) => {
        console.log("Card clicked:", bill);
    };

    return (
        <div>
            <h1 className="mb-4 text-lg font-bold tracking-widest">Bill Details</h1>
            <div className='form-field w-full md:w-1/3 px-4 mb-3 mt-1'>
                <SearchBar 
                    filterText={filterText}
                    handleSearchChange={handleSearchChange} 
                /> 
            </div>

            <h2 className="mt-4 mb-2 text-lg font-medium">Approved Bills</h2>
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
                    <p className='w-full flex justify-center items-center'>No approved bills available.</p>
                )}
            </div>

            <h2 className="mt-8 mb-2 text-lg font-medium">Rejected Bills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(filteredRejBills) && filteredRejBills.length > 0 ? (
                    filteredRejBills.map((bill) => (
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
                    <p className='w-full flex justify-center items-center'>No rejected bills available.</p>
                )}
            </div>
        </div>
    );
}

export default AllBills;
