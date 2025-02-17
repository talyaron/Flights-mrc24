# Syncing Your Fork with the Original Repository

This guide explains how to get the latest updates from an original repository (upstream) to your fork using GitHub Desktop and GitKraken.

## GitHub Desktop

### Setting Up Upstream Remote (First Time Only)
1. Open GitHub Desktop
2. Go to Repository → Repository Settings
3. Under "Remote" section, click "Add"
4. Add the URL of the original repository you forked from
5. Name it "upstream"
6. Click "Save"

### Pulling Updates
1. Click on the "Current Branch" dropdown
2. Select "Choose a branch to merge into [your branch]"
3. Select "upstream/main" (or whatever the main branch is called in the original repo)
4. Click "Merge into [your branch]"

## GitKraken

### Setting Up Upstream Remote (First Time Only)
1. Open GitKraken
2. Click on the "+" next to "REMOTE" in the left panel
3. Select "Add Remote"
4. Name it "upstream"
5. Enter the URL of the original repository
6. Click "Add Remote"

### Pulling Updates
1. Right-click on your local branch
2. Select "Pull (Fast-Forward if possible)"
3. Choose "upstream/main" (or the relevant branch from the original repo)

## Troubleshooting

If you encounter merge conflicts:

1. Both tools will show you the conflicts
2. Choose which changes to keep:
   - Keep your changes
   - Keep upstream changes
   - Keep both changes
3. Commit the resolved conflicts
4. Push your changes to your fork

## Best Practices

1. Always pull from upstream before starting new work
2. Create feature branches for your changes
3. Keep your fork's main branch clean and in sync with upstream
4. Push to your fork regularly
5. Create pull requests from your feature branches

## Additional Notes

- The main branch might be called "main" or "master" depending on the repository
- Make sure you have the necessary permissions to access the upstream repository
- Consider backing up your local changes before syncing with upstream
- If you're unsure about any steps, consult your team or the repository maintainers