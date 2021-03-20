var express = require('express');
var router = express.Router();


let Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env["API_KEY"],
  key_secret: process.env["API_SECRET"],
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/order', (req, res) => {
  console.log(req.body);
  const reqBody = req.body;
  const options = {
    amount: reqBody["amount"]*100,  // amount in the smallest currency unit
    currency: "USD",
    receipt: new Date().getTime().toString(),
  };
  instance.orders.create(options, function(err, order) {
    if(err){
      res.send({"error": err,"status": false});
      return;
    }  
    console.log(order)
    res.send({"order_data": order,"status": true});
  });
 
});

router.post('/order_confirm', (req, res) => {
  console.log(req.body);
  res.send('order is confirmed');
});

module.exports = router;
