'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conversation_id: {
      	allowNull: false,
	type: Sequelize.INTEGER,
	references:{
		model: "conversations",
		key: "conversation_id"
	}
      },
      sender: {
        type: Sequelize.STRING,
	allowNull:false,
	references: {
		model:"friends",
		key:"friend_id"
	}
      },
      message: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};
