# Cloudflare Pages Deployment

This project is configured for deployment on Cloudflare Pages.

## Build Configuration

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (project root)

**Important**: Do NOT use `wrangler.toml` or `wrangler.jsonc` files for GitHub-integrated Pages deployments. These files are for Workers and will cause deployment failures. The build settings in the Cloudflare dashboard are sufficient.

## GitHub Integration

The repository is already linked to GitHub:
- **Repository**: `git@github.com:Geck018/Digital_Me.git`

## Deployment Methods

### Method 1: GitHub Integration (Recommended - Automatic Deployments)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Log in with your account: `marriesteyngcko@gmail.com`
3. Navigate to **Pages** in the sidebar
4. Click **Create a project**
5. Select **Connect to Git**
6. Authorize Cloudflare to access your GitHub account (if not already done)
7. Select the repository: `Geck018/Digital_Me`
8. Configure the build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
9. Click **Save and Deploy**

After setup, every push to your GitHub repo will automatically trigger a new deployment!

### Method 2: CLI Deployment (Manual)

If you prefer to deploy manually via CLI:

1. **First-time setup**: Login to Cloudflare
   ```bash
   npx wrangler login
   ```

2. **Build and deploy**:
   ```bash
   npm run deploy
   ```
   
   Or manually:
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=digital-cv
   ```

**Note**: Make sure you've created the Pages project in the Cloudflare dashboard first (even if empty) so the project name exists.

## SPA Routing

The `_redirects` file in the `public` folder ensures that all routes are redirected to `index.html` for proper React Router functionality.

## Environment Variables

If you need to add environment variables:
1. Go to your Pages project settings
2. Navigate to **Environment Variables**
3. Add your variables for Production, Preview, or both

## Custom Domain

To add a custom domain:
1. Go to your Pages project settings
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow the DNS configuration instructions
