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
            message: "trade routes confirmed :)",
        })
    },
	buy: (req, res) => {
	
        return res.status(200).json({
            success: true,
            message: "trade buy routes confirmed :)",
        })
    },
	sell: (req, res) => {
	
        return res.status(200).json({
            success: true,
            message: "trade sell routes confirmed :)",
        })
    },
	cancel: (req, res) => {
	
        return res.status(200).json({
            success: true,
            message: "trade  cancel routes confirmed :)",
        })
    }
	
	
	
	
};
