import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isVerified = await compare(password, hashedPassword);
  return isVerified;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.Access_Token_key, {
    expiresIn: "60d",
  });
  return token;
};

const verifyAccessToken = (token) => {
  const jwtPayload = verify(token, process.env.Access_Token_key);
  return jwtPayload;
};
const verifyRefreshToken = (token) => {
  const jwtPayload = verify(token, process.env.Refresh_Token_key);
  return jwtPayload;
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.Refresh_Token_key, {
    expiresIn: "15d",
  });
  return token;
};

const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const validatePhone = (phone) => {
  const pattern = /^[0-9]{6,20}$/;
  return pattern.test(phone);
};

const validatePassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};

const validateUsername = (username) => {
  const pattern = /^[a-zA-Z0-9 _-]{3,15}$/;
  return pattern.test(username);
};


export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
  validateUsername,
};
