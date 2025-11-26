import fs from 'node:fs'

async function run() {
  const owner = 'walnut-admin'
  const repo = 'walnut-admin-client'

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    {
      headers: {
        // 重要：避免 GitHub Rate Limit
        'User-Agent': 'vitepress-version-fetcher',
      },
    },
  )

  const data = await res.json()

  const version = data.tag_name || 'unknown'

  fs.writeFileSync(
    './version.json',
    JSON.stringify({ version }, null, 2),
    'utf8',
  )

  console.log('Fetched version:', version)
}

run()
