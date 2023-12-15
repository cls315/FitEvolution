const { Cart } = require("../../db");

const cartClient = async (clientId) => {
  try {
    // Buscar el carrito del cliente por el clientId
    const clientCart = await Cart.findOne({
      where: { clientId: clientId },
    });

    if (!clientCart) {
      throw new Error(
        "Carrito no encontrado para el cliente con ID proporcionado"
      );
    }

    return clientCart;
  } catch (error) {
    throw new Error(
      `Error al obtener el carrito del cliente: ${error.message}`
    );
  }
};

module.exports = cartClient;