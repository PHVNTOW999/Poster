const {prisma} = require("../prisma/prisma-client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {returnError, returnJSON} = require("../utils/messenger");
const JWT_SECRET = process.env.JWT_SECRET

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check required fields
        if (!email || !password) {
            return returnError(req, res, 'Please fill in the required fields')
        }

        // check registered user
        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        // check password
        const isPasswordCorrect = user && (await bcrypt.compare(password, user['password']));

        // send user with jwt
        if (user && isPasswordCorrect && JWT_SECRET) {
            return await returnJSON(req, res, {
                uuid: user['uuid'],
                email: user['email'],
                username: user['username'],
                token: jwt.sign(
                    {uuid: user['uuid']},
                    JWT_SECRET,
                    {expiresIn: "20d"},
                    null)
            })
        } else {
            return returnError(req, res, 'Wrong login or password')
        }
    } catch (error) {
        return returnError(req, res, error)
    }
};
const register = async (req, res) => {
    try {
        const {email, password, username, avatar} = req.body;

        // check required fields
        if (!email || !password || !username) {
            return returnError(req, res, 'Please fill in the required fields')
        }

        // check is registered user
        const registeredUser = await prisma.user.findFirst({
            where: {
                email,
            }
        })

        // if user is registered
        if (registeredUser) {
            return returnError(req, res, 'User with this email address already exists')
        }

        // create user and hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            }
        })

        // create and send jwt with user
        if (user && JWT_SECRET) {
            return await returnJSON(req, res, {
                uuid: user['uuid'],
                avatar: user['avatar'],
                email: user['email'],
                username: user['username'],
                token: jwt.sign(
                    {uuid: user['uuid']},
                    JWT_SECRET,
                    {expiresIn: "20d"},
                    null)
            })
        } else {
            return returnError(req, res, 'Failed to create user')
        }
    } catch (error) {
        return returnError(req, res, error)
    }
}

const current = async (req, res) => {
    return returnJSON(req, res, req.user)
};

module.exports = {
    login,
    register,
    current,
}