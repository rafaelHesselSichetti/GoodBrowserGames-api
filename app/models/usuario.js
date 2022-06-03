module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define("usuario", {
    usuario: {
      type: Sequelize.STRING
    },
    senha: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    dt_nascimento: {
      type: Sequelize.STRING
    },
    nome: {
      type: Sequelize.STRING
    },
    pais: {
      type: Sequelize.STRING
    },
    estado: {
      type: Sequelize.STRING
    },
    cargo: {
      type: Sequelize.STRING,
      defaultValue: 'Membro'
    }
  });
  return Usuario;
};