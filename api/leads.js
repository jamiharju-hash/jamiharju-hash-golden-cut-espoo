import {
  cleanEmail,
  cleanString,
  forwardLead,
  getClientMeta,
  isEmail,
  isPhone,
  json,
  methodNotAllowed,
  requireFields,
} from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res);

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const type = cleanString(payload.type || 'contact');
    const name = cleanString(payload.name);
    const email = cleanEmail(payload.email);
    const phone = cleanString(payload.phone);
    const message = cleanString(payload.message);
    const source = cleanString(payload.source || 'website');

    const missing = requireFields({ name, message }, ['name', 'message']);
    if (!email && !phone) missing.push('email_or_phone');
    if (missing.length) return json(res, 400, { ok: false, error: 'Missing required fields', missing });
    if (email && !isEmail(email)) return json(res, 400, { ok: false, error: 'Invalid email' });
    if (phone && !isPhone(phone)) return json(res, 400, { ok: false, error: 'Invalid phone' });

    const lead = {
      type,
      name,
      email,
      phone,
      message,
      source,
      meta: getClientMeta(req),
    };

    const forwarding = await forwardLead(type, lead);
    return json(res, 200, { ok: true, ...forwarding });
  } catch (error) {
    console.error(error);
    return json(res, 500, { ok: false, error: 'Internal server error' });
  }
}
