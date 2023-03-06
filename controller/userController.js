const Users = require("../Models/userModel");
const sgMail = require("@sendgrid/mail");
const HistoryEmail = require("../Models/historyEmail");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const getAllUser = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const UserDelete = await Users.findByIdAndDelete(req.params.id);
    console.log(UserDelete);
    res.status(200).json({
      status: "REMOVE SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userUpdate = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "UPDATE SUCCESS",
      data: {
        userUpdate,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, sdt, email, address } = req.body
    let CurrentSigninAt = new Date().toISOString();
    const newUser = new Users({
      name, sdt, email, address, CurrentSigninAt,
    });
    await newUser.save()
      .then(user => {
        return res.status(201).send({ status: "CREATE SUCCESS", data: { user } })
      })
  } catch (err) {
    if (err.status) return res.status(err.status).send(err)
    if (err.code === 11000) return res.status(400).send({ message: "PHONE EXIST" })
    return res.status(500).send(err)
  }
};

const uploadAvatar = async (req, res) => {
  const url = `${process.env.URL_BE}${req.file.path}`;
  try {
    const users = await Users.findById(req.params.id);
    if (users) {
      users.avatar = url
      await users.save();
      res.status(200).send(users)
    } else {
      res.status(401).send("ID NOT FOUND")
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

const Sendmail = async (req, res) => {
  const { message, email, header } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let CurrentSigninAt = new Date().toISOString();
  const msg = {
    to: email, // Change to your recipient
    from: "luancauthu@gmail.com", // Change to your verified sender
    subject: header,
    text: message,
    html: `${message}`,
    timesSend: CurrentSigninAt,
  };
  sgMail
    .send(msg)
    .then(() => {
      const { to, from, html, timesSend } = msg
      const history = new HistoryEmail({
        emailTo: to, emailFrom: from, title: html, CurrentSigninAt: timesSend
      })
      return history.save()
    })
    .then((history) => {
      res.status(201).json(history);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getHistoryEmail = async (req, res) => {
  try {
    const email = await HistoryEmail.find();
    res.status(200).json({
      status: "success",
      data: {
        email,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

module.exports = {
  createUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  uploadAvatar,
  Sendmail,
  getHistoryEmail
};
