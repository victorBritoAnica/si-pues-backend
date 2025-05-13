const businessModel = require('../models/business.model');

const getBusinesses = async (req, res) => {
  try {
    const businesses = await businessModel.getAllBusinesses();
    res.json(businesses);
  } catch (error) {
    console.error('Error al obtener negocios:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
//
module.exports = {
  getBusinesses,
};