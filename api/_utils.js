const MAX_TEXT_LENGTH = 1200;

export function json(res, statusCode, payload) {
  res.status(statusCode).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

export function methodNotAllowed(res) {
  return json(res, 405, { ok: false, error: 'Method not allowed' });
}

export function cleanString(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, MAX_TEXT_LENGTH);
}

export function cleanEmail(value) {
  return cleanString(value).toLowerCase();
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhone(value) {
  return /^[+\d][\d\s().-]{5,}$/.test(value);
}

export function requireFields(payload, fields) {
  const missing = fields.filter((field) => !cleanString(payload[field]));
  return missing;
}

export function getClientMeta(req) {
  return {
    userAgent: req.headers['user-agent'] || '',
    referer: req.headers.referer || req.headers.referrer || '',
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
    createdAt: new Date().toISOString(),
  };
}

export async function forwardLead(type, lead) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info('[lead]', type, lead);
    return { forwarded: false };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, lead }),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed with ${response.status}`);
  }

  return { forwarded: true };
}
