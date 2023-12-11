const { Trainer } = require('../../db');

const updateTr = async (id, role) =>{
    const tr = await Trainer.update({ role: role }, { where: { id: id } });

    return tr;

}

module.exports = updateTr;