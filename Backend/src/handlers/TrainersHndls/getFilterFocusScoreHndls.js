const filterFocusScore = require("../../controllers/Trainers/getFilterFocusScore");

const filterFocusScoreHndls = async (req, res) => {
  try {
    const filter = await filterFocusScore(req);

    return res.status(200).json(filter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = filterFocusScoreHndls;
