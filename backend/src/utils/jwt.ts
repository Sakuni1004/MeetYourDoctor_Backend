// import jwt from 'jsonwebtoken';
// import { IUser } from '../models/user';
//
// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
//
// // Create Access Token
// export const generateAccessToken = (user: IUser) => {
//     return jwt.sign(
//         { userId: user._id, email: user.email },
//         accessTokenSecret,
//         { expiresIn: '15m' }
//     );
// };
//
// // Create Refresh Token
// export const generateRefreshToken = (user: IUser) => {
//     return jwt.sign(
//         { userId: user._id },
//         refreshTokenSecret,
//         { expiresIn: '7d' }
//     );
// };
