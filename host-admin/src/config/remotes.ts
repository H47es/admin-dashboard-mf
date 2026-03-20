export const remotes = {
    users: process.env.USERS_REMOTE || "http://localhost:3001",
    analytics: process.env.ANALYTICS_REMOTE || "http://localhost:3002",
    shared: process.env.SHARED_REMOTE || "http://localhost:3003"
};