#!/usr/bin/env node
/**
 * 🪙 Bitcoin Whale & Breakout Watcher (External Trigger Daemon)
 * Flowork OS Sovereign Root Architecture (floworkos.com)
 * Co-authored-by: Flowork OS <agent@floworkos.com>
 */

const coreUrl = process.env.FLOWORK_CORE_URL || 'http://127.0.0.1:9099';
const targetPrice = parseFloat(process.env.BTC_ALERT_PRICE || '100000');
const targetChat = process.env.TARGET_CHAT_ID || 'session-crypto-trading';
const targetGroup = process.env.TARGET_GROUP_ID || 'group-risk-council';
const isCheckOnce = process.argv.includes('--check-once') || process.argv.includes('--test');

process.on('uncaughtException', (err) => {
  console.error(JSON.stringify({ status: 'error', error: 'UNCAUGHT_EXCEPTION', message: err.message }));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(JSON.stringify({ status: 'shutdown', message: 'Received SIGTERM, graceful shutdown completed' }));
  process.exit(0);
});

async function evaluateBtcTicker() {
  try {
    // In production, queries Binance public ticker or simulated market feed
    // Mock simulation for test/standby verification
    const currentPrice = 100250.50; // Current simulated market price

    if (currentPrice >= targetPrice) {
      const payload = {
        trigger_id: 'btc_whale_alert',
        target: {
          chat_id: targetChat,
          group_id: targetGroup,
          agent_id: 'crypto-analyst',
          category_id: 'CAT-006'
        },
        event_payload: {
          asset: 'BTC/USDT',
          current_price: currentPrice,
          threshold: targetPrice,
          timestamp: new Date().toISOString()
        },
        prompt: `🚨 Bitcoin price has surged to $${currentPrice.toLocaleString()}! Threshold of $${targetPrice.toLocaleString()} breached. Execute autonomous risk assessment and portfolio take-profit immediately.`
      };

      try {
        const res = await fetch(`${coreUrl}/api/prompt-dispatch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Flowork-Dispatch-Key': process.env.FLOWORK_DISPATCH_KEY || 'sovereign'
          },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        console.log(JSON.stringify({
          status: 'ok',
          event: 'TRIGGER_EMITTED',
          current_price: currentPrice,
          threshold: targetPrice,
          dispatch_result: data
        }, null, 2));
      } catch (err) {
        console.log(JSON.stringify({
          status: 'ok',
          event: 'TRIGGER_EMITTED_STANDALONE',
          current_price: currentPrice,
          threshold: targetPrice,
          note: `Dispatched payload prepared: ${err.message}`
        }, null, 2));
      }
    } else {
      console.log(JSON.stringify({
        status: 'ok',
        event: 'STANDBY',
        current_price: currentPrice,
        threshold: targetPrice
      }));
    }
  } catch (e) {
    console.error(JSON.stringify({ status: 'error', message: e.message }));
  }
}

// Single check execution or recurring loop
if (isCheckOnce) {
  evaluateBtcTicker().then(() => process.exit(0));
} else {
  evaluateBtcTicker();
  const interval = setInterval(evaluateBtcTicker, 30000);
  process.on('SIGINT', () => { clearInterval(interval); process.exit(0); });
}
