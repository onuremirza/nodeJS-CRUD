module.exports = (sequelize, DataTypes) => {
  const userModel = sequelize.define("userModel", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return userModel;
};
