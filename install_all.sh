#!/bin/bash

# Function to run command in a directory
run_in_dir() {
    local dir=$1
    local cmd=$2
    local msg=$3

    echo "--------------------------------------------------"
    echo "$msg in $dir..."
    
    local original_dir=$(pwd)
    cd "$dir" || { echo "Failed to cd into $dir"; return 1; }
    
    eval "$cmd"
    
    cd "$original_dir"
}

# 1. Initialize and update all submodules (including nested)
echo "=================================================="
echo "Initializing submodules"
echo "=================================================="
git submodule update --init --recursive

# 2. Install root dependencies (if root has package.json with workspaces)
if [ -f "package.json" ]; then
    echo "--------------------------------------------------"
    echo "Installing root dependencies..."
    npm install
fi

# 3. Build libraries (liqid-components and liqid-ui are nested in libraries/liqid)
echo "=================================================="
echo "Building Core Libraries"
echo "=================================================="

# Build liqid-components (nested in libraries/liqid)
run_in_dir "libraries/liqid/liqid-components" "npm install && npm run build" "Installing dependencies and building liqid-components"

# Build liqid-ui (nested in libraries/liqid)
run_in_dir "libraries/liqid/liqid-ui" "npm install && npm run build" "Installing dependencies and building liqid-ui"

# 4. Install app dependencies
echo "=================================================="
echo "Installing Application Dependencies"
echo "=================================================="

run_in_dir "apps/liqid-docs" "npm install" "Installing dependencies"
run_in_dir "apps/liqid-showcase" "npm install" "Installing dependencies"

# Install optional app dependencies (if they have package.json)
if [ -f "apps/phonebooth/package.json" ]; then
    run_in_dir "apps/phonebooth" "npm install" "Installing dependencies"
fi

if [ -f "apps/tradebot/package.json" ]; then
    run_in_dir "apps/tradebot" "npm install" "Installing dependencies"
fi

if [ -f "apps/pokedex/package.json" ]; then
    run_in_dir "apps/pokedex" "npm install" "Installing dependencies"
fi

echo "--------------------------------------------------"
echo "All installations and builds completed!"
echo "You can now run 'npm run dev' in any app directory."

