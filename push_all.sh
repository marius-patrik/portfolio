#!/bin/bash

# Function to push a repo
push_repo() {
    local dir=$1
    echo "--------------------------------------------------"
    echo "Pushing $dir..."
    
    # Store original directory
    local original_dir=$(pwd)
    
    # Go to directory
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
    git push -u origin main
    
    # Return to original directory
    cd "$original_dir"
    echo "Finished pushing $dir"
}

# Get commit message from arguments
COMMIT_MESSAGE="$1"

# Top-level submodules
submodules=("libraries/liqid/liqid-components" "libraries/liqid/liqid-ui" "apps/liqid-docs" "apps/liqid-showcase" "apps/phonebooth" "apps/tradebot" "apps/pokedex")

# Push submodules
for sub in "${submodules[@]}"; do
    push_repo "$sub"
done

# Push root repo
push_repo "."

echo "--------------------------------------------------"
echo "All repositories have been pushed!"
