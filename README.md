# channel-web-sdk-loader
> Official Channel Web SDK Loader

## Links
- [Official SDK Docs](https://developers.channel.io/docs/web-channelio)
- [TypeDoc](https://channel-io.github.io/channel-web-sdk-loader/)

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

### Step3: Initialize Channel Web SDK
```typescript
ChannelService.boot({
  pluginKey: 'YOUR_PLUGIN_KEY'
})
```

## API References
- [TypeDoc](https://channel-io.github.io/channel-web-sdk-loader/)