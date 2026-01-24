# SSH Key Setup - Quick Reference

## Your SSH Public Key
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBkz8/1S9azx1nIKA5nHtNfJsC/aP90l3l6tr/a9/KNL personal-github
```

## Add to GitHub
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: `Personal PC - Digital_Me`
4. Paste the key above
5. Click "Add SSH key"

## Test Connection
After adding the key, run:
```powershell
ssh -T git@github.com
```

You should see: "Hi Geck018! You've successfully authenticated..."

## Push Your Code
```powershell
git push -u origin main
```

## What's Been Configured
- ✅ SSH key generated: `~/.ssh/id_ed25519_personal`
- ✅ SSH config updated to use personal key for github.com
- ✅ Remote URL set to SSH: `git@github.com:Geck018/Digital_Me.git`
- ✅ Local git user: `Geck018` (repo-specific)

## Note
This SSH key is separate from any work keys, so it won't interfere with your work repositories.
