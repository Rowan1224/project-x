/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Serivce_Area', {
    service_area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Service_Credential',
        key: 'service_id'
      }
    },
    area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Area_Details',
        key: 'area_id'
      }
    }
  }, {
    tableName: 'Serivce_Area'
  });
};
