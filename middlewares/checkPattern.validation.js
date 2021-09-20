const Users = require("../Models/userModel")

const checkEmpty = (req, res, next) => {
    const { name, sdt, email, address } = req.body
    if (name !== "" && sdt !== "" && email !== "" && address !== "") {
        next()
    } else {
        res.status(400).send({ message: "DO NOT EMPTY" })
    }
}

const checkEmailExits = async (req, res, next) => {
    const { email } = req.body
    const checkEmail = await Users.findOne({ email })
    if (!checkEmail) {
        next()
    } else {
        res.status(400).send({ message: "EMAIL EXIST" })
    }
}

const checkEmail = (req, res, next) => {
    const { email } = req.body
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(pattern)) {
        next()
    } else {
        res.status(400).send({
            message: "EMAIL NOT ILLEGAL"
        })
    }
}

const checkNumber = (req, res, next) => {
    const { sdt } = req.body
    const pattern = /^[0-9]+$/
    if (sdt.match(pattern)) {
        next()
    } else {
        res.status(400).send({
            message: "PHONE ONLY NUMBER"
        })
    }
}

const checkLength = (req, res, next) => {
    const { name, sdt, email, address } = req.body
    if (name.length > 5 && name.length < 30 && sdt.length > 5 && sdt.length < 30 && email.length > 5 && email.length < 30 && address.length > 5 && address.length < 30) {
        next()
    } else {
        res.status(400).send({
            message: "MAX LENGTH 5 => 20 CHARACTERS"
        })
    }
}

module.exports = {
    checkEmail,
    checkNumber,
    checkEmpty,
    checkEmailExits,
    checkLength
}