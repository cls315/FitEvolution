const getRoutines = require("../../controllers/Routine/getRoutines");

const getRoutinesHndls = async (req, res) => {
  try {
    const routines = await getRoutines();

    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getRoutinesHndls;
