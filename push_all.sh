#!/bin/bash

# Function to push a repo
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
submodules=("liqid-components" "liqid-ui" "liqid-docs" "portfolio")

# Nested submodules (inside portfolio)
nested_submodules=("portfolio/src/components/Apps/phonebooth")

# Push nested submodules first
for sub in "${nested_submodules[@]}"; do
    push_repo "$sub"
done

# Push submodules
for sub in "${submodules[@]}"; do
    push_repo "$sub"
done

# Push root repo
push_repo "."

echo "--------------------------------------------------"
echo "All repositories have been pushed!"
