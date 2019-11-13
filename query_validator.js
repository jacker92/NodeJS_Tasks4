const validate = (req,res) => {
    console.log("In validate!");

    let action = req.query["action"];
    if(action) {
        if(action != 'today' && action != 'tomorrow') {
            res.status(400);
        } else {
            res.status(200);
        }
    } else {
        res.status(200);
    }
}

module.exports = validate