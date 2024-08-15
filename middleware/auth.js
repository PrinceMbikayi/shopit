// Checks if user is authenticated or not 
import catchAsyncErrors from './catchAsyncErrors.js'
import ErrorHandler from '../utils/errorHandler.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken';

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    //const { token } = req.cookies;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return next(new ErrorHandler('Login first to access this ressource', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

// Authorize user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this ressource`, 403));
        }
        next();
    };
};

