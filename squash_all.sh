#!/bin/bash

# Function to squash a repo
squash_repo() {
    local dir=$1
    echo "--------------------------------------------------"
    echo "Squashing $dir..."
    
    # Store original directory
    local original_dir=$(pwd)
    
    # Go to directory
    cd "$dir" || { echo "Failed to cd into $dir"; return 1; }
    
    # Clean any locks just in case
    rm -f .git/index.lock
    
    # Check if git repo
    if [ ! -d ".git" ] && [ ! -f ".git" ]; then
        echo "$dir is not a git repository"
        cd "$original_dir"
        return 1
    fi

    # Create orphan branch
    git checkout --orphan temp_squash_branch
    
    # Stage all files
    git add -A
    
    # Commit
    git commit -m "feat: initial commit"
    
    # Delete old main/master branches if they exist
    git branch -D main 2>/dev/null || true
    git branch -D master 2>/dev/null || true
    
    # Rename current branch to main
    git branch -m main
    
    # Force push
    echo "Pushing to origin..."
    git push -u origin main --force
    
    # Return to original directory
    cd "$original_dir"
    echo "Finished squashing $dir"
}

# Top-level submodules
submodules=("libraries/liqid-components" "libraries/liqid-ui" "apps/liqid-docs" "apps/liqid-showcase")

# Nested submodules (inside portfolio)
nested_submodules=("apps/liqid-showcase/src/components/Apps/phonebooth")

# Squash nested submodules first
for sub in "${nested_submodules[@]}"; do
    squash_repo "$sub"
done

# Update nested submodule pointers in liqid-showcase
cd apps/liqid-showcase
git add src/components/Apps/phonebooth
git commit -m "chore: update nested submodule pointers after squash" --allow-empty
cd ../..

# Squash submodules
for sub in "${submodules[@]}"; do
    squash_repo "$sub"
done

# Update submodule pointers in root
git add "${submodules[@]}"
git commit -m "chore: update submodule pointers after squash" --allow-empty

# Squash root repo
squash_repo "."

echo "--------------------------------------------------"
echo "All repositories have been squashed and force pushed!"
