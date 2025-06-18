module.exports = {
  apps: [
    {
      name: "web",
      script: "server/entry.bun.js",
      interpreter: "bun",
    },
    {
      name: "ws",
      script: "subscriptions/server.ts",
      interpreter: "bun",
    },
    {
      name: "nginx",
      script: 'nginx -g "daemon off;"',
    }
  ]
}