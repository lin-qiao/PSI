const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    goods_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost_price: {
      type: DataTypes.DOUBLE(20,2),
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE(20,2),
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'stock',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
