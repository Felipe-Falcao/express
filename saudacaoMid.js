function saudacao(nome) {
    return function (req, res, next) {
        console.log('Seja bem vindo ' + nome + '.') // Dentro da função será chamado sempre que houver uma nova requisição
        next()
    }
}

module.exports = saudacao