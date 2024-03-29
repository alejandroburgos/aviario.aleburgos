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
        'illo-el-sawe'
    )
}

// login user with password and generate token
exports.login = async (req, res) => {
    const { user, password } = req.body
    const userDB = await findUser(user)
    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'No existe el usuario'
        })
    }

    const passwordOk = await bcrypt.compare(password, userDB.password)

    if (!passwordOk) {
        return res.status(400).json({
            ok: false,
            message: 'Contraseña incorrecta'
        })
    } else {
        return res.status(200).json({
            ok: true,
            user: userDB.user,
        })
    }



    

}

// create register user with password and insert
exports.register = async (req, res) => {
    const { user, password } = req.body
    const userExists = await findUser(user)
    if (userExists) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }
    const token = generateToken(user)

    // save user with password and token in database
    const userDB = new User({
        user,
        password: await hashPass({ password }),
        token,
        read_update: false
    })

    await userDB.save()

    return res.status(201).json({
        message: 'User created',        
    })

}

// get user from params and response token
exports.getUser = async (req, res) => {
    const { user } = req.params
    const userDB = await findUser(user)

    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    return res.status(200).json({
        ok: true,
        user: userDB.user,
        token: userDB.token,
        read_update: userDB.read_update
    })
}

// recover password of user with two password in body
exports.recover = async (req, res) => {
    const { user, password, newPassword } = req.body
    const userDB = await findUser(user)

    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    if (password !== newPassword) {
        return res.status(400).json({
            ok: false,
            message: 'Password dont match'
        })
    }
    const newPasswordHash = await hashPass({ password: newPassword })
    userDB.password = newPasswordHash
    await userDB.save()

    return res.status(200).json({
        ok: true,
        message: 'Password changed'
    })
}

// post request to update read_update
exports.update = async (req, res) => {
    const { user, token } = req.body
    const userDB = await findUser(user)

    if (!userDB) {
        return res.status(400).json({
            ok: false,
            message: 'User not found'
        })
    }

    if (userDB.token == token){
        userDB.read_update = true
        await userDB.save()

        return res.status(200).json({
            ok: true,
            message: 'Read_update updated',
            read_update: userDB.read_update
        })
    } else {
        return res.status(400).json({
            ok: false,
            message: 'Token incorrect'
        })
    }
} 