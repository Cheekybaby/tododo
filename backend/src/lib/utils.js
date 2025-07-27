import jwt from "jsonwebtoken";

export const generateWebToken = (userId, res) => {
    const token = jwt.sign({id: userId}, process.env.SECRET_JWT, {
        expiresIn: "2d"
    });

    res.cookie("jwt", token, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 2,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV.trim() !== "development"
    });

    return token;
}