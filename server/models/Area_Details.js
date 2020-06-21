/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Area_Details', {
    area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    area_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    thana: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    upazilla: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    lati: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longi: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'Area_Details',
    timestamps: false
  });
};
