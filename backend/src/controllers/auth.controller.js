import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateWebToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const { fullName, email, password} = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            })
        }

        
        const user = await User.findOne({email});
        if (user){
            return res.status(409).json({
                message: "User already exists",
            });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User ({
            fullName,
            email,
            password: hashPassword,
        });

        if (newUser) {
            await newUser.save();
            generateWebToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            });
        } else {
            return res.status(400).json({
                message: "Invalid user data",
            })
        }
    } catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
}

export const signin = async (req, res) => {
    const { email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        // Check for the user
        const user = await User.findOne({email}).select("+password");

        if (!user){
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Now check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        generateWebToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        });

    } catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
}

export const signout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({
            message: "Signout successful",
        });
    } catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateProfile = async (req, res) => {
    const { pokemonName } = req.body;
    const userId = req.user._id;
    try {
        if (!pokemonName){
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
        const response = await fetch(url);

        if (!response.ok){
            return res.status(404).json({
                message: "Invalid Pokemon Name"
            });
        }

        const data = await response.json();
        let spriteUrl = (!data.sprites?.front_default) ? "" : data.sprites.front_default;
        if (!spriteUrl){
            return res.status(404).json({
                message: "Sprite not found",
            })
        }

        spriteUrl = data.sprites.front_default;

        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {profilePicture: spriteUrl, pokemonName}, 
            {new: true}
        );
        res.status(200).json(updatedUser);
    }catch (error){
        res.status(500).json({
            message: error.message,
        });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error){
        res.status(500).json({
            message: error.message,
        });
    }
}
