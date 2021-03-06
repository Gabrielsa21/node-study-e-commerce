
module.exports = function (app) {
    app.get('/produtos', (req, res) => {
        console.log("estou em / produtos")
        console.log("router", app.infra)

        var connection = app.infra.connectionFactory()
        
        var produto = new app.infra.produtoDao(connection) //produtoDao is not a constructor

        produto.lista(function (err, result, fields) {
                res.render('products/list', {list: result})
            }
        )
        connection.end()
    })

    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form')
    })

    app.post('/produtos', function (req, res) {
        var clother = req.body

        var connection = app.infra.connectionFactory()
        
        var produto = new app.infra.produtoDao(connection)

        produto.salva(clother, function (exception, result) {
            res.redirect('produtos/salvo')
        })
    })
}
