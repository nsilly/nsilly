import Sequelize from 'sequelize';
import sequelize from '../database/sequelize';

const User = sequelize.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  },
  {
    underscored: true,
    paranoid: false
  }
);

export default User;
