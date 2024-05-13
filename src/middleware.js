import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    
  const token = req.cookies.token;
  
  try{
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  }catch(error) {
    res.clearCookie("token");
    return res.status(401).json({message: error});
  }

};

export default authenticate;
