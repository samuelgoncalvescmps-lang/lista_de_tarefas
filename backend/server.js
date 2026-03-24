const express = require('express') //Express é o "motor" que lida com requisições de internet
const cors = require('cors') //Cors faz com que o React "converse" com o servidor

const app = express() //criou o servidor, "app"
app.use(cors()) //criou cors como uma middleware
app.use(express.json()) //Converte os dados em json

let tarefas = ["Acordar no domingo", "Voltar a dormir instantâneamente"] //"Banco de dados" temporário (lista)

app.get('/tarefas', (req, res) => { //define o que acontece quando "get" é requirido no endereço /tarefas
    
    return res.json(tarefas) //retorna (res) a listagem (array) no formato json

})

app.post('/tarefas', (req, res) => { //O que acontece quando usar post no endereço /tarefas (cria algo novo)
    
    const { novatarefa } = req.body // a "tarefa" estabelecida pelo usuario, desestruturar faz com que apenas "novatarefa" seja buscada no body
    
    if(!novatarefa || novatarefa.trim() === "") { //se não tiver tarefa ou se a tarefa mandada for espaço vazio

        console.log("Tentaram mandar uma tarefa vazia")
        return res.status(400).json({erro: "Tarefa não encontrada"})//retorna isso
       
    } else { //se tiver

        tarefas.push(novatarefa) //envia a nova tarefa pra lista
        return res.status(201).json({message: "Foi!"}) // Mostra que tudo ta joia
    
    }
})

app.delete('/tarefas/:index', (req, res) => { //":index" faz com que o número na variável index seja buscado, e n o texto "index"
    const { index } = req.params //buscou "id" nos parâmetros
    if(tarefas[index] !== undefined) {  //Se o index de determinado item for diferente de "nada" (indefinido)
        tarefas.splice(index, 1) //ele será retirado da array (tarefas)
        res.status(204).send() //e será retornado um HTTP status code de "Deu certo! mas não tem mais nada aqui" e isso explica o send() no lugar do json()
    } else { //do contrário
        res.status(404).json({erro: "Tarefa não encontrada"}) //Não encontrado, pois não existe
    }
})

app.listen(3333, () => {console.log("Servidor ta rodando!")}) //Define o localhost e a arrow function mostra uma msg quando o server roda