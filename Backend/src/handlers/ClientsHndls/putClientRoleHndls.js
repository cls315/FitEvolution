const putClientRole = require("../../controllers/Clients/putClientRole");

const clientRoleHndls = async (req, res) => {
  try {
    const client = await putClientRole(req);
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = clientRoleHndls;
