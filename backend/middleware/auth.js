import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;

const { NODE_ENV, JWT_SECRET } = process.env;
// If it's missing, the app crashes immediately with a clear message.
if (NODE_ENV === "production" && !JWT_SECRET) {
  throw new Error("CRITICAL: JWT_SECRET is not defined in production environment!");
}
 const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  
  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret");
    
 } catch (err) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }

  req.user = payload; // assigning the payload to the request object

  return next(); // sending the request to the next middleware
};
export default auth;