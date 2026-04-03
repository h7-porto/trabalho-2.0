const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

const db = new sqlite3.Database("./database.db");
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT UNIQUE,
    nome TEXT,
    senha TEXT
)`);

app.post("/cadastrar", async (req, res) => {
    const { cpf, nome, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);

    db.run(
        "INSERT INTO usuarios (cpf, nome, senha) VALUES (?,?,?)",
        [cpf, nome, hash],
        (erro) => {
            if (erro) {
                return res.json({ erro: "CPF já cadastrado" });
            }
            res.json({ ok: true });
        }
    );
});

app.post("/login", (req, res) => {
    const { cpf, senha } = req.body;

    db.get("SELECT * FROM usuarios WHERE cpf = ?", [cpf], async (err, usuario) => {
        if (!usuario) {
            return res.json({ erro: "Usuário não encontrado" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.json({ erro: "Senha incorreta" });
        }

        res.json({ ok: true });
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
