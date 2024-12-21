const { query } = require("../../config/query");

exports.get_no_bill = async(req, res)=>{
    try{
        const sql = `
        SELECT * FROM bills 
        WHERE bill_details = 'No Bill'
        AND status = '1'
        `
        const noBill = await query(sql)
        res.status(200).json(noBill)
    }
    catch(err){
        console.error("Error Fetching no-bills", err);
        res.status(500).json({ error: "Error Fetching no-bills" });
    }
}

exports.up_no_bill = async(req, res)=>{
    const {id, bill_details} = req.body
    if(!id || !bill_details){
        return res.status(400).json({error:"Id and Bill details are required.."})
    }
    try{
        const sql = `
        UPDATE bills SET bill_details = ?
        WHERE id =?
        AND status = '1'
        `
        const updateBill = await query(sql, [bill_details, id])
        res.status(200).json(updateBill)
    }catch (err) {
        console.error("Error Updating no-bills", err);
        res.status(500).json({ error: "Error Updating no-bills" });
      }

}