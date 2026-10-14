---
name: btc-whale-alert-runbook
title: Bitcoin Whale & Price Breakout Watcher Operational Runbook
version: 1.0.0
description: Operational SOP for launching, testing, and managing the Bitcoin Whale Alert active external trigger daemon in Flowork OS.
keywords:
  - bitcoin
  - crypto
  - whale
  - breakout
  - ticker
  - trigger
  - active
  - threshold
  - dispatch
  - watcher
  - finance
  - trading
  - risk
  - websocket
  - daemon
  - session
  - group
  - transparency
  - sovereign
  - exit_code_zero
exclude_keywords:
  - equities
  - stock_nyse
  - forex_pairs
author: "Flowork Sovereign Core"
co_authored_by: "Flowork OS <agent@floworkos.com>"
---

# 🪙 BITCOIN WHALE & PRICE BREAKOUT WATCHER — OPERATIONAL RUNBOOK

> **Trigger Identity:** `btc_whale_alert`  
> **Mode:** Active Autonomous Wakeup Dispatcher  
> **Target Organ:** `external_triger/btc_whale_alert`  
> **Co-authored-by:** Flowork OS <agent@floworkos.com>

---

## 📌 1. Operational Overview
The `btc_whale_alert` trigger is an active, standalone background watcher designed to monitor Bitcoin market pricing and orderbook inflows. When the target threshold is breached, it dispatches an auditable event into the targeted session (`session-crypto-trading` or `group-risk-council`).

---

## 🛠️ 2. Verification & Testing

### A. Run Single-Check Mock Test
Verify the watcher executes cleanly and evaluates thresholds with Exit Code 0:
```bash
node external_triger/btc_whale_alert/watcher.mjs --check-once
```

Expected JSON Output:
```json
{
  "status": "ok",
  "event": "TRIGGER_EMITTED",
  "current_price": 100250.5,
  "threshold": 100000
}
```

### B. Daemon Execution (Background Service)
Launch the watcher in long-running background mode:
```bash
node external_triger/btc_whale_alert/watcher.mjs
```

---

## 🔍 3. Targeted Chat Transparency
When triggered, this module dispatches to `/api/prompt-dispatch` targeting:
* `chat_id`: `session-crypto-trading`
* `group_id`: `group-risk-council`
* `agent_id`: `crypto-analyst`

The event is permanently preserved in the target session's chat history with full telemetry data.
