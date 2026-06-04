/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const doc = yaml.load(fs.readFileSync(path.join(__dirname, '../.github/workflows/test.yml'), 'utf8'));
const branchNameConfig = doc.jobs['branch-name'].with;

const generateExample = (allowedPrefixes, name) =>
  // eslint-disable-next-line no-bitwise
  `${allowedPrefixes[(allowedPrefixes.length * Math.random()) | 0]}/${name}`;

const validateBranchName = (branchName, allowedPrefixes, issueTrackingType) => {
  const prefixGroup = `(?<prefix>${allowedPrefixes.join('|')})`;
  const TASK_IDENTIFIER_GROUPS = {
    ado: '(?<taskIdentifier>[0-9]+)',
    linear: '(?<taskIdentifier>[A-Z0-9]+-[0-9]+)',
  };
  const taskIdentifierGroup = TASK_IDENTIFIER_GROUPS[issueTrackingType];
  const taskNameGroup = '(?<taskName>[a-zA-Z0-9\\-.]+)';

  const REGEX = new RegExp(`^${prefixGroup}/${taskIdentifierGroup}-${taskNameGroup}$`);

  return branchName.match(REGEX);
};

const isIgnored = (branchName, ignoredBranchNames) => {
  if (ignoredBranchNames.length === 0) {
    return false;
  }

  const results = ignoredBranchNames.map((regex) => !!branchName.match(new RegExp(regex)));

  return results.includes(true);
};

const branchName = process.argv.slice(2)[0];
const allowedPrefixes = branchNameConfig['allowed-prefixes'].split(',').map((prefix) => prefix.trim());
const ignoredBranchNames = branchNameConfig['ignored-branch-names'].split(',').map((name) => name.trim());
const issueTrackingType = branchNameConfig['issue-tracking-type'];
const ignored = isIgnored(branchName, ignoredBranchNames);

if (ignored) {
  console.log(`Ignored branch name: ${branchName}`);
  process.exit(0);
}

const match = validateBranchName(branchName, allowedPrefixes, issueTrackingType);

if (!match) {
  const EXAMPLES = {
    ado: [
      generateExample(allowedPrefixes, '1234-task-one'),
      generateExample(allowedPrefixes, '321-task-two'),
      generateExample(allowedPrefixes, '12-task-Three'),
    ],
    linear: [
      generateExample(allowedPrefixes, 'CP-1234-task-one'),
      generateExample(allowedPrefixes, 'TK-321-task-two'),
      generateExample(allowedPrefixes, 'DEVEX-12-task-Three'),
    ],
  };
  const examples = EXAMPLES[issueTrackingType];

  console.log(
    `Invalid branch name: ${JSON.stringify(
      {
        branchName: branchName,
        allowedPrefixes: allowedPrefixes,
        validExamples: examples,
      },
      null,
      2,
    )}`,
  );

  process.exit(1);
} else {
  console.log(`Parsed branch name: ${JSON.stringify(match.groups, null, 2)}`);
}
