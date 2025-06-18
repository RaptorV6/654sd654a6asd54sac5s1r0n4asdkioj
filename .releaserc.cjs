module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x', // maintenance branches
    'stable', // production branch (in gitlab flow perspective)
    { channel: 'next', name: 'next', prerelease: 'rc' },
    { channel: 'beta', name: 'canary', prerelease: 'beta' },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        // eslint-disable-next-line no-template-curly-in-string
        prepareCmd: "npm --no-git-tag-version --allow-same-version version ${nextRelease.version.replace(/^v/i, '')}",
      },
    ],
    ['@semantic-release/gitlab', { gitlabUrl: 'https://gitlab.akesoapp.cz' }],
    ['@semantic-release/git', { assets: ['CHANGELOG.md', 'package.json'] }],
  ],
  preset: 'conventionalcommits',
};
