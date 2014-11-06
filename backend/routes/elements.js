module.exports = function(app) {
var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];


app.get('/shoes', function index(req, res){
  res.send(shoesData);
});


  // app.get('/tasks/:id', function task(req, res) {
  //   res.send(tasks[req.params.id]);
  // });
}
