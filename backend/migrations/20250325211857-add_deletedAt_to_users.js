export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn("users", "deletedAt", {
    type: Sequelize.DATE,
    allowNull: true,
  });
};

export const down = async (queryInterface) => {
  await queryInterface.removeColumn("users", "deletedAt");
};
