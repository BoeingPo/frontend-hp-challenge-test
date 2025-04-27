#!/bin/bash

echo "npm install"
npm install

echo "Complied ts to js"
npx tsc

echo "Start FrontEnd"
npm run dev