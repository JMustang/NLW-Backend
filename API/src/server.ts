import express from 'express';
const PORT = 3000;

const app = express();

/**
 * GET => Faz Buscas
 * POST => Salva
 * PUT => Faz Alteracos
 * DELETE => Deleta
 * PATCH => Faz ateracoes Especificas
 */

//http://localhost:3000/
 app.get("/", (req, res) => {
     return res.json({message: `primeira aula da <NWL>`})
 });

// primeiro parametro => rota (recuso API)
// segundo parametro => request,response
 app.post('/', (req, res) => {
     // Recebeu os dados para salvar
     return res.json({message: 'Os dados foram salvos com sucesso!'})
 })

app.listen(PORT, () => console.log(`Server Running at: http://localhost:${PORT}`)); 