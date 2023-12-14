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

  // Relación con el modelo de Cliente

  return Carrito;
};
