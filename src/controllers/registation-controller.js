var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { Pool,Client } = require('pg');


const client = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_JADE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = {
    test: (req, res) => {
	
        return res.status(200).json({
            success: true,
            message: "registations routes confirmed :)",
        })
    },

  createUser: async (req, res) => {
	  //client.connect();
	  console.log(req.body);
	  
	  //var hashedPassword = bcrypt.hashSync(req.body.password, 8);
	  var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
	 
	  client.query("INSERT INTO public.users(name,email,password) VALUES('"+req.body.name+"','"+req.body.email+"','"+hashedPassword+"') RETURNING id", (err, user) => {
	  if (err) return res.status(500).send("There was a problem registering the user`."+err);
	  var token = jwt.sign({ id: user.rows[0].id }, process.env.FOO, {
      expiresIn: 86400 // expires in 24 hours
       }); 
	   //client.end();
	   res.status(200).send({ auth: true, token: token });
	 
	  });
	 

    
 
    }, 
	user: async (req, res) => {
	  
        var token = req.headers['x-access-token'];
       if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	   jwt.verify(token, process.env.FOO, function(err, decoded) {
	   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		res.status(200).send(decoded);
	   });
    },

    auth:async (req, res) => {
		
		client.query("SELECT *  FROM public.users WHERE email='"+req.body.email+"' limit 1", (err, user) => {
		if (err) return res.status(500).send("There was a problem registering the user`."+err);
	
		if(user.rowCount == 0) {
			res.status(200).send({ auth: false, token: null });
		}else{
	      
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.rows[0].password);
		
		if(passwordIsValid){
			 var token = jwt.sign({ id: user.rows[0].id }, process.env.FOO, {
				 expiresIn: 86400 // expires in 24 hours
			  });
			  res.status(200).send({ auth: true, token: token });
		}else{
			res.status(200).send({ auth: false, token: null });
		}}
		
		 
		
	   //client.end();
	   
	   });   
       
    },	

};
