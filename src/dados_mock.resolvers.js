const { GraphQLScalarType } = require('graphql');

const usuarios = [
  {
    id: "1",
    nome: "João",
    email: "joao@email.com",
    senha: "senha123",
    idade: 30,
    excluido: false
  },
  {
    id: "2",
    nome: "Maria",
    email: "maria@email.com",
    senha: "senha456",
    idade: 25,
    excluido: false
  },
  {
    id: "3",
    nome: "Pedro",
    email: "pedro@email.com",
    senha: "senha789",
    idade: 28,
    excluido: true
  },
  {
    id: "4",
    nome: "Ana",
    email: "ana@email.com",
    senha: "senha321",
    idade: 35,
    excluido: false
  },
  {
    id: "5",
    nome: "Lucas",
    email: "lucas@email.com",
    senha: "senha654",
    idade: 22,
    excluido: false
  }
];

const dividas = [
  {
    id: "1",
    nome: "Dívida 1",
    descricao: "Descrição da dívida 1",
    parcelas: 3,
    status: true,
    vencimento: "2023-12-31",
    usuarioId: "1"
  },
  {
    id: "2",
    nome: "Dívida 2",
    descricao: "Descrição da dívida 2",
    parcelas: 5,
    status: false,
    vencimento: "2023-11-15",
    usuarioId: "2"
  },
  {
    id: "3",
    nome: "Dívida 3",
    descricao: "Descrição da dívida 3",
    parcelas: 2,
    status: true,
    vencimento: "2023-10-20",
    usuarioId: "1"
  },
  {
    id: "4",
    nome: "Dívida 4",
    descricao: "Descrição da dívida 4",
    parcelas: 4,
    status: true,
    vencimento: "2024-01-05",
    usuarioId: "3"
  },
  {
    id: "5",
    nome: "Dívida 5",
    descricao: "Descrição da dívida 5",
    parcelas: 1,
    status: false,
    vencimento: "2023-12-01",
    usuarioId: "4"
  },
  {
    id: "6",
    nome: "Dívida 6",
    descricao: "Descrição da dívida 6",
    parcelas: 2,
    status: false,
    vencimento: "2023-11-30",
    usuarioId: "5"
  },
  {
    id: "7",
    nome: "Dívida 7",
    descricao: "Descrição da dívida 7",
    parcelas: 3,
    status: true,
    vencimento: "2023-11-10",
    usuarioId: "2"
  },
  {
    id: "8",
    nome: "Dívida 8",
    descricao: "Descrição da dívida 8",
    parcelas: 6,
    status: true,
    vencimento: "2023-12-20",
    usuarioId: "1"
  },
  {
    id: "9",
    nome: "Dívida 9",
    descricao: "Descrição da dívida 9",
    parcelas: 4,
    status: false,
    vencimento: "2023-11-05",
    usuarioId: "3"
  },
  {
    id: "10",
    nome: "Dívida 10",
    descricao: "Descrição da dívida 10",
    parcelas: 3,
    status: true,
    vencimento: "2024-02-15",
    usuarioId: "4"
  }
];

module.exports = {
  Query: {
    allUsuarios: () => usuarios,
    allDividas: () => dividas,
    usuario: (_, { id }) => usuarios.find(usuario => usuario.id === id),
  },
  Mutation: {
    createUsuario: (_, { nome, email, senha, idade }) => {
      const novoUsuario = {
        id: String(usuarios.length + 1),
        nome,
        email,
        senha,
        idade,
        excluido: false
      };
      usuarios.push(novoUsuario);
      return novoUsuario;
    },
    updateUsuario: (_, { id, nome, email, senha, idade }) => {
      const usuario = usuarios.find(user => user.id === id);
      if (usuario) {
        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = senha;
        usuario.idade = idade;
        return usuario;
      }
      return null;
    },
    deleteUsuario: (_, { id }) => {
      const index = usuarios.findIndex(user => user.id === id);
      if (index !== -1) {
        const usuarioExcluido = usuarios.splice(index, 1);
        return usuarioExcluido[0];
      }
      return null;
    },
    createDivida: (_, { nome, descricao, parcelas, status, vencimento, usuarioId }) => {
      const novaDivida = {
        id: String(dividas.length + 1),
        nome,
        descricao,
        parcelas,
        status,
        vencimento,
        usuarioId
      };
      dividas.push(novaDivida);
      return novaDivida;
    },
    updateDivida: (_, { id, nome, descricao, parcelas, status, vencimento, usuarioId }) => {
      const divida = dividas.find(debt => debt.id === id);
      if (divida) {
        divida.nome = nome;
        divida.descricao = descricao;
        divida.parcelas = parcelas;
        divida.status = status;
        divida.vencimento = vencimento;
        divida.usuarioId = usuarioId;
        return divida;
      }
      return null;
    },
    deleteDivida: (_, { id }) => {
      const index = dividas.findIndex(debt => debt.id === id);
      if (index !== -1) {
        const dividaExcluida = dividas.splice(index, 1);
        return dividaExcluida[0];
      }
      return null;
    }
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Tipo DateTime personalizado",
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: (ast) => ast.value,
  })
};
