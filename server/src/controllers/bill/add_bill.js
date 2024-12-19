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
    return res.status(400).json({ error: "Date required.." });
  }
  try {
    const sql = `
        SELECT * FROM bills
        WHERE DATE(date_time) = ? AND status = '1';
        `;
    const bills = await query(sql, [date]);
    res.status(200).json(bills);
  } catch (err) {
    console.error("Error fetching resources", err);
    res.status(500).json({ error: "Error fetching resources" });
  }
};
