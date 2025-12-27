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

# 1. Install root dependencies (handles workspaces: liqid-components, liqid-ui, liqid-docs, liqid-showcase)
echo "--------------------------------------------------"
echo "Installing root dependencies (Workspaces)..."
npm install

# 2. Install liqid-docs dependencies
run_in_dir "apps/liqid-docs" "npm install" "Installing dependencies"

# 3. Install liqid-showcase dependencies
run_in_dir "apps/liqid-showcase" "npm install" "Installing dependencies"

# 4. Install phonebooth dependencies
run_in_dir "apps/liqid-showcase/src/components/Apps/phonebooth" "npm install" "Installing dependencies"

# 5. Install tradebot dependencies (if it has package.json)
if [ -f "apps/liqid-showcase/src/components/Apps/tradebot/package.json" ]; then
    run_in_dir "apps/liqid-showcase/src/components/Apps/tradebot" "npm install" "Installing dependencies"
fi

echo "=================================================="
echo "Building Core Libraries"
echo "=================================================="

# 7. Build liqid-components
run_in_dir "libraries/liqid-components" "npm run build" "Building liqid-components"

# 8. Build liqid-ui
run_in_dir "libraries/liqid-ui" "npm run build" "Building liqid-ui"

echo "--------------------------------------------------"
echo "All installations and builds completed!"
echo "You can now run 'npm run dev' in any app directory."
