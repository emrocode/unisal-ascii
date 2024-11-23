#!/usr/bin/env zx

import { $, spinner, echo } from 'zx';
import inquirer from 'inquirer';

const inpFile = 'src/assets/unisal_ascii.enc';
const { key } = await inquirer.prompt([
  {
    name: 'key',
    mask: '*',
    type: 'password',
    message: 'Password: ',
  },
]);
const doc = await spinner(
  `Decrypting ${inpFile}...`,
  async () =>
    await $`openssl enc -aes-256-cbc -pbkdf2 -d -in ${inpFile} -k ${key}`
);

echo`${doc.stdout}`;
