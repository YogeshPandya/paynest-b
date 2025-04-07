import express from 'express'; // ✅ fixed here
import * as i18n from 'i18n';

const app = express();

i18n.configure({
  locales: ['en', 'hi'],
  directory: __dirname + '/../locales',
  defaultLocale: 'en',
  cookie: 'lang',
  objectNotation: true,
});

app.use(i18n.init);

const setLanguage = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const lang = req.headers['accept-language'];
  if (lang) {
    i18n.setLocale(lang);
  }
  next();
};

export default setLanguage;
