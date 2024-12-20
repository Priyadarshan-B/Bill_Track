const { query } = require("../../config/query");

exports.insert_bill = async (req, res) => {
  const {
    entry_no,
    item_name,
    department,
    bill_details,
    shop_address,
    staff,
    remarks,
  } = req.body;
  if (
    !entry_no ||
    !item_name ||
    !department ||
    !bill_details ||
    !shop_address ||
    !staff
  ) {
    return res.status(400).json({ error: "Fields  are required.." });
  }
  try {
    const sql = `
        INSERT INTO bills (entry_no, item_name, department, bill_details, shop_address, staff, remarks, date_time)
        VALUES (?,?,?,?,?,?,?,CURRENT_TIMESTAMP);
        `;
    const bills = await query(sql, [
      entry_no,
      item_name,
      department,
      bill_details,
      shop_address,
      staff,
      remarks,
    ]);
    res.status(200).json(bills);
  } catch (err) {
    console.error("Error Inserting bills", err);
    res.status(500).json({ error: "Error Inserting bills" });
  }
};

exports.get_bills = async (req, res) => {
  const { date } = req.body;
  if (!date) {
    return res.status(400).json({ error: "Date required." });
  }
  try {
    const sql = `
        SELECT *, 
        (SELECT COUNT(*) FROM bills WHERE DATE(date_time) = ? AND status = '1') AS bill_count,
        (SELECT COUNT(*) FROM bills WHERE DATE(date_time) = ? AND status = '2') AS app_count,
        (SELECT COUNT(*) FROM bills WHERE DATE(date_time) = ? AND status = '0') AS rej_count
        FROM bills
        WHERE DATE(date_time) = ? AND entry_status = '1' AND status = '1';
    `;
    const bills = await query(sql, [date, date, date,date]);
    const bill_count = bills.length > 0 ? bills[0].bill_count : 0;
    const app_count = bills.length > 0 ? bills[0].app_count : 0;
    const rej_count = bills.length > 0 ? bills[0].rej_count : 0;


    res.status(200).json({ bill_count,app_count,rej_count, bills });
  } catch (err) {
    console.error("Error fetching resources", err);
    res.status(500).json({ error: "Error fetching resources" });
  }
};
