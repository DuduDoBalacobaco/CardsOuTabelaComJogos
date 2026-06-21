const express = require('express');
const app = express();

let jogos = [
  { id: 1, nome: "Minecraft", genero: "Sandbox", ano: 2011 },
  { id: 2, nome: "Elden Ring", genero: "RPG", ano: 2022 },
  { id: 3, nome: "RDR 2", genero: "Ação", ano: 2018 },
  { id: 4, nome: "Fortnite", genero: "Battle Royale", ano: 2017 },
  { id: 5, nome: "Tetris", genero: "Puzzle", ano: 1988},
  { id: 6, nome: "Super Mario Bros.", genero: "Aventura", ano: 1985}
];
let listaDeJogos = jogos.length;

app.use(express.json());

app.get("/jogos", (req, res) => {
  res.json(jogos);
});

app.post("/jogos", (req, res) => {
  listaDeJogos = listaDeJogos + 1;

  const jogo = {
    id: listaDeJogos,
    nome: req.body.nome,
    genero: req.body.genero,
    ano: req.body.ano
  };

  jogos.push(jogo);

  res.json(jogo);
});

app.put("/jogos/:id", (req, res) => {
  const jogo = jogos.find(
      u => u.id == req.params.id
  );

  jogo.nome = req.body.nome === "" || req.body.nome == null ? jogo.nome : req.body.nome;
  jogo.genero = req.body.genero === "" || req.body.genero == null ? jogo.genero : req.body.genero;
  jogo.ano = req.body.ano === "" || req.body.ano == null ? jogo.ano : req.body.ano;

  res.json(jogo);
});

app.delete("/jogos/:id", (req, res) => {
  let tamanho = jogos.length

  jogos = jogos.filter(
      u => u.id != req.params.id
  );

  jogos.length === tamanho ? res.send("Jogo não encontrado") : res.send("Jogo removido")
});

app.use(express.static("public"));

app.listen(3000);