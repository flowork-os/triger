# 🪙 BITCOIN WHALE & PRICE BREAKOUT WATCHER — TRIGGER CONTRACT

> **Organ**: `external_triger/btc_whale_alert`  
> **Category**: `CAT-006` (Finance)  
> **Mode**: Active Autonomous Wakeup Dispatcher  
> **Co-authored-by**: Flowork OS <agent@floworkos.com>

---

## 1. Trigger Definition

```yaml
trigger:
  id: btc_whale_alert
  category_id: CAT-006
  category: finance
  mode: active
  scopes:
    - default_solo
    - default_group
    - specialist_group
  events:
    - market.price_threshold_crossed
    - market.whale_inflow_detected
  conditions:
    crypto.btc_usdt_price: ">= 100000"
  dispatch_target:
    chat_id: session-crypto-trading
    group_id: group-risk-council
    agent_id: crypto-analyst
```

## 2. Evaluation Syntax (UNCE)
* Operator: `>=`
* Threshold: `100000` USD
* Action: Immediate targeted dispatch to `session-crypto-trading` and `group-risk-council`.
