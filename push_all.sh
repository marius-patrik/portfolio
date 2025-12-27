#!/bin/bash

# Function to push a repo
push_repo() {
    local dir=$1
    echo "--------------------------------------------------"
    echo "Pushing $dir..."
    
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

    # Push to origin
    echo "Pushing to origin..."
    git push -u origin main || git push -u origin master
    
    # Return to original directory
    cd "$original_dir"
    echo "Finished pushing $dir"
}

# Get commit message from arguments
COMMIT_MESSAGE="$1"

# Root submodules (6 total)
submodules=(
    "libraries/liqid/liqid-components"
    "libraries/liqid/liqid-ui"
    "apps/liqid-docs"
    "apps/liqid-showcase"
    "apps/phonebooth"
    "apps/tradebot"
    "apps/pokedex"
)

# Push nested submodules first (inside libraries/liqid)
echo "=================================================="
echo "Pushing nested submodules in libraries/liqid"
echo "=================================================="
push_repo "libraries/liqid/liqid-components"
push_repo "libraries/liqid/liqid-ui"

# Push libraries/liqid submodule itself
echo "=================================================="
echo "Pushing libraries/liqid submodule"
echo "=================================================="
push_repo "libraries/liqid"

# Push app submodules
echo "=================================================="
echo "Pushing application submodules"
echo "=================================================="
for sub in "${submodules[@]}"; do
    # Skip nested submodules (already pushed)
    if [[ "$sub" == libraries/liqid/* ]]; then
        continue
    fi
    push_repo "$sub"
done

# Update submodule pointers in root
echo "=================================================="
echo "Updating submodule pointers in root"
echo "=================================================="
git add "${submodules[@]}" libraries/liqid
if ! git diff-index --quiet HEAD --; then
    git commit -m "chore: update submodule pointers" || true
fi

# Push root repo
echo "=================================================="
echo "Pushing root repository"
echo "=================================================="
push_repo "."

echo "--------------------------------------------------"
echo "All repositories have been pushed!"

