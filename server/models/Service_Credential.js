/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Credential', {
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    phone_1: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    phone_2: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nid: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    trade_license: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nid_photo: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    profile_picture: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'Service_Credential',
    timestamps: false
  });
};
