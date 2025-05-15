import express from 'express';
import cors from 'cors';
import user from './routes/user.js';
import linha from './routes/linha.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", user);
app.use("/linhas", linha);

app.get("/", (req, res) => {
    res.send("API is running! 🚀");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});