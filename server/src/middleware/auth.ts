import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });
    
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token" });
    
    try {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as any;
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid"});
    }
};