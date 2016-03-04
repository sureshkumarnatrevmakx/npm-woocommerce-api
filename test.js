var NPMWooCommerceAPI = require('npm-woocommerce-api');

var NPMWooCommerceAPI = new NPMWooCommerceAPI({
  url: 'https://yourstore.com',
  ssl: true,
  consumerKey: 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  secret: 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
});

NPMWooCommerceAPI.get('/customers', function(err, data, res){
	console.log(data);
});