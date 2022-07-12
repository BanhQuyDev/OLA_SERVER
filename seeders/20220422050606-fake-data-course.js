"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "course_templates",
      [
        {
          name: "reactjs",
          exp: 10,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. Etiam aliquam tincidunt sem, ut condimentum dui. Praesent at sem a nisi sagittis cursus. Maecenas auctor ultrices dui sed convallis",
          numofreg: 1000,
          image:
            "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png",
          level: 4,
          type: "ielts",
          isFree: "True",
          extraProp: null,
          id_internal_member: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "reactjs",
          exp: 10,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. Etiam aliquam tincidunt sem, ut condimentum dui. Praesent at sem a nisi sagittis cursus. Maecenas auctor ultrices dui sed convallis",
          numofreg: 1000,
          image:
            "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png",
          level: 4,
          type: "ielts",
          isFree: "True",
          extraProp: null,
          id_internal_member: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "reactjs",
          exp: 10,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. Etiam aliquam tincidunt sem, ut condimentum dui. Praesent at sem a nisi sagittis cursus. Maecenas auctor ultrices dui sed convallis",
          numofreg: 1000,
          image:
            "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png",
          level: 4,
          type: "ielts",
          isFree: "True",
          extraProp: null,
          id_internal_member: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};