/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    employee_id: {
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
    employee_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'Employee',
    timestamps: false
  });
};
