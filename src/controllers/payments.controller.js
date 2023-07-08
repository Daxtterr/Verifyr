function paymentController (req,res){
    console.log(req.body)
    res.status(200).json({ message: "Payment successful" });

}


function getReceipt (req,res){
    console.log(req.body)
    res.status(200).json({ message: "Receipt gotten" });

}


module.exports = {
    paymentController,
    getReceipt,
  };