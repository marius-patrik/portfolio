#!/bin/bash

# Function to run lint in a directory
run_lint() {
    local dir=$1
    if [ -f "$dir/package.json" ] && grep -q "\"lint\"" "$dir/package.json"; then
        echo "--------------------------------------------------"
        echo "Linting $dir..."
        (cd "$dir" && npm run lint) || echo "Linting failed or not configured in $dir"
    else
        echo "Skipping $dir (no lint script)"
    fi
}

echo "=================================================="
echo "Linting all projects"
echo "=================================================="

# Lint libraries (nested in libraries/liqid)
run_lint "libraries/liqid/liqid-components"
run_lint "libraries/liqid/liqid-ui"

# Lint apps
run_lint "apps/liqid-docs"
run_lint "apps/liqid-showcase"
run_lint "apps/phonebooth"
run_lint "apps/tradebot"
run_lint "apps/pokedex"

echo "--------------------------------------------------"
echo "Linting completed!"

