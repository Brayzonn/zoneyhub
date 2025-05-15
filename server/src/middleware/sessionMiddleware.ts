import session, { SessionOptions } from 'express-session';

const sessionConfig: SessionOptions = {
      secret: process.env.SESSION_SECRET || 'dev-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
            maxAge: 100 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production', 
            httpOnly: true,
            sameSite: 'lax',
      }
};

export default session(sessionConfig);


