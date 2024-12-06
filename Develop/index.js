// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import colors from 'colors';
import fs from 'fs';

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: colors.brightCyan('What is the title of your project?'),
        name: 'project',
      },
      {
        type: 'input',
        message: colors.brightMagenta('Enter project description'),
        name: 'description',
      },
      {
        type: 'input',
      message: colors.brightGreen('Enter installation instructions'),
        name: 'installation',
      },
      {
        type: 'input',
      message: colors.brightRed('Describe project usage'),
        name: 'usage',
      },
      {
        type: 'list',
      message: colors.brightBlue('Select License'),
        name: 'license',
        choices: ["MIT", "Mozilla", "IBM"]
      },
      {
        type: 'input',
      message: colors.brightYellow('Enter your Github username'),
        name: 'contributors',
      },
      {
        type: 'input',
      message: colors.brightCyan('Enter your email'),
        name: 'email',
      },

      {
        type: 'input',
      message: colors.brightMagenta('Tests'),
        name: 'tests',
      },

];

// function for adding license badge to read.me

const licenseBadges = {
  MIT: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
  Mozilla: '[![License: Mozilla](https://img.shields.io/badge/License-Mozilla-blue.svg)](https://opensource.org/licenses/MPL-2.0)',
  IBM: '[![License: IBM](https://img.shields.io/badge/License-IBM-blue.svg)](https://opensource.org/licenses/IPL-1.0)',
};

//TODO: create a function to create README content
function generateReadmeContent(answers) {
// Add badge based on selected license
const licenseBadge = licenseBadges[answers.license];
// Add GitHub profile link and email address in the "Questions" section
const contactInfo = `If you have any questions, please contact [${answers.contributors}](https://github.com/${answers.contributors}) on GitHub or reach me at [${answers.email}](mailto:${answers.email}).`;
  return `
# ${answers.project}

# Description
${answers.description}

# Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} ${licenseBadge}

## Contributing
${answers.contributors}

## Tests
${answers.tests}

## Questions
${contactInfo}

  `;
}

function writeToFile(answers) {
  const content = generateReadmeContent(answers);

  fs.writeFile('README.md', content, (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('README.md file has been created!');
    }
  });
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions)
    .then((answers) => {
      // const content = generateReadmeContent(answers);
      writeToFile(answers);
    })
    .catch((error) => {
      console.error('Error during the prompt:', error);
    });
}

// Function call to initialize app
init();
