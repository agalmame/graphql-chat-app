'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	this.hasMany(models.message)    
	this.belongsTo(models.friends, {foreignKey: 'sender'})
	this.belongsTo(models.friends,{foreignKey:'receiver'})
    }
  };
  conversation.init({
    conversation_id: DataTypes.INTEGER,
    sender: {
	    	type: DataTypes.STRING,
	    	primaryKey: true
    },
    receiver: {
	    	type: DataTypes.STRING,
	    	primaryKey: true
  	}
  }, {	
    sequelize,
    modelName: 'conversation'
  }
 );
  conversation.removeAttribute('id')
 
  return conversation;
};
