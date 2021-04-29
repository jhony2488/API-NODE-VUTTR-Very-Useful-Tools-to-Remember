'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tools_tags', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      tool_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tools',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tools_tags')
  },
}
