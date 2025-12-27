#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Starting linting for all projects..."

# Function to run lint in a directory
run_lint() {
  local dir=$1
  local original_dir=$(pwd)
  echo -e "\n${GREEN}Linting $dir...${NC}"
  if [ -d "$dir" ]; then
    cd "$dir" || { echo -e "${RED}Failed to cd into $dir${NC}"; return 1; }
    if npm run lint; then
        echo -e "${GREEN}✓ $dir linted successfully.${NC}"
    else
        echo -e "${RED}✗ Failed to lint $dir.${NC}"
        cd "$original_dir"
        exit 1
    fi
    cd "$original_dir"
  else
    echo -e "${RED}Directory $dir does not exist.${NC}"
  fi
}

# Run lint for each project
run_lint "libraries/liqid/liqid-components"
run_lint "libraries/liqid/liqid-ui"
run_lint "apps/liqid-docs"
run_lint "apps/liqid-showcase"

echo -e "\n${GREEN}All projects linted successfully!${NC}"
