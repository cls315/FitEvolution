// models/cart.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cart = sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pendingPayments: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
    clientId: {
      type: DataTypes.UUID, // O el tipo de dato correcto para el id de Client
      allowNull: false,
    },
  });

  return Cart;
};