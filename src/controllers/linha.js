import prisma from '../../prisma/prismaClient.js';

export const getLines = async (req, res) => {
    try {
        const lines = await prisma.linha.findMany();
        res.status(200).json(lines);
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}