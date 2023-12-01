const allClient = require("../../controllers/Clients/getAllClients");

const allClientHndls = async (req, res) => {
  try {
    const client = await allClient();

    return res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = allClientHndls;
