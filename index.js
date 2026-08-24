import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.json({
        message: "Alguém me mata plis"
    })
})

app.post("/add-movie", (request, response) => {
    const { titulo, genero, duracao, classificacao } = request.body

    const insertCommand = "INSERT INTO filmes_IsabelliPedrosa(titulo, genero, duracao, classificacao) VALUES (?,?,?,?)"

    sql.query(insertCommand, [titulo, genero, duracao, classificacao], (error) => {
        if (error) {
            console.log(error)
            return
        } 
        response.status(201).json({
            message: "Filme criado baby shark"
        })
    })
})

app.get("/movies", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_IsabelliPedrosa"

    sql.query(selectCommand, (error, results) => {
        if (error) {
            console.log(error)
            return
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
            return
        }
        response.json({
            message: "Filme atualizado chuchu beleza"
        })
    })
})

app.delete("/delete-movie/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_IsabelliPedrosa WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if(error) {
            console.log(error)
            return
        }

        response.json({
            message: "Filme apagado com sucesso bb delicious"
        })
    })
})

app.listen(3014, () => {
    console.log("AHHHHHH")
})

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03TB"
})