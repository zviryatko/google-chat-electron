'use strict';

import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import * as utils from './utility';

import manifest from '../package.json';

const inPath = path.join(__dirname, '../dist/');
const outDir = path.join(__dirname, '../dist/installers');
const issFilePath = path.join(__dirname, './inno-setup.iss');

console.log('Prepare iss template file at - ', issFilePath);

let issContent = fs.readFileSync(issFilePath, 'utf8');
issContent = utils.replace(issContent, {
  appVersion: manifest.version,
});
fs.writeFileSync(issFilePath, issContent)

if (!fs.existsSync(inPath)) {
  throw new Error('Input directory not found at - ' + inPath)
}

if (!fs.existsSync(outDir)) {
  console.log("Creating missing output directory at - ", outDir)
  fs.mkdirSync(outDir);
}

let isccExePath = path.join('C:\\', 'Program Files (x86)', 'Inno Setup 6', 'ISCC.exe');

console.log('Executing ISCC.exe from -', isccExePath);

exec(`"${isccExePath}" /Qp ${issFilePath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(stdout);
  console.error(stderr);
  console.log('Installer created successfully.');
});
