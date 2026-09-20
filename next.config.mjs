import withMarkdoc from '@markdoc/next.js'

import withSearch from './src/markdoc/search.mjs'

/**
 * @markdoc/next.js reuses Next's shared SWC loader, which has no `bundleLayer`.
 * Since Next 16.2 that makes `page.md` compile as a client module, rejecting
 * its `metadata` export. Markdoc pages are server components, so pin the layer.
 */
function withMarkdocServerLayer(nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config = nextConfig.webpack ? nextConfig.webpack(config, options) : config

      for (const rule of config.module.rules) {
        if (!Array.isArray(rule.use)) continue
        if (!rule.use.some((u) => u?.loader?.includes('@markdoc/next.js')))
          continue

        rule.use = rule.use.map((u) =>
          u === options.defaultLoaders.babel
            ? { ...u, options: { ...u.options, bundleLayer: 'rsc' } }
            : u,
        )
      }

      return config
    },
  })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
}

export default withSearch(
  withMarkdocServerLayer(
    withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
  ),
)
