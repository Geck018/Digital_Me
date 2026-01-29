# Cloudflare Pages Deployment Troubleshooting

## Build Configuration Checklist

Make sure these settings are correct in your Cloudflare Pages dashboard:

### Build Settings
- **Framework preset**: `Vite` (or `None` if Vite isn't available)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty or set to `/`)
- **Node.js version**: `22.16.0` (should auto-detect from `.nvmrc`)

### Common Issues and Solutions

#### Issue 1: Build Times Out
**Solution**: The build should complete in under 30 seconds. If it times out:
- Check that all dependencies are in `package.json`
- Ensure `node_modules` is in `.gitignore` (it should be)
- Verify the build works locally: `npm run build`

#### Issue 2: "Build output directory not found"
**Solution**: 
- Verify build output directory is set to `dist` (not `./dist` or `/dist`)
- Check that `vite.config.js` has `outDir: 'dist'`
- Ensure the build actually creates a `dist` folder

#### Issue 3: "Module not found" errors
**Solution**:
- Run `npm install` locally to ensure `package-lock.json` is up to date
- Commit `package-lock.json` to your repository
- Check that all dependencies are listed in `package.json`

#### Issue 4: Build succeeds but site doesn't load
**Solution**:
- Verify `_redirects` file exists in `public/` folder (it should be copied to `dist/`)
- Check that `index.html` is in the `dist` folder after build
- Ensure `vite.config.js` has `copyPublicDir: true`

#### Issue 5: SPA routing doesn't work
**Solution**:
- Verify `public/_redirects` contains: `/*    /index.html   200`
- Check that `_redirects` is copied to `dist/` after build
- Ensure Cloudflare Pages is using the `_redirects` file (should be automatic)

## Verification Steps

1. **Test build locally**:
   ```bash
   npm run build
   ```
   Should create `dist/` folder with:
   - `index.html`
   - `assets/` folder
   - `_redirects` file
   - `data/` folder (if exists)
   - `media/` folder (if exists)

2. **Check build output**:
   ```bash
   dir dist
   ```
   Should show all necessary files

3. **Verify in Cloudflare Dashboard**:
   - Go to your Pages project
   - Check "Builds" tab for error details
   - Look at the full build log (not just the beginning)

## Getting Full Error Details

In Cloudflare Pages dashboard:
1. Go to your project
2. Click on the failed build
3. Scroll down to see the full error message
4. Look for any red error text or stack traces

## Quick Fixes

If build keeps failing:
1. **Clear build cache**: In Cloudflare Pages settings → Builds → Clear cache
2. **Redeploy**: Trigger a new deployment
3. **Check Node version**: Ensure `.nvmrc` specifies `22.16.0`
4. **Verify Git connection**: Make sure Cloudflare can access your GitHub repo

## Still Having Issues?

Share the complete error log from Cloudflare Pages (not just the beginning) so we can diagnose the specific issue.
