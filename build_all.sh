#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Starting build for all projects..."

# Function to run build in a directory
run_build() {
  local dir=$1
  local original_dir=$(pwd)
  echo -e "\n${GREEN}Building $dir...${NC}"
  if [ -d "$dir" ]; then
    cd "$dir" || { echo -e "${RED}Failed to cd into $dir${NC}"; return 1; }
    if npm run build; then
        echo -e "${GREEN}✓ $dir built successfully.${NC}"
    else
        echo -e "${RED}✗ Failed to build $dir.${NC}"
        cd "$original_dir"
        exit 1
    fi
    cd "$original_dir"
  else
    echo -e "${RED}Directory $dir does not exist.${NC}"
  fi
}

# Build libraries first (dependencies for apps)
echo -e "\n${GREEN}Building Core Libraries${NC}"
run_build "libraries/liqid/liqid-components"
run_build "libraries/liqid/liqid-ui"

# Build apps
echo -e "\n${GREEN}Building Applications${NC}"
run_build "apps/liqid-docs"
run_build "apps/liqid-showcase"
run_build "apps/pokedex"
run_build "apps/tradebot"
run_build "apps/phonebooth/client"
run_build "apps/phonebooth/server"

echo -e "\n${GREEN}All projects built successfully!${NC}"


