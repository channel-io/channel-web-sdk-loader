# channel-web-sdk-loader
> Channel Web SDK Loader

## Documentation
- [API Reference](https://developers.channel.io/docs/web-channelio)

## Install
```bash
npm install @channel-io/channel-web-sdk-loader
```

## Usage

### Step1: Import ChannelService
```typescript
import * as ChannelService from '@channel-io/channel-web-sdk-loader';
```

### Step2: Load Channel Web SDK
```typescript
ChannelService.loadScript()
```

### Step3: Initialize Channel SDK
```typescript
ChannelService.boot({
  pluginKey: 'YOUR_PLUGIN_KEY'
})
```


## Example