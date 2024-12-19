const { query } = require("../../config/query");

exports.get_team = async (req, res)=>{
    try{
        const sql =`
        SELECT * FROM group_details WHERE status = '1';
        `
        const group = await query(sql)
        res.status(200).json(group)
    }
    catch(err){
        console.error("Error fetching Groups", err);
    res.status(500).json({ error: "Error fetching Groups" });
    }
}