**web-app-fronend**

```
|      |
| HTTP |
|SOCKET|
|      |
```

**web-app-backend**

```
|    |
|HTTP|
|    |
```

**iot-agent**

Listening to provision request:  
sub to `+apikey/provision/request`  
pub to `+apikey/provision/response`

Listening to telemetry request:  
sub to `+apikey/telemetry/data`  
pub to `+apikey/telemetry/response`

Send command request:  
pub to `+apikey/command/request`  
sub to `+apikey/command/response`

```
|    |
|MQTT|
|    |
```

**MOSQUITTO broker**

```
|    |
|MQTT|
|    |
```

**gateway**
Send provision request:  
pub to `+apikey/provision/request`  
sub to `+apikey/provision/response`

Send telemetry request:  
pub to `+apikey/telemetry/data`  
sub to `+apikey/telemetry/response`

Listening to command request:  
sub to `+apikey/command/request`  
pub to `+apikey/command/response`
