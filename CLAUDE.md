# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for Walnut Admin, a full-stack admin template. The documentation is built with VitePress and supports bilingual content (Chinese and English, though currently primarily Chinese).

**Related Repositories:**
- Frontend: https://github.com/Zhaocl1997/walnut-admin-client
- Backend: https://github.com/Zhaocl1997/walnut-admin-server
- Live Demo: https://www.walnut-admin.com/

## Development Commands

```bash
# Install dependencies (pnpm only)
pnpm install

# Start dev server (runs on port 8886, auto-opens browser)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code (auto-fix)
pnpm format

# Update dependencies interactively
pnpm taze
```

## Architecture

### VitePress Configuration

The VitePress config is split across multiple files in `.vitepress/config/`:

- `index.ts` - Main config entry, combines shared + locale configs
- `shared.ts` - Shared settings (title, base URL, sitemap, logo, social links)
- `zh.ts` - Chinese locale config (nav, sidebar, search, footer)
- `en.ts` - English locale config (currently minimal/unused)

**Key config details:**
- Dev server runs on port 8886 with auto-open
- Source files are in `src/` directory
- URL rewrites: `zh-CN/:rest*` → `:rest*` (Chinese is the root locale)
- Plugins: pagefind (search), tabs (markdown tabs), mermaid (diagrams)

### Content Structure

```
src/
├── zh-CN/              # Chinese content (primary)
│   ├── content/        # Main documentation
│   │   ├── frontend/   # Frontend docs (components, hooks, plugins, etc.)
│   │   ├── backend/    # Backend docs (CORS, MongoDB, etc.)
│   │   └── shared/     # Shared docs (security, authentication, etc.)
│   ├── record/         # Development records (server, docker, redis, nginx, etc.)
│   ├── announcement/   # Version announcements
│   ├── index.md        # Homepage
│   └── support.md      # Support page
├── en-US/              # English content (minimal, mostly unused)
└── public/             # Static assets
```

### Theme Customization

Custom theme in `.vitepress/theme/index.ts`:

- Extends VitePress default theme
- Registers global components: `<WPageTitle>`, `<WFrontLink>`, `<WBaseLink>`
- Integrates mermaid renderer with dark mode support (switches between 'dark' and 'forest' themes)
- Integrates tabs plugin for tabbed content blocks

**Custom Components** (`.vitepress/components/`):
- `PageTitle.vue` - Custom page title component
- `FrontLink.vue` - Link to frontend repo
- `BaseLink.vue` - Base link component with additional features

### Markdown Features

The site uses several markdown extensions:

1. **Tabs** - Via `vitepress-plugin-tabs`:
   ```markdown
   :::tabs
   == Tab 1
   Content 1
   == Tab 2
   Content 2
   :::
   ```

2. **Mermaid Diagrams** - Via `vitepress-mermaid-renderer`:
   - Supports all mermaid diagram types
   - Auto-switches theme based on dark mode
   - Used extensively in security documentation (e.g., `src/zh-CN/content/shared/sign.md`)

3. **Image Lazy Loading** - Enabled by default

### Version Management

The `scripts/fetch-version.js` script fetches the latest release version from the walnut-admin-client GitHub repo and writes it to `version.json`. This version is displayed in the navigation bar.

## Code Style

- Uses `@antfu/eslint-config` (minimal config in `eslint.config.mjs`)
- Pre-commit hook runs `lint-staged` to auto-fix all staged files
- Package manager is locked to pnpm via `preinstall` script

## Important Notes

1. **Language**: The primary language is Chinese (`zh-CN`). When editing content, maintain consistency with existing Chinese documentation style.

2. **Mermaid Diagrams**: When editing mermaid diagrams (especially in security docs like `sign.md`), ensure they remain valid and render correctly in both light and dark modes.

3. **Navigation/Sidebar**: When adding new pages, update the corresponding arrays in `.vitepress/config/zh.ts` (or `en.ts` for English).

4. **Custom Components**: The three custom components (`WPageTitle`, `WFrontLink`, `WBaseLink`) are globally registered and can be used in any markdown file.

5. **Dead Links**: Currently `ignoreDeadLinks: true` is set in config - this should be addressed eventually.

6. **Locale Structure**: The root locale is Chinese (via rewrites), so Chinese content appears at `/` while English would be at `/en-US/`.
