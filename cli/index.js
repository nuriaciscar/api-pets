require("dotenv").config();
const inquirer = require("inquirer");

const wizard = () =>
  inquirer.prompt([
    {
      name: "apis",
      type: "confirm",
      message: "¿Ya sabes hacer APIs?",
      default: false,
    },
    {
      name: "name",
      type: "input",
      message: "¿Cómo te llamas?",
      default: "Luis",
    },
    {
      name: "technologies",
      type: "list",
      message: "¿Cuáles son tus tecnologías favoritas?",
      choices: [
        {
          name: "JavaScript",
          value: "js",
        },
        {
          name: "More JavaScript",
          value: "more-js",
        },
        {
          name: "More more JavaScript",
          value: "more-more-js",
        },
      ],
      default: "js",
    },
  ]);

module.exports = wizard;
