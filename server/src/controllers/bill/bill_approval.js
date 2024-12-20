const { query } = require("../../config/query");

exports.update_approve = async(req, res)=>{
    const { id} = req.body
    if(!id){
        return res.status(400).json({error:"Id is required..."})
    }
    try{
        const sql = `
        UPDATE bills SET entry_status = '2'
        WHERE id = ? AND status = '1';
        `
        const approve = await query(sql, [id])
        res.status(200).json(approve)
    }
    catch(err){
        console.error("Error updating approve bills", err);
        res.status(500).json({ error: "Error updating approve bills" });  
    }
}

exports.update_reject = async(req, res)=>{
    const { id} = req.body
    if(!id){
        return res.status(400).json({error:"Id is required..."})
    }
    try{
        const sql = `
        UPDATE bills SET entry_status = '0'
        WHERE id = ? AND status = '1';
        `
        const reject = await query(sql, [id])
        res.status(200).json(reject)
    }
    catch(err){
        console.error("Error updating reject bills", err);
        res.status(500).json({ error: "Error reject approve bills" });  
    }
}

exports.get_approved = async(req,res)=>{
    try{
        const sql =`
        SELECT * FROM bills WHERE entry_status = '2';
        `
        const approve = await query(sql)
        res.status(200).json(approve)
    }
    catch(err){
        console.error("Error fetching approve bills", err);
    res.status(500).json({ error: "Error fetching approve bills" });
    }
}

exports.get_rejected = async(req,res)=>{
    try{
        const sql =`
        SELECT * FROM bills WHERE entry_status = '0';
        `
        const reject = await query(sql)
        res.status(200).json(reject)
    }
    catch(err){
        console.error("Error fetching rejected bills", err);
    res.status(500).json({ error: "Error fetching rejected bills" });
    }
}