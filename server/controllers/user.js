const {prisma} = require("../prisma/prisma-client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please fill in the required fields'
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        const isPasswordCorrect = user && (await bcrypt.compare(password, user['password']));
        const JWT_SECRET = process.env.JWT_SECRET

        if (user && isPasswordCorrect && JWT_SECRET) {
            res.status(200).json({
                id: user['uuid'],
                email: user['email'],
                name: user['username'],
                token: jwt.sign({uuid: user['uuid']}, JWT_SECRET, {expiresIn: "20d"}, null)
            })
        } else {
            return res.status(400).json({
                message: 'Wrong login or password'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
};
const register = async (req, res) => {
    res.send('register')
}

module.exports = {
    login,
    register,
}