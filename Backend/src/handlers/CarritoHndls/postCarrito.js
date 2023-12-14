const postItemCarrito = require("../../controllers/Carrito/postItemCarrito");

const postCarrito = async (req, res) => {
  try {
    const { exerc, enfoque, precio } = req.body;
    console.log("Contenido de req.body:", req.body);

    const newItem = await postItemCarrito(exerc, enfoque, precio);

    res.status(200).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = postCarrito;
