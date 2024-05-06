export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  envFilePath: ['.env.development.local', '.env.development'],
  ignoreEnvFile: false,
  isGlobal: true,
});
