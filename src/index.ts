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

interface Profile {
  [key: string]: string | number | boolean | null;
}

type Appearance = 'light' | 'dark' | 'system' | null;

/**
 * Load the Channel SDK script.
 */
export function loadScript() {
  (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.")}var ch:IChannelIO=function(){ch.c?.(arguments)};ch.q=[];ch.c=function(args){ch.q?.push(args)};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x)}}if(document.readyState==="complete"){l()}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l)}})();
}

interface BootOption {
  appearance?: Appearance;
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
/**
 * - Initialize for the SDK.
 * - Channel button shows up, and features like marketing pop-up are ready to operate.
 * @param {BootOption} option - A boot option to initialize SDK.
 * @param {Callback | undefined} callback - Callback called after boot. When boot fails, the callback passes an error object at the first argument, null at the second argunent. When boot succeeds, the callback passes null at the first argument, a user object at the second argument.
 * @see https://developers.channel.io/docs/glossary#boot
 * @see https://developers.channel.io/docs/web-boot-option
 * @see https://developers.channel.io/docs/web-user-object
 */
export function boot(option: BootOption, callback?: Callback) {
  window.ChannelIO?.('boot', option, callback);
}

/**
 * Stop all operations of the SDK and initialize internal data.
 */
export function shutdown() {
  window.ChannelIO?.('shutdown');
}

/**
 * Show the messenger.
 * @see https://developers.channel.io/docs/glossary#messenger
 */
export function showMessenger() {
  window.ChannelIO?.('showMessenger');
}

/**
 * Hide the messenger.
 * @see https://developers.channel.io/docs/glossary#messenger
 */
export function hideMessenger() {
  window.ChannelIO?.('hideMessenger');
}

/**
 * - Open a chat.
 * - A new chat is opened if you pass an empty value to chatId. In this case, if you pass a message, the message is entered in the input. If the support bot is active, the support bot runs.
 * - The chat is opened if the chat with the given chatId exists. In this case, a message is ignored. The lounge is opened if the chat doesn't exist.
 * - If you use openChat outside of the click event handler, it may not work properly in the Safari browser on the mobile device.
 * @param {string | number | undefined} chatId
 * @param {string | undefined} message - Message to enter in the input
 */
export function openChat(chatId?: string | number, message?: string) {
  window.ChannelIO?.('openChat', chatId, message);
}

interface EventProperty {
  [key: string]: string | number | boolean | null;
}
/**
 * - Track an event.
 * - If you track a new event that has never been created, the event is newly created.
 * - It takes a few minutes to a few hours to see the event at the desk.
 * @param {string} eventName - The name of the event. Max 30 characters are allowed.
 * @param {EventProperty | undefined} eventProperty - The property of the event.
 * @see https://developers.channel.io/docs/event
 */
export function track(eventName: string, eventProperty?: EventProperty) {
  window.ChannelIO?.('track', eventName, eventProperty);
}

/**
 * Register a callback invoked when the messenger is shown.
 * @param {Function} callback
 */
export function onShowMessenger(callback: () => void) {
  window.ChannelIO?.('onShowMessenger', callback);
}

/**
 * Register a callback invoked when the messenger is hidden.
 * @param {Function} callback
 */
export function onHideMessenger(callback: () => void) {
  window.ChannelIO?.('onHideMessenger', callback);
}

/**
 * - unread is the number of all unread notifications the user has not read. It includes the number of alert. It is displayed as a red dot on the channel button.
 * - alert is the number of important notifications that the user has not read. It is displayed as a number on the channel button.
 */
type BadegChangedCallback = (unread: number, alert: number) => void;
/**
 * Register a callback invoked when the count of messages that the user has not yet read.
 * @param {BadegChangedCallback} callback
 * @see https://developers.channel.io/docs/glossary#channel-button
 * @see https://developers.channel.io/docs/web-customization
 */
export function onBadgeChanged(callback: BadegChangedCallback) {
  window.ChannelIO?.('onBadgeChanged', callback);
}

/**
 * Register a callback invoked when a chat is created.
 * @param {Function} callback 
 */
export function onChatCreated(callback: () => void) {
  window.ChannelIO?.('onChatCreated', callback);
}

interface FollowUpProfile {
  name?: string | null;
  /** The mobile number of a user. It follows E.164 format. */
  mobileNumber?: string | null;
  email?: string | null;
}
type FollowUpChangedCallback = (profile: FollowUpProfile) => void;
/**
 * Register a callback invoked when the user changes the user’s profile.
 * @param {FollowUpChangedCallback} callback - The callback invoked when the user changes the user’s profile. It receives the profile object as the argument.
 */
export function onFollowUpChanged(callback: FollowUpChangedCallback) {
  window.ChannelIO?.('onFollowUpChanged', callback);
}


type UrlClickedCallback = (url: string) => void;
/**
 * - Register a callback invoked when the user clicks a link.
 * - The links that the user can click include the following list.
 *   - Link button/text in marketing pop-up
 *   - Link button/text sent by manager in chat
 * @param {UrlClickedCallback} callback - The callback invoked when the user clicks a link. It receives the URL of the link as the argument.
 */
export function onUrlClicked(callback: UrlClickedCallback) {
  window.ChannelIO?.('onUrlClicked', callback);
}

/**
 * - Clear all callbacks registered by following APIs.
 *   - onShowMessenger
 *   - onHideMessenger
 *   - onBadgeChanged
 *   - onChatCreated
 *   - onFollowUpChanged
 *   - onUrlClicked
 */
export function clearCallbacks() {
  window.ChannelIO?.('clearCallbacks');
}

interface UpdateUserInfo {
  /**
   * - If language is ‘ko’ or ‘ja’, UI text inside ChannelTalk changes with that language.
   * - Otherwise, UI text is set with English.
   */
  language?: string;
  /**
   * - If you pass null, the whole profile is initialized.
   * - If you pass null to the specific field inside profile object, that specific field is initialized.
   * - An empty object is not allowed.
   * - The name of the field must follow Camel Case.
   * - If you pass mobileNumber, it must follow e.164 format.
   */
  profile?: Profile | null;
  /** Among the fields inside profileOnce object, only the fields with no existing value are added. */
  profileOnce?: Profile;
  /**
   * - Max 10 tags are allowed.
   * - If you pass null, tags are initialized.
   * - An empty array([]) is not allowed.
   */
  tags?: string[] | null;
  /**
   * - Set whether the user subscribes to the marketing email.
   * - Terminates subscription if the value is true.
   */
  unsubscribeEmail?: boolean;
  /**
   * - Set whether the user subscribes to the marketing SMS.
   * - Terminates subscription if the value is true.
   */
  unsubscribeTexting?: boolean;
}
/**
 * Update user’s information.
 * @param {UpdateUserInfo} userInfo - Object with user’s information.
 * @param {Callback} callback - When it fails, the callback passes an error object at the first argument, null at the second argument. When it succeeds, the callback passes null at the first argument, an user object at the second argument.
 * @see https://developers.channel.io/docs/web-user-object
 */
export function updateUser(userInfo: UpdateUserInfo, callback?: Callback) {
  window.ChannelIO?.('updateUser', userInfo, callback);
}

/**
 * Add a user’s tags.
 * @param {string[]} tags - If the same tag exists, only one tag is added. Max 10 tags allowed. Always lowercase.
 * @param {Callback} callback - If it fails, the callback passes an error object at the first argument, null at the second argument. If it succeeds, the callback passes null at the first argument, a user object at the second argument.
 * @see https://developers.channel.io/docs/web-user-object
 */
export function addTags(tags: string[], callback?: Callback) {
  window.ChannelIO?.('addTags', tags, callback);
}

/**
 * Remove a user’s tags.
 * @param {string[]} tags - If the corresponding tag don’t exist, that tag is ignored. null or an empty array([]) not allowed.
 * @param {Callback} callback - If fails, the callback passes an error object at the first argument, null at the second argument. If succeeds, the callback passes null at the first argument, a user object at the second argument.
 * @see https://developers.channel.io/docs/web-user-object
 */
export function removeTags(tags: string[], callback?: Callback) {
  window.ChannelIO?.('removeTags', tags, callback);
}

/**
 * - Set page.
 * - Page can be used instead of canonical URL.
 * @param {string} page - The page value to change. Don’t pass null or undefined to page. To reset the page, use resetPage.
 * @see https://developers.channel.io/docs/page
 * @see https://developers.channel.io/docs/canonical-url
 */
export function setPage(page: string) {
  window.ChannelIO?.('setPage', page);
}

/**
 * - Reset the page value set by setPage.
 * - If you use resetPage, the canonical URL is used as the page value.
 * @see https://developers.channel.io/docs/page
 * @see https://developers.channel.io/docs/canonical-url
 */
export function resetPage() {
  window.ChannelIO?.('resetPage');
}

/**
 * - Show the channel button.
 * - After boot, channel button shows without showChannelButton.
 * - Only when you set hideChannelButtonOnBoot to true or call hideChannelButton, you should manually execute showChannelButton.
 * @see https://developers.channel.io/docs/glossary#channel-button
 */
export function showChannelButton() {
  window.ChannelIO?.('showChannelButton');
}

/**
 * Hide the channel button.
 * @see https://developers.channel.io/docs/glossary#channel-button
 */
export function hideChannelButton() {
  window.ChannelIO?.('hideChannelButton');
}

/**
 * Set the appearance of the theme.
 * @param {Appearance} appearance
 */
export function setAppearance(appearance: Appearance) {
  window.ChannelIO?.('setAppearance', appearance);
}
