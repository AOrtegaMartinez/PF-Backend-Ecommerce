const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('template', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // debe ser unico
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,  
    },
    image:{ type: DataTypes.STRING,
      allowNull: false,
    },
    
    
    // deleted_at: {aqui se puede incluir soft-deletion} o paranoid: true
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null // <-- utilizando paranoid: true No habria filtrar manualmente en las rutas.
    },

  },
  {
    timestamps: false
    // agreagar index aqui en todas las columnas
  });
};
