import inquirer from "inquirer";

const questions = [
  // Type your question here
  {
    type: "input",
    name: "firstName",
    message: "What's your first name?",
    validate(answer) {
      if (!answer) {
        return "Please, fill your name!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message(answers) {
      return `Hello ${answers.firstName} What's your email address?`;
    },
    validate: (answer) => {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmail.test(answer)) {
        return "You have to provide a valid email address!";
      }
      return true;
    },
  },
  {
    type: "list",
    name: "developer",
    message: "Are you experienced Developer?",
    choices: ["Yes", "No"],
  },
  {
    type: "list",
    name: "experience",
    message: "How many years of experience you have with JavaScript?",
    choices: ["0-1", "1-3", "3-5", "5-10", "10+"],
    when(answers) {
      return answers.developer === "Yes";
    },
    validate: function (value) {
      if (!value) {
        return "Please select your years of experience.";
      }
      return true;
    },
  },

  {
    type: "checkbox",
    name: "library",
    message: "What JavaScript library do you know?",
    choices: ["React.js", "Vue", "Angular", "Node.js", "jQuery", "D3.js"],
    when(answers) {
      return answers.developer === "Yes";
    },
    validate: function (value) {
      if (!value || value.length === 0) {
        return "Please select at least one library.";
      }
      return true;
    },
  },
  {
    type: "number",
    name: "salary",
    message: "What is your salary requirement?",
    when(answers) {
      return answers.developer === "Yes";
    },
    validate: (answer) => {
      if (isNaN(answer)) {
        return "please enter a valid number";
      }
      if (!answer || answer <= 0) {
        return "Please enter a salary.";
      }
      return true;
    },
  },
];

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
