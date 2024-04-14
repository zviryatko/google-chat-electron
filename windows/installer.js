'use strict';

import path from 'path';
import fs from 'fs';
import { exec, ChildProcess } from 'child_process';
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
let isccProcess: ChildProcess | null = null;

try {
  isccProcess = exec(`"${isccExePath}" /Qp ${issFilePath}`);
} catch (error) {
  console.error(error);
  process.exit(1);
}

if (isccProcess) {
  isccProcess.stdout?.on('data', (data) => {
    console.log(data);
  });

  isccProcess.stderr?.on('data', (data) => {
    console.error(data)
  });

  isccProcess.on('error', (error) => {
    console.error(error);
    process.exit(1)
  });

  isccProcess.on('close', (exitCode) => {
    if (exitCode === 0) {
      console.log('Installer created successfully.')
    }
    console.log('Process exited with code : ' + exitCode)
  });
}
