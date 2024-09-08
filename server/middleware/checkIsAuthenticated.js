export default function checkIsAuthenticated(req, res, next) {
  const token = req.headers.cookie?.split("=")[1];

  if (token) {
    return res.status(403);
  }

  next();
}
