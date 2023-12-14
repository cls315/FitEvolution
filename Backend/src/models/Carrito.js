const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Carrito", {
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
  });
};
