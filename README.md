# OAuth Callback Tester

A minimalistic, static OAuth callback testing tool that supports multiple OAuth flows and response modes.

**Live URL:** <https://oauth-callback-tester.vercel.app/>

Built with v0.dev.

## Features

- **Multiple OAuth Flows**: Authorization Code, Implicit, OIDC, PKCE
- **Multiple Response Modes**: Query parameters and URL fragments
- **JWT Decoding**: Automatically decodes JWTs and displays headers and claims
- **Copy to Clipboard**: Easy copying of individual parameters
- **Static Deployment**: No server-side code, deployable anywhere
- **Fast Loading**: Minimal dependencies, optimized for speed

## Usage

1. Deploy this app to any static hosting service
2. Use the deployed URL as your OAuth callback URI in your OAuth provider settings
3. When OAuth redirects to your callback URL, all parameters will be displayed
4. If no parameters are present, the app shows setup instructions with your callback URL

## Deployment

This is a static Next.js app configured for export.

### Build for Static Export

\`\`\`bash
npm install
npm run build
\`\`\`

The static files will be in the `out` directory.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

## How It Works

The app runs entirely in the browser:
- Reads URL parameters from both query string and hash fragment
- Detects and decodes JWT tokens (id_token, access_token)
- Displays all OAuth parameters with copy functionality
- No server-side processing or data storage
