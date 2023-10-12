# channel-web-sdk-loader

![npm](https://img.shields.io/npm/v/%40channel.io%2Fchannel-web-sdk-loader)
![NPM](https://img.shields.io/npm/l/%40channel.io%2Fchannel-web-sdk-loader)
![npm](https://img.shields.io/npm/dm/%40channel.io/channel-web-sdk-loader)

> Official Channel Web SDK Loader

## Links
- [Official Developer Documentation](https://developers.channel.io/docs/web-channelio)
- [TypeDoc](https://channel-io.github.io/channel-web-sdk-loader/)

## Install
```bash
npm install @channel.io/channel-web-sdk-loader
```

## Usage
> ⚠️ The SDK is intended for client-side use only and should not be executed on the server-side.

### Step1: Import ChannelService
```typescript
import * as ChannelService from '@channel.io/channel-web-sdk-loader';
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
- You can obtain a [plugin key](https://developers.channel.io/docs/web-boot-option#pluginkey) from the [Desk application](https://developers.channel.io/docs/glossary#desk).
- For more details, please check out [the official documentation](https://developers.channel.io/docs/sdk#get-a-plugin-key).

## API References
- [TypeDoc](https://channel-io.github.io/channel-web-sdk-loader/)