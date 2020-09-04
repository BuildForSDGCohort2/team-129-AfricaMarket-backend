
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
            message: "Transaction routes confirmed :)",
        })
    },
    deposit: async  (req, res) => {
        try {
            await client.query('begin');
            const { transaction_date, deposit_amount } = req.body;
            const account_id = req.params.id;
            const result = await client.query(
              'select total_balance from account where account_id=$1',
              [account_id]
            );
            const total_balance = +result.rows[0].total_balance;
            const total = total_balance + deposit_amount;
            await client.query(
              'insert into transactions(transaction_date, deposit_amount, account_id, balance) values($1,$2,$3,$4) returning *',
              [transaction_date, deposit_amount, account_id, total]
            );
            await client.query(
              'update account set total_balance = total_balance + $1 where account_id=$2',
              [deposit_amount, account_id]
            );
            await client.query('commit');
            res.send();

            return res.status(200).json({
                success: true,
                message: "Transaction routes confirmed :)",
            })

          } catch (error) {
            await client.query('rollback');
            res.status(400).send({
                success: false,
                message: 'Error while depositing amount..Try again later.'
            });
          } finally {
            client.release();
          }


	
       
    },
    withdraw: async (req, res) => {

        try {
            await client.query('begin');
            const { transaction_date, withdraw_amount } = req.body;
            const account_id = req.params.id;
            const result = await client.query(
              'select total_balance from account where account_id=$1',
              [account_id]
            );
            const total_balance = +result.rows[0].total_balance;
            const total = total_balance - withdraw_amount;
        
            if (withdraw_amount <= total_balance) {
              await client.query(
                'insert into transactions(transaction_date, withdraw_amount, account_id, balance) values($1,$2,$3,$4) returning *',
                [transaction_date, withdraw_amount, account_id, total]
              );
              await client.query(
                'update account set total_balance = total_balance - $1 where account_id=$2',
                [withdraw_amount, account_id]
              );
              await client.query('commit');
            } else {
              return res.status(400).send({
                withdraw_error: "You don't have enough balance in your account"
              });
            }
            //res.send();

            return res.status(200).json({
                success: true,
                message: "Transaction routes confirmed :)",
            })
          } catch (error) {
            await client.query('rollback');
            res.status(400).send({
              withdraw_error: 'Error while withdrawing amount..Try again later.'
            });
          } finally {
            client.release();
          }
	
       
    },
    transactions: async (req, res) => {

        const { start_date, end_date } = req.query;
  try {
    const result = await getTransactions(req.params.id, start_date, end_date);
    return res.status(200).json({
        success: true,
        message: "Transaction routes confirmed :)",
        data : result.rows,
    })
    
  } catch (error) {
    res.status(400).send({
      transactions_error:
        'Error while getting transactions list..Try again later.'
    });
  }
	
        
    }
}
