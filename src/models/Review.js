const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 

    
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
          max:5,
          min:1
      }
  },

    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },

  },
  {
    timestamps: false
  });
};