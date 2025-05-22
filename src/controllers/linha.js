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

export const feedbackLine = async (req, res) => {
    const { id: linhaId } = req.params;

    const { 
        username,
        lineName,
        frequencia,
        pontualidade,
        lotacao,
        conservacao,
        educacao,
        acessibilidade,
        sinalizacao,
        preparo,
        ambiente,
        comentario,
    } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            username,
            lineName,
            frequencia,
            pontualidade,
            lotacao,
            conservacao,
            educacao,
            acessibilidade,
            sinalizacao,
            preparo,
            ambiente,
            comentario,
            linha: {
                connect: { id: linhaId }
            }
        }
    })

    res.status(201).json({ message: "feedback created", feedback });
}

export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await prisma.feedback.findMany();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error"})
    }
}