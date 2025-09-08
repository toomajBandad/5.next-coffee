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

const generateAccessToken = async (data) => {
  const token = sign({ ...data }, process.env.Access_Token_key, {
    expiresIn: "60s",
  });
  return token;
};

const verifyAccessToken = (token) => {
  const jwtPayload = verify(token, process.env.Access_Token_key);
  return jwtPayload;
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.Refresh_Token_key, {
    expiresIn: "15d",
  });
  return token;
};

const validateEmail = (email) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  return pattern.test(email)
};
const validatePhone = (phone) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g
  return pattern.test(phone)
};
const validatePassword = (password) => {
  const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g
  return pattern.test(password)
};
const validateUsername = (username) => {
  const pattern = /^[a-z0-9_-]{3,15}$/g
  return pattern.test(username)
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
  validateUsername,
};
