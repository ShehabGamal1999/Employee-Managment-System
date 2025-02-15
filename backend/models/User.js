
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM('Admin', 'User'),
      allowNull: false,
      defaultValue: 'User',
    },
  }, {
    tableName: 'Users',
    timestamps: true, // Automatically adds createdAt and updatedAt
  });

  User.associate = (models) => {
    // Define associations here if needed in the future
    // For example: User.hasMany(models.Employee);
  };

  return User;
};