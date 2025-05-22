import prisma from '../../prisma/prismaClient.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const usernameExists = await prisma.user.findUnique({ where: { username } });
        if (usernameExists) {
            return res.status(400).json({ message: "User already exists "});
        }
        const emailExists = await prisma.user.findUnique({ where: { email }});
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: "User created succesfully",
            user: { email: user.email }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, nome: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "12h" });

        res.status(200).json({ message: "Login successful", token, user: user.name });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}