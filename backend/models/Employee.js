
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    DepartmentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow NULL to enable ON DELETE SET NULL
      references: {
        model: 'Departments',
        key: 'Id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    HireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
  }, {
    tableName: 'Employees',
    timestamps: true,
  });

  // Define associations if any (optional)
  Employee.associate = (models) => {
    Employee.belongsTo(models.Department, {
      foreignKey: 'DepartmentId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    // e.g., Employee.belongsTo(models.User, { foreignKey: 'UserId' });
  };

  return Employee;
};