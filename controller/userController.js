import { userModel } from '../models/User.js';
import bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


// exports.registerUser = async (req, res) => {
//   const { email, password ,role} = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res
//                         .status(400)
//                         .json({ msg: 'User already exists' });

//     user = new User({ email, password ,role});
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     const payload = { user: { id: user.id,role:user.role } };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// };

class userController {
  static userRegistration = async (req, res) => {
    const { name, email, mobile, password, confPassword, role } = req.body;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const user = await userModel.findOne({
        email: email,
      });
      if (user) {
        return res.error(400, "Email already exists!", null);
      } else {
        if (name && email && mobile && password && confPassword && role) {
          if (password === confPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const newUser = new userModel({
              name: name,
              email: email,
              mobile: mobile,
              password: hashPass,
              role: role
            });
            const data = await newUser.save(session);
            session.commitTransaction();
            return res.success(201, "User registered successfully.", data);
          } else {
            return res.error(400, "Confirm Password must be the same as password!", null);
          }
        } else {
          return res.error(400, "All fields are required!", null);
        }
      }
    } catch (error) {
      session.abortTransaction();
      console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };

  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      if (email && password) {
        const user = await userModel.findOne({
          email: email,
        });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            const accessToken = JWTHelper.createAccessToken(user._id);
            const refreshToken = JWTHelper.createRefreshToken(user._id);
            const data = {
              Name: user.name,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            await session.commitTransaction();
            return res.success(201, "User logged in successfully.", data);
          } else {
            return res.error(400, "Email or Password incorrect!", null);
          }
        } else {
          return res.error(400, "User not registered!", null);
        }
      } else {
        return res.error(400, "All fields are required!", null);
      }
    } catch (error) {
      session.abortTransaction();
      console.log("Transaction aborted : " + error);
      return res.error(400, error, null);
    } finally {
      session.endSession();
    }
  };
}

export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new userModel({ email, password, role });
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    res.status(500).send('Server error');
  }
};


export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
      console.log(token);
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
