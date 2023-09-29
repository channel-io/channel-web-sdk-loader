# channel-web-sdk-loader

![npm](https://img.shields.io/npm/v/%40channel.io%2Fchannel-web-sdk-loader)
![NPM](https://img.shields.io/npm/l/%40channel.io%2Fchannel-web-sdk-loader)
![npm](https://img.shields.io/npm/dm/%40channel.io/channel-web-sdk-loader)

> Official Channel Web SDK Loader

## Links
- [Official SDK Docs](https://developers.channel.io/docs/web-channelio)
- [TypeDoc](https://channel-io.github.io/channel-web-sdk-loader/)

## Install
```bash
npm install @channel.io/channel-web-sdk-loader
```

## Usage
> ⚠️ **Use the SDK on client-side only.**
You can’t execute the SDK beforehand on the server-side.

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