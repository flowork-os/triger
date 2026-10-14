# 💡 IOT WEATHER & ROOM ILLUMINANCE AMBIENCE — TRIGGER CONTRACT

> **Organ**: `external_triger/iot_weather_ambience`  
> **Category**: `CAT-014` (Automation & Admin)  
> **Mode**: Active Autonomous Wakeup Dispatcher  
> **Co-authored-by**: Flowork OS <agent@floworkos.com>

---

## 1. Trigger Definition

```yaml
trigger:
  id: iot_weather_ambience
  category_id: CAT-014
  category: automation_admin
  mode: active
  scopes:
    - default_solo
    - default_group
  events:
    - iot.illuminance_dropped
    - weather.storm_detected
  conditions:
    iot.illuminance_lux: "< 50"
    weather.sky_condition: "== thunderstorm_overcast"
  dispatch_target:
    chat_id: session-smart-home
    group_id: group-home-automation
    agent_id: default
```

## 2. Evaluation Syntax (UNCE)
* Operator: `<`
* Threshold: `50` Lux
* Action: Immediate targeted dispatch to `session-smart-home` and `group-home-automation`.
