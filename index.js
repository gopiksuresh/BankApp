//Server Creation

//1. Import Express
const express = require('express')

//Import data service
const dataService = require('./service/data.service');

//Import JWT Token
const jwt = require('jsonwebtoken')

//Import CORS
const cors=require('cors')

//2. Create an app using express
const app = express()

//Give command to share data via cors
app.use(cors({
    origin:'http://localhost:4200'
}))

//To parse json data from request body
app.use(express.json())

//3. Create port number
app.listen(3000, () => {
    console.log('Server listening on the port : 3000');
})

//Application Specific Middleware
const appMiddleware = (req, res, next) => {
    console.log("Application Specific Middleware")
    next();
}
app.use(appMiddleware)

// Router specific middleware
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.header('x-access-token');
        console.log('Router specific Middleware');
        const data = jwt.verify(token, 'superkey2022');
        next();
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'please login first'
        })
    }

}

//4. Resolving HTTP Request

//GET Method - get or display data

// app.get('/', (req, res) => {
//     res.send('GET METHOD');
// })

// //POST Methods - Create data

// app.post('/', (req, res) => {
//     res.send('POST METHOD');
// })

// //DELETE Methods

// app.delete('/', (req, res) => {
//     res.send('DELETE METHOD');
// })

// //PUT Methods

// app.put('/', (req, res) => {
//     res.send('PUT METHOD');
// })

// //PATCH Methods

// app.patch('/', (req, res) => {
//     res.send('PATCH METHOD');
// })

//API Request / Call

//Login
//Registration
//Deposit
//Withdraw
//Delete
//Transaction History

//Resolving registration request - POST

app.post('/register', (req, res) => {
    console.log(req.body);
    result = dataService.register(req.body.acno, req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//Resolving login request - POST

app.post('/login', (req, res) => {
    console.log(req.body);
    result = dataService.login(req.body.acno, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//Resolving deposit request - POST

app.post('/deposit', jwtMiddleware, (req, res) => {
    console.log(req.body);
    result = dataService.deposit(req.body.acno, req.body.pswd, req.body.amt)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//Resolving withdraw request - POST

app.post('/withdraw', jwtMiddleware, (req, res) => {
    console.log(req.body);
    result = dataService.withdraw(req.body.acno, req.body.pswd, req.body.amt)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//Resolving transaction request - POST

app.post('/transaction',jwtMiddleware, (req, res) => {
    console.log(req.body);
    result = dataService.getTransaction(req.body.acno)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

