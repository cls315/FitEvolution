const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
<<<<<<< HEAD
  const Carrito = sequelize.define("Carrito", {
=======
  sequelize.define("Carrito", {
>>>>>>> feature/modeloCarrito
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
<<<<<<< HEAD
    // Agrega el campo ClientId para establecer la relación
    ClientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  // Relación con el modelo de Cliente

  return Carrito;
=======
  });
>>>>>>> feature/modeloCarrito
};
