import jwt from "jsonwebtoken";

const { NODE_ENV, JWT_SECRET } = process.env;
// If it's missing, the app crashes immediately with a clear message.
if (NODE_ENV === "production" && !JWT_SECRET) {
  throw new Error(
    "CRITICAL: JWT_SECRET is not defined in production environment!",
  );
}
const auth = (req, res, next) => {
  // Look for the cookie instead of the header
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ message: "Authorization Required" });
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
    );
  } catch (err) {
    return res.status(401).send({ message: "Authorization Required" });
  }
  req.user = payload; // assigning the payload to the request object
  return next(); // sending the request to the next middleware
};
export default auth;
