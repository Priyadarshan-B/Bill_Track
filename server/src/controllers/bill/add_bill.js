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
    const billsQuery = `
      SELECT *
      FROM bills
      WHERE DATE(date_time) = ? AND bill_details != 'No Bill' AND entry_status = '1' AND status = '1';
    `;

    const countsQuery = `
      SELECT
        (SELECT COUNT(*) FROM bills WHERE DATE(date_time) = ? AND bill_details != 'No Bill' AND entry_status = '1') AS bill_count_date,
        (SELECT COUNT(*) FROM bills WHERE entry_status = '1' AND bill_details != 'No Bill') AS bill_count,
        (SELECT COUNT(*) FROM bills WHERE entry_status = '2' AND bill_details != 'No Bill') AS app_count,
        (SELECT COUNT(*) FROM bills WHERE entry_status = '0' AND bill_details != 'No Bill') AS rej_count;
    `;

    const bills = await query(billsQuery, [date]);
    const counts = await query(countsQuery, [date]);

    const { bill_count_date, bill_count, app_count, rej_count } = counts[0];

    res.status(200).json({
      bill_count_date: bill_count_date || 0,
      bill_count: bill_count || 0,
      app_count: app_count || 0,
      rej_count: rej_count || 0,
      bills,
    });
  } catch (err) {
    console.error("Error fetching bills", err);
    res.status(500).json({ error: "Error fetching bills" });
  }
};

