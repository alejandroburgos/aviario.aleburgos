const model = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
// hash password
const hashPass = (password) => {
    return bcrypt.hash(password.password, 10)
        .then(hash => {
            password.password = hash

            return password.password
        })
        .catch(err => {
            throw new Error(err)
        })
}


const findUser = (user) => {
    return model.findOne({ user })
}

const generateToken = (user) => {
    // Gets expiration time
    const expiration =
        Math.floor(Date.now() / 1000) + 60 * 10

    // returns signed and encrypted token
    return jwt.sign(
        {
            data: {
                _id: user
            },
            exp: expiration
        },
        'llave-secreta-123'
    )
}

// crear login
exports.login = async (req, res) => {
    const { user, password } = req.body
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error comparing passwords'
            })
        }
        if (result) {
            const token = generateToken(user._id)
            return res.status(200).json({
                message: 'Login successful',
                token
            })
        }
        return res.status(401).json({
            message: 'Invalid credentials'
        })
    })
}

// create register user with password and insert
exports.register = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) {
        return res.status(400).json({
            message: 'User or password not found'
        })
    }
    const userExists = await findUser(user)
    if (userExists) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }
    
    // save user with password in database
    const userWithPassword = {
        user,
        password: await hashPass({ password })
    }
    const newUser = new User(userWithPassword)
    await newUser.save()

    return res.status(201).json({
        message: 'User created'
    })

}
