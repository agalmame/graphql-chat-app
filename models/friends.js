'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.conversation,{foreignKey:'conversation_id'})
    }
  };
  friends.init({
    friend_id:{
	    type:DataTypes.STRING,
	    primaryKey: true
	},
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'friends',
  });
  return friends;
};
