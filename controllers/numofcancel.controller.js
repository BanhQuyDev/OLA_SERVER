const { numofcancel, sequelize } = require("../models");
const getNumOfCancel = async (req, res) => {
    try {
        const getAll = await numofcancel.findAll();
        res.status(200).send(getAll);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    getNumOfCancel
}