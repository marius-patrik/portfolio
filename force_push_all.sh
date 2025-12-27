#!/bin/bash

# Function to force push a repo
force_push_repo() {
    local dir=$1
    echo "--------------------------------------------------"
    echo "Force pushing $dir..."
    
    local original_dir=$(pwd)
    cd "$dir" || { echo "Failed to cd into $dir"; return 1; }
    
    # Check if git repo
    if [ ! -d ".git" ] && [ ! -f ".git" ]; then
        echo "$dir is not a git repository"
        cd "$original_dir"
        return 1
    fi

    # Add all changes
    git add .

    # Commit if there are changes
    if ! git diff-index --quiet HEAD --; then
        echo "Committing changes..."
        git commit -m "${COMMIT_MESSAGE:-Update}"
    else
        echo "No changes to commit"
    fi

    # Force push to origin
    echo "Force pushing to origin..."
    git push -u origin main --force || git push -u origin master --force
    
    # Return to original directory
    cd "$original_dir"
    echo "Finished force pushing $dir"
}

# Get commit message from arguments
COMMIT_MESSAGE="$1"

# Confirm before force pushing
echo "=================================================="
echo "WARNING: This will force push all repositories!"
echo "This is a destructive operation."
echo "=================================================="
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

# Root submodules (7 entries, but libraries/liqid-components and liqid-ui are nested)
nested_submodules=(
    "libraries/liqid/liqid-components"
    "libraries/liqid/liqid-ui"
)

app_submodules=(
    "apps/liqid-docs"
    "apps/liqid-showcase"
    "apps/phonebooth"
    "apps/tradebot"
    "apps/pokedex"
)

# Force push nested submodules first (inside libraries/liqid)
echo "=================================================="
echo "Force pushing nested submodules in libraries/liqid"
echo "=================================================="
for sub in "${nested_submodules[@]}"; do
    force_push_repo "$sub"
done

# Force push libraries/liqid submodule itself
echo "=================================================="
echo "Force pushing libraries/liqid submodule"
echo "=================================================="
force_push_repo "libraries/liqid"

# Force push app submodules
echo "=================================================="
echo "Force pushing application submodules"
echo "=================================================="
for sub in "${app_submodules[@]}"; do
    force_push_repo "$sub"
done

# Update submodule pointers in root
echo "=================================================="
echo "Updating submodule pointers in root"
echo "=================================================="
git add libraries/liqid "${nested_submodules[@]}" "${app_submodules[@]}"
if ! git diff-index --quiet HEAD --; then
    git commit -m "chore: update submodule pointers" || true
fi

# Force push root repo
echo "=================================================="
echo "Force pushing root repository"
echo "=================================================="
force_push_repo "."

echo "--------------------------------------------------"
echo "All repositories have been force pushed!"

