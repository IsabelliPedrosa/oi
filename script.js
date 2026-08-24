import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

// Conexão com o Banco de Dados no topo
const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03TB"
})

app.use(cors())
app.use(express.json())
app.use(express.static(".")) // Permite que o Express sirva o index.html, style.css e script.js

// ROTAS DA API (A rota app.get("/") foi removida para o HTML carregar)
app.post("/add-movie", (request, response) => {
    const { titulo, genero, duracao, classificacao } = request.body
    const insertCommand = "INSERT INTO filmes_IsabelliPedrosa(titulo, genero, duracao, classificacao) VALUES (?,?,?,?)"

    sql.query(insertCommand, [titulo, genero, duracao, classificacao], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao salvar" })
        } 
        response.status(201).json({ message: "Filme criado baby shark" })
    })
})

app.get("/movies", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_IsabelliPedrosa"

    sql.query(selectCommand, (error, results) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao buscar" })
        }
        response.json(results)
    })
})

app.put("/update-movie/:id", (request, response) => {
    const { id } = request.params
    const { titulo, genero, duracao, classificacao } = request.body
    const updateCommand = "UPDATE filmes_IsabelliPedrosa SET titulo=?, genero=?, duracao=?, classificacao=? WHERE id=?"

    sql.query(updateCommand, [titulo, genero, duracao, classificacao, id], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao atualizar" })
        }
        response.json({ message: "Filme atualizado chuchu beleza" })
    })
})

app.delete("/delete-movie/:id", (request, response) => {
    const { id } = request.params
    const deleteCommand = "DELETE FROM filmes_IsabelliPedrosa WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if(error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao deletar" })
        }
        response.json({ message: "Filme apagado com sucesso bb delicious" })
    })
})

app.listen(3014, () => {
    console.log("Servidor rodando na porta 3014")
})

// Necessário para funcionar na Vercel
export default app