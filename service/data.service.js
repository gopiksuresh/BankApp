//Import JSON Web Token
const jwt = require('jsonwebtoken')
const db = require('./db')

const register = (acno, username, password) => {
    return db.users.findOne({ "acno": acno })
        .then(users => {
            if (users) {
                return {

                    statusCode: 401,
                    status: false,
                    message: 'User already exists'
                }
            }
            else {
                // userDetails[acno] = {
                const newUser = new db.users({
                    acno,
                    username,
                    password,
                    balance: 0,
                    transaction: []
                })

                newUser.save(); //to save in mongodb
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Successfully registered'
                }
            }
        })
        .catch(err => { console.log('Failed to register', err); });
}

const login = (acno, pswd) => {
    return db.users.findOne({
        acno,
        password: pswd
    })
        .then(users => {
            if (users) {
                currentUser = users.username;
                currentAcno = acno;

                //Token generation
                const token = jwt.sign({ currentAcno: acno }, 'superkey2022');
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Login successfull',
                    currentUser,
                    currentAcno,
                    token
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'Invalid password or acno'
                }
            }
        })


}

const deposit = (acno, pswd, amt) => {
    var amount = parseInt(amt);
    return db.users.findOne({ acno, password: pswd })
        .then(users => {

            if (users) {
                users.balance += amount;
                users.transaction.push({
                    type: 'credit',
                    amount
                })
                users.save();
                return {
                    statusCode: 200,
                    status: true,
                    message: `${amount} is successfully deposited and the new balance is ${users.balance}`
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'Invalid password or acno'
                }
            }
        })
}

const withdraw = (acno, pswd, amt) => {
    var amount = parseInt(amt);
    return db.users.findOne({ acno, password: pswd })
        .then(users => {
            if (users) {
                if (users.balance > amount) {
                    users.balance -= amount;
                    users.transaction.push({ type: 'Debit', amount });
                    users.save()
                    return {
                        statusCode: 200,
                        status: true,
                        message: `${amount} is successfully debitted and the new balance is ${users.balance}`
                    }
                }
                else {
                    return {
                        statusCode: 401,
                        status: false,
                        message: 'Insufficient balance'
                    }
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'Incorrect account number or password'
                }
            }
        })

}

const getTransaction = (acno) => {
    return db.users.findOne({acno})
    .then(users=>{
        if(users){
            return {
                statusCode: 200,
                status: true,
                transaction: users.transaction
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'Incorrect account number'
            }
        }
    })
    
}

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}
