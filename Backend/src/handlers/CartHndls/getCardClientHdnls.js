const cartClient = require("../../controllers/Cart/cartClient");

const getCartClientHndls = async (req, res) => {
  const clientId = req.params.id; // Obtener el id del cliente desde los parámetros

  try {
    const clientCart = await cartClient(clientId);

    return res.status(200).json(clientCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getCartClientHndls;