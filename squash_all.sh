#!/bin/bash

# Function to squash a repo
squash_repo() {
    local dir=$1
    echo "--------------------------------------------------"
    echo "Squashing $dir..."
    
    local original_dir=$(pwd)
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
    echo "Force pushing to origin..."
    git push -u origin main --force || git push -u origin master --force
    
    # Return to original directory
    cd "$original_dir"
    echo "Finished squashing $dir"
}

# Confirm before squashing
echo "=================================================="
echo "WARNING: This will SQUASH all commit history!"
echo "This is a DESTRUCTIVE operation and cannot be undone."
echo "=================================================="
read -p "Are you absolutely sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

# Nested submodules (inside libraries/liqid)
nested_submodules=(
    "libraries/liqid/liqid-components"
    "libraries/liqid/liqid-ui"
)

# App submodules
app_submodules=(
    "apps/liqid-docs"
    "apps/liqid-showcase"
    "apps/phonebooth"
    "apps/tradebot"
    "apps/pokedex"
)

# Squash nested submodules first
echo "=================================================="
echo "Squashing nested submodules in libraries/liqid"
echo "=================================================="
for sub in "${nested_submodules[@]}"; do
    squash_repo "$sub"
done

# Squash libraries/liqid submodule itself
echo "=================================================="
echo "Squashing libraries/liqid submodule"
echo "=================================================="
squash_repo "libraries/liqid"

# Squash app submodules
echo "=================================================="
echo "Squashing application submodules"
echo "=================================================="
for sub in "${app_submodules[@]}"; do
    squash_repo "$sub"
done

# Update submodule pointers in root
echo "=================================================="
echo "Updating submodule pointers in root"
echo "=================================================="
git add libraries/liqid "${nested_submodules[@]}" "${app_submodules[@]}"
git commit -m "chore: update submodule pointers after squash" --allow-empty

# Squash root repo
echo "=================================================="
echo "Squashing root repository"
echo "=================================================="
squash_repo "."

echo "--------------------------------------------------"
echo "All repositories have been squashed and force pushed!"

