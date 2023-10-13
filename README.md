# channel-web-sdk-loader

![npm](https://img.shields.io/npm/v/%40channel.io%2Fchannel-web-sdk-loader)
![NPM](https://img.shields.io/npm/l/%40channel.io%2Fchannel-web-sdk-loader)
![npm](https://img.shields.io/npm/dm/%40channel.io/channel-web-sdk-loader)

> The Official [Channel SDK](https://developers.channel.io/docs/sdk) Loader for Web

## Quick Links
- [Official Developer Documentation](https://developers.channel.io/docs/web-channelio)
- [TypeDoc API Reference](https://channel-io.github.io/channel-web-sdk-loader/)

## Installation
```bash
npm install @channel.io/channel-web-sdk-loader
```

## Usage
> ⚠️ Note: This SDK is designed for client-side use only and should not be invoked on the server-side.

### Step1: Import the ChannelService Module
```typescript
import * as ChannelService from '@channel.io/channel-web-sdk-loader';
```

### Step2: Load the Channel Web SDK
```typescript
ChannelService.loadScript()
```

### Step3: Initialize the Channel Web SDK
```typescript
ChannelService.boot({
  pluginKey: 'YOUR_PLUGIN_KEY'
})
```
- Obtain your [plugin key](https://developers.channel.io/docs/web-boot-option#pluginkey) from the [Desk application](https://developers.channel.io/docs/glossary#desk).
- For additional information, please consult the [the official documentation](https://developers.channel.io/docs/sdk#get-a-plugin-key).

## API Documentation
- [TypeDoc API Reference](https://channel-io.github.io/channel-web-sdk-loader/)