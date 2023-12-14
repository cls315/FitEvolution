const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Carrito = sequelize.define("Carrito", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    pendientesDepago: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [], // Inicialización con un array vacío
    },
    // Agrega el campo ClientId para establecer la relación
    ClientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  // Agrega la relación con el modelo de Cliente
  Carrito.belongsTo(sequelize.models.Client, {
    foreignKey: "ClientId", // Se refiere al campo que acabamos de agregar
    allowNull: false,
  });

  return Carrito;
};
