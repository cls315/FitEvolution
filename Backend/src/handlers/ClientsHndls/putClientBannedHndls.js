const putClients = require("../../controllers/Clients/putClientBanned");

const putClientHndls = async (req, res) => {
  
  try {
    const client = await putClients(req);
    return res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports= putClientHndls;