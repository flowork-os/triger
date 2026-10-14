---
name: iot-weather-ambience-runbook
title: IoT Weather & Room Illuminance Ambience Operational Runbook
version: 1.0.0
description: Operational SOP for launching, testing, and managing the IoT Weather & Room Illuminance active external trigger daemon in Flowork OS.
keywords:
  - iot
  - weather
  - lighting
  - illuminance
  - sensor
  - trigger
  - active
  - threshold
  - dispatch
  - watcher
  - automation
  - smarthome
  - ambient
  - telemetry
  - daemon
  - session
  - group
  - transparency
  - sovereign
  - exit_code_zero
exclude_keywords:
  - cryptocurrency
  - stock_market
  - finance_trading
author: "Flowork Sovereign Core"
co_authored_by: "Flowork OS <agent@floworkos.com>"
---

# 💡 IOT WEATHER & ROOM ILLUMINANCE AMBIENCE — OPERATIONAL RUNBOOK

> **Trigger Identity:** `iot_weather_ambience`  
> **Mode:** Active Autonomous Wakeup Dispatcher  
> **Target Organ:** `external_triger/iot_weather_ambience`  
> **Co-authored-by:** Flowork OS <agent@floworkos.com>

---

## 📌 1. Operational Overview
The `iot_weather_ambience` trigger monitors room lighting and weather conditions. When darkness or stormy overcast drops room illuminance below 50 lux during daylight hours, it wakes up the smart home agent to turn on ambient lighting.

---

## 🛠️ 2. Verification & Testing

### A. Run Single-Check Mock Test
Verify the watcher executes cleanly and evaluates thresholds with Exit Code 0:
```bash
node external_triger/iot_weather_ambience/watcher.mjs --check-once
```

Expected JSON Output:
```json
{
  "status": "ok",
  "event": "TRIGGER_EMITTED",
  "current_lux": 32,
  "threshold": 50
}
```

### B. Daemon Execution (Background Service)
Launch the watcher in long-running background mode:
```bash
node external_triger/iot_weather_ambience/watcher.mjs
```

---

## 🔍 3. Targeted Chat Transparency
When triggered, this module dispatches to `/api/prompt-dispatch` targeting:
* `chat_id`: `session-smart-home`
* `group_id`: `group-home-automation`
* `agent_id`: `default`

The event is permanently preserved in the target session's chat history with full telemetry data.
