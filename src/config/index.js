import dotenv from "dotenv";
dotenv.config();

const config = {
    env: process.env['ENV'] ?? 'dev',
    port: process.env['PORT'] ?? 3000,
    dbpassword: process.env['DBPASSWORD']
}

export default config;