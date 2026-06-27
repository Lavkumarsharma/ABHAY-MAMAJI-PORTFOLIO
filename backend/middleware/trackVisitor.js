import Visitor from '../models/Visitor.js';

export const trackVisitor = async (req, res, next) => {
  try {
    // Only track GET requests (e.g. initial loads, portfolio visits) and not admin or analytics routes
    if (req.method === 'GET' && !req.path.includes('/api/analytics') && !req.path.includes('/api/users')) {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      const userAgent = req.headers['user-agent'] || '';
      const page = req.query.page || req.originalUrl || '/';
      
      await Visitor.create({
        ip,
        userAgent,
        page,
        timestamp: new Date()
      });
    }
  } catch (error) {
    console.error('Visitor tracking error:', error.message);
  }
  next();
};
