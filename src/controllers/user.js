import prisma from '../../prisma/prismaClient.js'
import bcrypt from 'bcryptjs';

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
            res.status(400).json({ message: "Email already exists" });
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