module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.changeColumn("units", "id_course", {
            type: Sequelize.INTEGER, 
            references:{
                model:"course_templates",
                key:"id"
              }
        }),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.changeColumn("units", "id_course", {
        }),
      ]);
    },
  };