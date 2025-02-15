
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'Departments',
    timestamps: true,
  });

  Department.associate = (models) => {
    Department.hasMany(models.Employee, {
      foreignKey: 'DepartmentId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Department;
};