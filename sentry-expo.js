import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN', // Replace with your Sentry DSN
  enableInExpoDevelopment: true,
  debug: true, // Set to false in production
});

export default Sentry; 