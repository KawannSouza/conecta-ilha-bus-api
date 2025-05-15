import prisma from '../../prisma/prismaClient.js';

export const getLines = async (req, res) => {
    try {
        const lines = await prisma.linha.findMany();
        res.status(200).json(lines);
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getLineByCode = async (req, res) => {
    const { code } = req.params;
    try {
        const line = await prisma.linha.findFirst({
            where: {
                code: code
            }
        })
        if (!line) {
            return res.status(404).json({ message: "Line not found" });
        }
        res.status(200).json(line)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}