#!/bin/bash

# Default commit message if none is provided
COMMIT_MSG=${1:-"Auto-commit: Update portfolio UI and animations"}

echo "🚀 Adding changes to git..."
git add .

echo "📝 Committing with message: '$COMMIT_MSG'"
git commit -m "$COMMIT_MSG"

echo "☁️  Pushing to remote..."
git push

echo "✅ Successfully pushed to repository!"
