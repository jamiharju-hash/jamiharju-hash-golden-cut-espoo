import {
  cleanEmail,
  cleanString,
  forwardLead,
  getClientMeta,
  isEmail,
  isPhone,
  json,
  methodNotAllowed,
} from './_utils.js';

const allowedAmounts = new Set(['30', '50', '75', '100', 'custom']);

export default async function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res);

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const buyerName = cleanString(payload.buyerName);
    const buyerEmail = cleanEmail(payload.buyerEmail);
    const buyerPhone = cleanString(payload.buyerPhone);
    const recipientName = cleanString(payload.recipientName);
    const amount = cleanString(payload.amount || '50');
    const customAmount = cleanString(payload.customAmount);
    const message = cleanString(payload.message);
    const source = cleanString(payload.source || 'gift_card_form');

    const missing = [];
    if (!buyerName) missing.push('buyerName');
    if (!buyerEmail && !buyerPhone) missing.push('buyerEmail_or_buyerPhone');
    if (!recipientName) missing.push('recipientName');
    if (!allowedAmounts.has(amount)) missing.push('amount');
    if (amount === 'custom' && !customAmount) missing.push('customAmount');
    if (missing.length) return json(res, 400, { ok: false, error: 'Missing required fields', missing });
    if (buyerEmail && !isEmail(buyerEmail)) return json(res, 400, { ok: false, error: 'Invalid email' });
    if (buyerPhone && !isPhone(buyerPhone)) return json(res, 400, { ok: false, error: 'Invalid phone' });

    const lead = {
      buyerName,
      buyerEmail,
      buyerPhone,
      recipientName,
      amount,
      customAmount: amount === 'custom' ? customAmount : '',
      message,
      source,
      meta: getClientMeta(req),
    };

    const forwarding = await forwardLead('gift_card', lead);
    return json(res, 200, { ok: true, ...forwarding });
  } catch (error) {
    console.error(error);
    return json(res, 500, { ok: false, error: 'Internal server error' });
  }
}
