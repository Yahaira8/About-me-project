#!/bin/bash
set -e

if [ -f package-lock.json ]; then
  npm ci --no-audit --no-fund
else
  npm install --no-package-lock --no-audit --no-fund
fi