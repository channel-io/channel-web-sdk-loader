declare global {
  interface Window {
    ChannelIO?: IChannelIO;
    ChannelIOInitialized?: boolean;
  }
}

interface IChannelIO {
  c?: (...args: any) => void;
  q?: [methodName: string, ...args: any[]][];
  (...args: any): void;
}

interface BootOption {
  appearance?: string;
  customLauncherSelector?: string;
  hideChannelButtonOnBoot?: boolean;
  hidePopup?: boolean;
  language?: string;
  memberHash?: string;
  memberId?: string;
  pluginKey: string;
  profile?: Profile;
  trackDefaultEvent?: boolean;
  trackUtmSource?: boolean;
  unsubscribe?: boolean;
  unsubscribeEmail?: boolean;
  unsubscribeTexting?: boolean;
  zIndex?: number;
}

interface Callback {
  (error: Error | null, user: CallbackUser | null): void;
}

interface CallbackUser {
  alert: number
  avatarUrl: string;
  id: string;
  language: string;
  memberId: string;
  name?: string;
  profile?: Profile | null;
  tags?: string[] | null;
  unread: number;
  unsubscribeEmail: boolean;
  unsubscribeTexting: boolean;
}

interface UpdateUserInfo {
  language?: string;
  profile?: Profile | null;
  profileOnce?: Profile;
  tags?: string[] | null;
  unsubscribeEmail?: boolean;
  unsubscribeTexting?: boolean;
}

interface Profile {
  [key: string]: string | number | boolean | null;
}

interface FollowUpProfile {
  name?: string | null;
  mobileNumber?: string | null;
  email?: string | null;
}

interface EventProperty {
  [key: string]: string | number | boolean | null;
}

type Appearance = 'light' | 'dark' | 'system' | null;

function init() {
  (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.")}var ch:IChannelIO=function(){ch.c?.(arguments)};ch.q=[];ch.c=function(args){ch.q?.push(args)};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x)}}if(document.readyState==="complete"){l()}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l)}})();
}

function boot(option: BootOption, callback?: Callback) {
  window.ChannelIO?.('boot', option, callback);
}

function shutdown() {
  window.ChannelIO?.('shutdown');
}

function showMessenger() {
  window.ChannelIO?.('showMessenger');
}

function hideMessenger() {
  window.ChannelIO?.('hideMessenger');
}

function openChat(chatId?: string | number, message?: string) {
  window.ChannelIO?.('openChat', chatId, message);
}

function track(eventName: string, eventProperty?: EventProperty) {
  window.ChannelIO?.('track', eventName, eventProperty);
}

function onShowMessenger(callback: () => void) {
  window.ChannelIO?.('onShowMessenger', callback);
}

function onHideMessenger(callback: () => void) {
  window.ChannelIO?.('onHideMessenger', callback);
}

function onBadgeChanged(callback: (unread: number, alert: number) => void) {
  window.ChannelIO?.('onBadgeChanged', callback);
}

function onChatCreated(callback: () => void) {
  window.ChannelIO?.('onChatCreated', callback);
}

function onFollowUpChanged(callback: (profile: FollowUpProfile) => void) {
  window.ChannelIO?.('onFollowUpChanged', callback);
}

function onUrlClicked(callback: (url: string) => void) {
  window.ChannelIO?.('onUrlClicked', callback);
}

function clearCallbacks() {
  window.ChannelIO?.('clearCallbacks');
}

function updateUser(userInfo: UpdateUserInfo, callback?: Callback) {
  window.ChannelIO?.('updateUser', userInfo, callback);
}

function addTags(tags: string[], callback?: Callback) {
  window.ChannelIO?.('addTags', tags, callback);
}

function removeTags(tags: string[], callback?: Callback) {
  window.ChannelIO?.('removeTags', tags, callback);
}

function setPage(page: string) {
  window.ChannelIO?.('setPage', page);
}

function resetPage() {
  window.ChannelIO?.('resetPage');
}

function showChannelButton() {
  window.ChannelIO?.('showChannelButton');
}

function hideChannelButton() {
  window.ChannelIO?.('hideChannelButton');
}

function setAppearance(appearance: Appearance) {
  window.ChannelIO?.('setAppearance', appearance);
}

export default {
  init,
  boot,
  shutdown,
  showMessenger,
  hideMessenger,
  openChat,
  track,
  onShowMessenger,
  onHideMessenger,
  onBadgeChanged,
  onChatCreated,
  onFollowUpChanged,
  onUrlClicked,
  clearCallbacks,
  updateUser,
  addTags,
  removeTags,
  setPage,
  resetPage,
  showChannelButton,
  hideChannelButton,
  setAppearance,
}