import inquirer from "inquirer";

const questions = [
  // Type your question here
  {
    type: "input",
    name: "first_name",
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
      return `Hello ${answers.first_name} What's your email address?`;
    },
    validate: (answer) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(answer)) {
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
  },

  {
    type: "checkbox",
    name: "library",
    message: "What JavaScript library do you know?",
    choices: ["React.js", "Vue", "Angular", "Node.js", "jQuery", "D3.js"],
    when(answers) {
      return answers.developer === "Yes";
    },
  },
  {
    type: "number",
    name: "salary",
    message: "What is your salary requirement?",
    when(answers) {
      return answers.developer === "Yes";
    },
    validate(answer) {
      const salaryRegex = /^[$]?[\d,]+$/;
      if (!salaryRegex.test(answer)) {
        return "Not a valid salary!";
      }
      return true;
    },

    // validate: (answer) => {
    //   if (isNaN(answer)) {
    //     return "please enter a valid number";
    //   }
    //   return true;
    // },
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
