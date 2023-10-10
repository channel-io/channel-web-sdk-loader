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

/**
 * @see https://developers.channel.io/docs/web-user-object
 */
export interface User {
  /**
   * - The number of important notifications that the user has not read.
   * - It is displayed as a number on the channel button.
   * @see https://developers.channel.io/docs/web-user-object#alert
   */
  alert: number
  /** The avatar image URL of a user. */
  avatarUrl: string;
  /** The id of a user */
  id: string;
  /**
   * - The language of a user.
   * - Used for translation.
   * - Set by updateUser and language of boot option.
   * - Following 32 languages supported.
   *   - 'de'(German), 'hi'(Hindi), 'no'(Norwegian), 'ru'(Russian), 'fi'(Finnish), 'pt'(Portuguese), 'hr'(Croatian), 'fr'(French), 'hu'(Hungarian), 'uk'(Ukrainian), 'sk'(Slovak), 'ca'(Catalan), 'sv'(Swedish), 'ko'(Korean), 'id'(Indonesian), 'ms'(Malay), 'el'(Greek), 'en'(English), 'it'(Italian), 'es'(Spanish), 'he'(Hebrew), 'zh'(Chinese), 'cs'(Czech), 'ar'(Arabic), 'vi'(Vietnamese),'th'(Thai), 'ja'(Japanese), 'pl'(Polish), 'ro'(Romanian), 'da'(Danish), 'nl'(Dutch), 'tr'(Turkish)
   * @see https://developers.channel.io/docs/web-user-object#language
   */
  language: string;
  /**
   * - The id used for identifying a member user.
   * - If you set memberId in the boot option, the user is regarded as a member user.
   * @see https://developers.channel.io/docs/web-user-object#memberid
   */
  memberId: string;
  /**
   * - The name of a user
   * - Set by updateUser
   * @see https://developers.channel.io/docs/web-user-object#name
   */
  name?: string;
  /**
   * - A user's profile information.
   * - Set by updateUser or profile of boot option.
   * @see https://developers.channel.io/docs/web-user-object#profile
   */
  profile?: Profile | null;
  /**
   * - The tags of a user.
   * - Always lowercase.
   * - Set by updateUser, addTags, or removeTags.
   * @see https://developers.channel.io/docs/web-user-object#tags
   */
  tags?: string[] | null;
  /**
   * - The number of all unread notifications the user has not read.
   * - It includes the number of alert. It is displayed as a red dot on the channel button.
   * @see https://developers.channel.io/docs/web-user-object#unread
   */
  unread: number;
  /**
   * - Whether to unsubscribe the marketing email.
   * - Set by updateUser or unsubscribeEmail of boot option.
   * @see https://developers.channel.io/docs/web-user-object#unsubscribeemail
   */
  unsubscribeEmail: boolean;
  /**
   * - Whether to unsubscribe the marketing email.
   * - Set by updateUser or unsubscribeTexting of boot option.
   * @see https://developers.channel.io/docs/web-user-object#unsubscribetexting
   */
  unsubscribeTexting: boolean;
}

/**
 * - When it fails, the callback passes an error object at the first argument, null at the second argunent.
 * - When it succeeds, the callback passes null at the first argument, an user object at the second argument.
 */
export type Callback = (error: Error | null, user: User | null) => void;

/**
 * - A User’s profile information.
 * - Set by updateUser or profile of boot option.
 * @see https://developers.channel.io/docs/web-user-object#profile
 */
export interface Profile {
  [key: string]: string | number | boolean | null;
}

/**
 * - light: Use the light theme.
 * - dark: Use the dark theme.
 * - system: Follow the System theme.
 * - null: Follow the desk's theme setting.
 * @see https://developers.channel.io/docs/web-boot-option#appearance
 */
export type Appearance = 'light' | 'dark' | 'system' | null;

const isSSR = typeof window === 'undefined';

/**
 * - Load the Channel SDK script.
 * - This method is only executable on browser.
 * - If Channel SDK script is already loaded, this method does nothing.
 */
export function loadScript() {
  if(isSSR) {
    console.error('loadScript is only executable on browser.');
    return;
  }

  (function() {
    var w = window;
    if (w.ChannelIO) {
      return;
    }
    var ch: IChannelIO = function() {
      ch.c?.(arguments);
    };
    ch.q = [];
    ch.c = function(args) {
      ch.q?.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      var x = document.getElementsByTagName('script')[0];
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    }
    if (document.readyState === 'complete') {
      l();
    } else {
      w.addEventListener('DOMContentLoaded', l);
      w.addEventListener('load', l);
    }
  })();
}

/** @see https://developers.channel.io/docs/web-boot-option */
export interface BootOption {
  /**
   * - Set the initial appearance of the theme.
   * - The default value is null.
   */
  appearance?: Appearance;
  /**
   * - string	The CSS Selector to select custom launcher.
   * - Use when you customize default chat button.
   * @see https://developers.channel.io/docs/web-boot-option#customlauncherselector
   */
  customLauncherSelector?: string;
  /**
   * - Set whether to hide the default chat button.
   * - The default value is false.
   */
  hideChannelButtonOnBoot?: boolean;
  /**
   * - Set whether to hide the marketing pop-ups and the message alarm pop-ups.
   * - The default value is false.
   */
  hidePopup?: boolean;
  /**
   * - Set the default value of the language.
   * - Texts differ based on the language.
   * - When a user is created newly, the user’s language is set as the language.
   * - language doesn’t change the user’s language already created.
   * @see https://developers.channel.io/docs/web-boot-option#language
   */
  language?: 'en' | 'ko' | 'ja';
  /** Set the hashed value of the memberId using HMAC-SHA256. */
  memberHash?: string;
  /**
   * The id of member user.
   * @see https://developers.channel.io/docs/web-boot-option#memberid
   */
  memberId?: string;
  /**
   * The plugin key of your channel.
   * @see https://developers.channel.io/docs/web-boot-option#pluginkey
   */
  pluginKey: string;
  /**
   * Set the user’s profile.
   * @see https://developers.channel.io/docs/web-boot-option#profile
   */
  profile?: Profile;
  /**
   * - Set whether to track the default event(PageView) or not.
   * - The default value is true.
   * @see https://developers.channel.io/docs/web-boot-option#trackdefaultevent
   */
  trackDefaultEvent?: boolean;
  /**
   * - Set whether to track the UTM source and referrer or not.
   * - The default value is true.
   * @see https://developers.channel.io/docs/web-boot-option#trackutmsource
   */
  trackUtmSource?: boolean;
  /**
   * - Set whether to unsubscribe marketing email and SMS for the user.
   * - The default value is false.
   */
  unsubscribe?: boolean;
  /**
   * - Set whether to unsubscribe marketing email for the user.
   * - The default value is false.
   */
  unsubscribeEmail?: boolean;
  /**
   * - Set whether to unsubscribe marketing SMS for the user.
   * - The default value is false.
   */
  unsubscribeTexting?: boolean;
  /**
   * - Set the z-index of the elements made by the SDK.
   * - Applied at chat button, messenger, and marketing pop-up.
   * - The default value is 10000000.
   * @see https://developers.channel.io/docs/web-boot-option#zindex
   */
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
  if(isSSR) {
    console.error('boot is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before boot().');
    return;
  }
  window.ChannelIO('boot', option, callback);
}

/**
 * Stop all operations of the SDK and initialize internal data.
 */
export function shutdown() {
  if(isSSR) {
    console.error('shutdown is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before shutdown().');
    return;
  }
  window.ChannelIO('shutdown');
}

/**
 * Show the messenger.
 * @see https://developers.channel.io/docs/web-channelio#showmessenger
 * @see https://developers.channel.io/docs/glossary#messenger
 */
export function showMessenger() {
  if(isSSR) {
    console.error('showMessenger is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before showMessenger().');
    return;
  }
  window.ChannelIO('showMessenger');
}

/**
 * Hide the messenger.
 * @see https://developers.channel.io/docs/web-channelio#hidemessenger
 * @see https://developers.channel.io/docs/glossary#messenger
 */
export function hideMessenger() {
  if(isSSR) {
    console.error('hideMessenger is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before hideMessenger().');
    return;
  }
  window.ChannelIO('hideMessenger');
}

/**
 * - Open a chat.
 * - A new chat is opened if you pass an empty value to chatId. In this case, if you pass a message, the message is entered in the input. If the support bot is active, the support bot runs.
 * - The chat is opened if the chat with the given chatId exists. In this case, a message is ignored. The lounge is opened if the chat doesn't exist.
 * - If you use openChat outside of the click event handler, it may not work properly in the Safari browser on the mobile device.
 * @param {string | number | undefined} chatId
 * @param {string | undefined} message - Message to enter in the input
 * @see https://developers.channel.io/docs/web-channelio#openchat
 */
export function openChat(chatId?: string | number, message?: string) {
  if(isSSR) {
    console.error('openChat is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before openChat().');
    return;
  }
  window.ChannelIO('openChat', chatId, message);
}

export interface EventProperty {
  [key: string]: string | number | boolean | null;
}
/**
 * - Track an event.
 * - If you track a new event that has never been created, the event is newly created.
 * - It takes a few minutes to a few hours to see the event at the desk.
 * @param {string} eventName - The name of the event. Max 30 characters are allowed.
 * @param {EventProperty | undefined} eventProperty - The property of the event.
 * @see https://developers.channel.io/docs/web-channelio#track
 * @see https://developers.channel.io/docs/event
 */
export function track(eventName: string, eventProperty?: EventProperty) {
  if(isSSR) {
    console.error('track is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before track().');
    return;
  }
  window.ChannelIO('track', eventName, eventProperty);
}

/**
 * Register a callback invoked when the messenger is shown.
 * @param {Function} callback
 */
export function onShowMessenger(callback: () => void) {
  if(isSSR) {
    console.error('onShowMessenger is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before onShowMessenger().');
    return;
  }
  window.ChannelIO('onShowMessenger', callback);
}

/**
 * Register a callback invoked when the messenger is hidden.
 * @param {Function} callback
 */
export function onHideMessenger(callback: () => void) {
  if(isSSR) {
    console.error('onHideMessenger is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before onHideMessenger().');
    return;
  }
  window.ChannelIO('onHideMessenger', callback);
}

/**
 * @param {number} unread - unread is the number of all unread notifications the user has not read. It includes the number of alert. It is displayed as a red dot on the channel button.
 * @param {number} alert - alert is the number of important notifications that the user has not read. It is displayed as a number on the channel button.
 * @see https://developers.channel.io/docs/web-channelio#onbadgechanged
 * @see https://developers.channel.io/docs/web-customization
 */
export type BadgeChangedCallback = (unread: number, alert: number) => void;
/**
 * Register a callback invoked when the count of messages that the user has not yet read.
 * @param {BadgeChangedCallback} callback
 * @see https://developers.channel.io/docs/web-channelio#onbadgechanged
 * @see https://developers.channel.io/docs/glossary#channel-button
 * @see https://developers.channel.io/docs/web-customization
 */
export function onBadgeChanged(callback: BadgeChangedCallback) {
  if(isSSR) {
    console.error('onBadgeChanged is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before onBadgeChanged().');
    return;
  }
  window.ChannelIO('onBadgeChanged', callback);
}

/**
 * Register a callback invoked when a chat is created.
 * @param {Function} callback 
 */
export function onChatCreated(callback: () => void) {
  if(isSSR) {
    console.error('onChatCreated is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before onChatCreated().');
    return;
  }
  window.ChannelIO('onChatCreated', callback);
}

export interface FollowUpProfile {
  /** The name of a user. */
  name?: string | null;
  /** The mobile number of a user. It follows E.164 format. */
  mobileNumber?: string | null;
  /** The email of a user. */
  email?: string | null;
}
export type FollowUpChangedCallback = (profile: FollowUpProfile) => void;
/**
 * Register a callback invoked when the user changes the user’s profile.
 * @param {FollowUpChangedCallback} callback - The callback invoked when the user changes the user’s profile. It receives the profile object as the argument.
 * @see https://developers.channel.io/docs/web-channelio#onfollowupchanged
 */
export function onFollowUpChanged(callback: FollowUpChangedCallback) {
  if(isSSR) {
    console.error('onFollowUpChanged is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before onFollowUpChanged().');
    return;
  }
  window.ChannelIO('onFollowUpChanged', callback);
}


export type UrlClickedCallback = (url: string) => void;
/**
 * - Register a callback invoked when the user clicks a link.
 * - The links that the user can click include the following list.
 *   - Link button/text in marketing pop-up
 *   - Link button/text sent by manager in chat
 * @param {UrlClickedCallback} callback - The callback invoked when the user clicks a link. It receives the URL of the link as the argument.
 * @see https://developers.channel.io/docs/web-channelio#onurlclicked
 */
export function onUrlClicked(callback: UrlClickedCallback) {
  if(isSSR) {
    console.error('onUrlClicked is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before onUrlClicked().');
    return;
  }
  window.ChannelIO('onUrlClicked', callback);
}

/**
 * - Clear all callbacks registered by following APIs.
 *   - onShowMessenger
 *   - onHideMessenger
 *   - onBadgeChanged
 *   - onChatCreated
 *   - onFollowUpChanged
 *   - onUrlClicked
 * @see https://developers.channel.io/docs/web-channelio#clearcallbacks
 */
export function clearCallbacks() {
  if(isSSR) {
    console.error('clearCallbacks is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before clearCallbacks().');
    return;
  }
  window.ChannelIO('clearCallbacks');
}

/** @see https://developers.channel.io/docs/web-channelio#updateuser */
export interface UpdateUserInfo {
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
 * @see https://developers.channel.io/docs/web-channelio#updateuser
 */
export function updateUser(userInfo: UpdateUserInfo, callback?: Callback) {
  if(isSSR) {
    console.error('updateUser is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before updateUser().');
    return;
  }
  window.ChannelIO('updateUser', userInfo, callback);
}

/**
 * Add a user’s tags.
 * @param {string[]} tags - If the same tag exists, only one tag is added. Max 10 tags allowed. Always lowercase.
 * @param {Callback} callback - If it fails, the callback passes an error object at the first argument, null at the second argument. If it succeeds, the callback passes null at the first argument, a user object at the second argument.
 * @see https://developers.channel.io/docs/web-channelio#addtags
 */
export function addTags(tags: string[], callback?: Callback) {
  if(isSSR) {
    console.error('addTags is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before addTags().');
    return;
  }
  window.ChannelIO('addTags', tags, callback);
}

/**
 * Remove a user’s tags.
 * @param {string[]} tags - If the corresponding tag don’t exist, that tag is ignored. null or an empty array([]) not allowed.
 * @param {Callback} callback - If fails, the callback passes an error object at the first argument, null at the second argument. If succeeds, the callback passes null at the first argument, a user object at the second argument.
 * @see https://developers.channel.io/docs/web-channelio#removetags
 */
export function removeTags(tags: string[], callback?: Callback) {
  if(isSSR) {
    console.error('removeTags is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before removeTags().');
    return;
  }
  window.ChannelIO('removeTags', tags, callback);
}

/**
 * - Set page.
 * - Page can be used instead of canonical URL.
 * @param {string} page - The page value to change. Don’t pass null or undefined to page. To reset the page, use resetPage.
 * @see https://developers.channel.io/docs/web-channelio#setpage
 * @see https://developers.channel.io/docs/page
 * @see https://developers.channel.io/docs/canonical-url
 */
export function setPage(page: string) {
  if(isSSR) {
    console.error('setPage is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before setPage().');
    return;
  }
  window.ChannelIO('setPage', page);
}

/**
 * - Reset the page value set by setPage.
 * - If you use resetPage, the canonical URL is used as the page value.
 * @see https://developers.channel.io/docs/web-channelio#resetpage
 */
export function resetPage() {
  if(isSSR) {
    console.error('resetPage is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before resetPage().');
    return;
  }
  window.ChannelIO('resetPage');
}

/**
 * - Show the channel button.
 * - After boot, channel button shows without showChannelButton.
 * - Only when you set hideChannelButtonOnBoot to true or call hideChannelButton, you should manually execute showChannelButton.
 * @see https://developers.channel.io/docs/web-channelio#showchannelbutton
 */
export function showChannelButton() {
  if(isSSR) {
    console.error('showChannelButton is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before showChannelButton().');
    return;
  }
  window.ChannelIO('showChannelButton');
}

/**
 * Hide the channel button.
 * @see https://developers.channel.io/docs/web-channelio#hidechannelbutton
 */
export function hideChannelButton() {
  if(isSSR) {
    console.error('hideChannelButton is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before hideChannelButton().');
    return;
  }
  window.ChannelIO('hideChannelButton');
}

/**
 * Set the appearance of the theme.
 * @param {Appearance} appearance
 */
export function setAppearance(appearance: Appearance) {
  if(isSSR) {
    console.error('setAppearance is only executable on browser.');
    return;
  }
  if(!window.ChannelIO) {
    console.error('ChannelIO is not loaded. Please call loadScript() before setAppearance().');
    return;
  }
  window.ChannelIO('setAppearance', appearance);
}
