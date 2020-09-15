const express = require('express')
const app = express()

const saudacao = require('./saudacaoMid')

app.use(saudacao('Santana'))

// Next é padrão para chamada em Chain of Responsability
// Funções com esse padrão são chamadas de middleware
app.use((req, res, next) => {
    console.log('Será que serei chamado?')
    next()
})

// Lendo dados da requisição via query
app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatorio: Completo ${req.query.completo} ano = ${req.query.ano}`)
})

app.post('/corpo', (req, res) => {
    let corpo = ''
    req.on('data', function (parte) {
        corpo += parte
    })
    req.on('end', function () {
        res.send(corpo)
    })
})

// Lendo dados da requisição via params
app.get('/clientes/:id', (req, res) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
})

// Protocolo http funciona com requisição e resposta
// ('/opa',) url associada
app.get('/opa', (req, res) => {
    // Pode-se acrescentrar informações sobre os dados
    res.json({
        data: [
            { id: 7, name: 'Felipe', position: 1 },
            { id: 34, name: 'Bia', position: 2 },
            { id: 7, name: 'Liz', position: 3 }
        ],
        count: 30,
        skip: 0,
        limit: 3,
        status: 200,
    })

    // res.json([
    //     { id: 7, name: 'Felipe', position: 1 },
    //     { id: 34, name: 'Bia', position: 2 },
    //     { id: 7, name: 'Liz', position: 3 }
    // ])

    // res.json({
    //     name: 'Ipad',
    //     price: 1889.00,
    //     discount: 0.12
    // })

    // res.send('Hello <b>World</b>')
})

app.listen(3000, () => {
    console.log("Backend executando...");
})