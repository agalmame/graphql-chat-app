'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations', {
      conversation_id: {
      	type: Sequelize.INTEGER,
	allowNull: false,
	unique: true,
	autoIncrement: true
      },
      sender: {
        type: Sequelize.STRING,
	allowNull: false,
	references: {
		model: "friends",
		key: "friend_id"
	}
      },
      receiver: {
        type: Sequelize.STRING,
	allowNull: false,
	references: {
		model: "friends",
		key: "friend_id"
	}
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
   await queryInterface.sequelize.query('Alter table "conversations" add constraint conversation_primarykey_constraint primary key("sender","receiver")')
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations');
  }
};
