#!/usr/bin/env bash

PACKAGE_VERSION=$(cat package.json | grep \"version\" | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
if ! git status -s | grep -q "package.json"; then
  if [ $(git tag -l "v$PACKAGE_VERSION") ]; then
      echo "Warning: Tag 'v$PACKAGE_VERSION' already exists"
  else
    git push && git tag v$PACKAGE_VERSION && git push origin v$PACKAGE_VERSION
  fi
else
  echo 'Warning: package.json is uncommitted'
fi
