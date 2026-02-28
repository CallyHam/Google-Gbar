// ==UserScript==
// @name         Google Gbar
// @namespace    https://www.github.com/CallyHam
// @version      1.0.0
// @description  A highly customizable recreation of the gbar.
// @author       CallyHam
// @match        *://*.google.com/*
// @match        *://*.youtube.com/*
// @exclude      *://accounts.google.com/*
// @exclude      *://myaccount.google.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANASURBVHgBxVfPTxNREJ73WmqjNrbxAsToFk4mGsp/sFW8Sr1oEzBdEhOPysmLCfAfFE5eDBU1AsYEEw8mYHY5eKZ48YKynKwnVg1SCrvjvO0Ptku3/KhdvqSb7ex78307O2/eGwbHwHpKjprhjlTAwj76KyFjCQCM0n20MsQABB0YGAwhbwIuB0qmFl/QDC+fDI6AtfQtJYCYQQC5RgSgM8C8y53kGOOExpDngPPl+OxH/cgC1tMDMiKbpreUao4sNh5/u7jsNWeFohQJ8xRHNiYEuZ8z4FljpzTRX4lKQwEi1NaZwDgD9qhsQZ1ZXGlG3Ahr6RuKWwgijPfOL03sC2pAjqGgSk8S9gSAhd87eyP9Tb5jM3xNy9IZDKj253GRNxTw/e7ASpWc2PM980v90CKEiBB2DPbOLU66n9UJ+HbvZtYZ9h1mJq/Oajq0Ebx6IzJ9n5yUUbjaTW7ziAuqndLur7Ba+HBZ2vsTEha9Z+5THHxAJQJc6bhQkrpub0AwUrLfHnxC9RNkxCUY2QUhosjNYy23VsBQvSQDWOq+idZ88ocv4RfgwHHQZdPBR3Ba64k6C2M6+AgSUKvzpwKRhBKcIvgBC2ICfAQJYK5NhkngI0gAune5KH7uugI+gVMx1g5Y9yAFPiEIjOcBrXqrZQuYhBbQ+XhThkMSnDYiOjuqEh0oS5vOBw83r8HMVneyeD+nwQmIaS8Zo/oiHzJUxxIkOUvqlAOoOclf/e2mekROTkJuQR+dfHJ0kqLtHVIohKA16h5LMc8WnsX06nYsUzqoVfIqyMno9nAuCy2iIkx12oTAwlTshV0HWLKgPTCuLzjJbTvAWPiNIkEbUStE74yuESif952ICuXtFFETYIzkDAvhjnsAJZTUThF1pVhkvcUOnoZqIl4qMrRTgC1iKDfhJYIzUM++Vqb/ZzQ8W7PwtCLxIIgGRfKYqJmc5ahnXN0ayuW9fARCIJ//8iTDt8VKq801TFoFP6di7w9tTs/NKIrFIcOgaWGpNKvlJEbRLTP6YVk8L140IqtPNVH2qS7kiwFYNbIx797Q820CJIJDHxWRBBORwbroGKItJ5twnLfFcJY3La4Vh59vePn9B5SSRU22pguXAAAAAElFTkSuQmCC
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// @noframes
// ==/UserScript==
let userInfo = false;
let userEmail;
let userName;
let userPicture;

let oldUserInfo = false;
let oldUserEmail;
let oldUserName;
let oldUserPicture;

let settingsOpen = false;

// Define Presets
const presets = [
  {
    name: "2009",
    theme: "2009",
    layout: [
      {
        type: "link",
        label: "Web",
        url: "https://www.google.com/",
        regex: ["^https://www.google.com/webhp.*$", "^https://www.google.com/search(?!.*(?:(?:\\?|\\&)tbm|(?:\\?|\\&)udm)=).*$"],
      },
      {
        type: "link",
        label: "Images",
        url: "https://www.google.com/imghp",
        regex: ["^https://www.google.com/imghp.*$", "^https://www.google.com/search.*(?:(?:\\?|\\&)udm=2|(?:\\?|\\&)tbm=isch).*$"],
      },
      {
        type: "link",
        label: "Videos",
        url: "https://www.google.com/videohp",
        regex: ["^https://www.google.com/videohp.*$", "^https://www.google.com/search.*(?:(?:\\?|\\&)udm=7|(?:\\?|\\&)tbm=vid).*$"],
      },
      {
        type: "link",
        label: "Maps",
        url: "https://www.google.com/maps",
        regex: ["^https://www.google.com/maps.*$"],
      },
      {
        type: "link",
        label: "News",
        url: "https://news.google.com/",
        regex: ["^https://news.google.com/.*$", "^https://www.google.com/search.*(?:\\?|\\&)tbm=nws.*$"],
      },
      {
        type: "link",
        label: "Shopping",
        url: "https://shopping.google.com/",
        regex: ["^https://shopping.google.com/.*$", "^https://www.google.com/search.*(?:\\?|\\&)tbm=shop.*$"],
      },
      {
        type: "link",
        label: "Gmail",
        url: "https://mail.google.com/",
        regex: ["^https://mail.google.com/.*$"],
      },
      {
        type: "menu",
        label: "more",
        position: "right",
        hover: false,
        url: "https://about.google/products/#all-products",
        items: [
          {
            type: "link",
            label: "Groups",
            url: "https://groups.google.com/",
          },
          {
            type: "link",
            label: "Books",
            url: "https://books.google.com/",
          },
          {
            type: "link",
            label: "Scholar",
            url: "https://scholar.google.com/",
          },
          {
            type: "link",
            label: "Finance",
            url: "https://www.google.com/finance/",
          },
          {
            type: "link",
            label: "Blogs",
            url: "https://www.blogger.com/about/",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "YouTube",
            url: "https://www.youtube.com/",
          },
          {
            type: "link",
            label: "Calendar",
            url: "https://calendar.google.com/",
          },
          {
            type: "link",
            label: "Photos",
            url: "https://photos.google.com/",
          },
          {
            type: "link",
            label: "Documents",
            url: "https://docs.google.com/",
          },
          {
            type: "link",
            label: "Reader",
            url: "https://web.archive.org/web/2009if_/http://www.google.com/reader/view/?hl=en&tab=wy",
          },
          {
            type: "link",
            label: "Sites",
            url: "https://sites.google.com",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "even more »",
            url: "https://about.google/products/#all-products",
          },
        ],
      },
      {
        type: "full_spacer",
      },
      {
        type: "link",
        label: "*{email}",
        account: true,
        url: "https://accounts.google.com/ServiceLogin?continue=https://accounts.google.com/SignOutOptions?continue={url}",
      },
      {
        type: "spacer",
        account: true,
      },
      {
        type: "link",
        label: "iGoogle",
        url: "https://web.archive.org/web/2009if_/http://www.google.com/ig",
      },
      {
        type: "spacer",
      },
      {
        type: "link",
        label: "My Account",
        url: "https://myaccount.google.com/",
        account: true,
      },
      {
        type: "link",
        label: "Search settings",
        url: "https://www.google.com/preferences",
        account: false,
      },
      {
        type: "spacer",
      },
      {
        type: "link",
        label: "Sign in",
        account: false,
        url: "https://accounts.google.com/ServiceLogin?continue={url}",
      },
      {
        type: "link",
        label: "Sign out",
        account: true,
        url: "https://accounts.google.com/Logout?continue={url}",
      },
    ],
  },
  {
    name: "2010",
    theme: "2010",
    layout: [
      {
        type: "link",
        label: "Web",
        url: "https://www.google.com/",
        regex: ["^https://www.google.com/webhp.*$", "^https://www.google.com/search(?!.*(?:(?:\\?|\\&)tbm|(?:\\?|\\&)udm)=).*$$"],
      },
      {
        type: "link",
        label: "Images",
        url: "https://www.google.com/imghp",
        regex: ["^https://www.google.com/imghp.*$", "^https://www.google.com/search.*(?:(?:\\?|\\&)udm=2|(?:\\?|\\&)tbm=isch).*$"],
      },
      {
        type: "link",
        label: "Videos",
        url: "https://www.google.com/videohp",
        regex: ["^https://www.google.com/videohp.*$", "^https://www.google.com/search.*(?:(?:\\?|\\&)udm=7|(?:\\?|\\&)tbm=vid).*$"],
      },
      {
        type: "link",
        label: "Maps",
        url: "https://www.google.com/maps",
        regex: ["^https://www.google.com/maps.*$"],
      },
      {
        type: "link",
        label: "News",
        url: "https://news.google.com/",
        regex: ["^https://news.google.com/.*$", "^https://www.google.com/search.*(?:\\?|\\&)tbm=nws.*$"],
      },
      {
        type: "link",
        label: "Shopping",
        url: "https://shopping.google.com/",
        regex: ["^https://shopping.google.com/.*$", "^https://www.google.com/search.*(?:\\?|\\&)tbm=shop.*$"],
      },
      {
        type: "link",
        label: "Gmail",
        url: "https://mail.google.com/",
        regex: ["^https://mail.google.com/.*$"],
      },
      {
        type: "menu",
        label: "more",
        position: "right",
        hover: false,
        url: "https://about.google/products/#all-products",
        items: [
          {
            type: "link",
            label: "Translate",
            url: "https://translate.google.com/",
          },
          {
            type: "link",
            label: "Books",
            url: "https://books.google.com/",
          },
          {
            type: "link",
            label: "Finance",
            url: "https://www.google.com/finance/",
          },
          {
            type: "link",
            label: "Scholar",
            url: "https://scholar.google.com/",
          },
          {
            type: "link",
            label: "Blogs",
            url: "https://www.blogger.com/about/",
          },
          {
            type: "link",
            label: "Realtime",
            url: "http://web.archive.org/web/20110604120222id_/http://www.google.com/realtime",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "YouTube",
            url: "https://www.youtube.com/",
          },
          {
            type: "link",
            label: "Calendar",
            url: "https://calendar.google.com/",
          },
          {
            type: "link",
            label: "Photos",
            url: "https://photos.google.com/",
          },
          {
            type: "link",
            label: "Documents",
            url: "https://docs.google.com/",
          },
          {
            type: "link",
            label: "Reader",
            url: "https://web.archive.org/web/2010if_/http://www.google.com/reader/view/?hl=en&tab=wy",
          },
          {
            type: "link",
            label: "Sites",
            url: "https://sites.google.com",
          },
          {
            type: "link",
            label: "Groups",
            url: "https://groups.google.com/",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "even more »",
            url: "https://about.google/products/#all-products",
          },
        ],
      },
      {
        type: "full_spacer",
      },
      {
        type: "spacer",
      },
      {
        type: "account_menu",
        label: "{name}",
        position: "left",
        hover: false,
        account: true,
        profile_picture: false,
        url: "https://accounts.google.com/ServiceLogin?continue=https://accounts.google.com/SignOutOptions?continue={url}",
      },
      {
        type: "link",
        label: "<b>Sign in</b>",
        account: false,
        url: "https://accounts.google.com/ServiceLogin?continue={url}",
      },
      {
        type: "spacer",
      },
      {
        type: "menu",
        label: "Settings",
        icon: "settings",
        position: "left",
        hover: false,
        url: "https://www.google.com/preferences",
        items: [
          {
            type: "link",
            label: "Search settings",
            url: "https://www.google.com/preferences",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "iGoogle",
            url: "https://web.archive.org/web/2010if_/https://www.google.com/ig",
          },
        ],
      },
    ],
  },
  {
    name: "2011",
    theme: "2011",
    layout: [
      {
        type: "link",
        label: "Web",
        url: "https://www.google.com/",
        regex: ["^https://www.google.com/webhp.*$", "^https://www.google.com/search(?!.*(?:(?:\\?|\\&)tbm|(?:\\?|\\&)udm)=).*$"],
      },
      {
        type: "link",
        label: "Images",
        url: "https://www.google.com/imghp",
        regex: ["^https://www.google.com/imghp.*$", "^https://www.google.com/search.*(?:(?:\\?|\\&)udm=2|(?:\\?|\\&)tbm=isch).*$"],
      },
      {
        type: "link",
        label: "Videos",
        url: "https://www.google.com/videohp",
        regex: ["^https://www.google.com/videohp.*$", "^https://www.google.com/search.*(?:(?:\\?|\\&)udm=7|(?:\\?|\\&)tbm=vid).*$"],
      },
      {
        type: "link",
        label: "Maps",
        url: "https://www.google.com/maps",
        regex: ["^https://www.google.com/maps.*$"],
      },
      {
        type: "link",
        label: "News",
        url: "https://news.google.com/",
        regex: ["^https://news.google.com/.*$", "^https://www.google.com/search.*(?:\\?|\\&)tbm=nws.*$"],
      },
      {
        type: "link",
        label: "Shopping",
        url: "https://shopping.google.com/",
        regex: ["^https://shopping.google.com/.*$", "^https://www.google.com/search.*(?:\\?|\\&)tbm=shop.*$"],
      },
      {
        type: "link",
        label: "Gmail",
        url: "https://mail.google.com/",
        regex: ["^https://mail.google.com/.*$"],
      },
      {
        type: "menu",
        label: "More",
        position: "right",
        hover: false,
        url: "https://about.google/products/#all-products",
        items: [
          {
            type: "link",
            label: "Translate",
            url: "https://translate.google.com/",
          },
          {
            type: "link",
            label: "Books",
            url: "https://books.google.com/",
          },
          {
            type: "link",
            label: "Finance",
            url: "https://www.google.com/finance/",
          },
          {
            type: "link",
            label: "Scholar",
            url: "https://scholar.google.com/",
          },
          {
            type: "link",
            label: "Blogs",
            url: "https://www.blogger.com/about/",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "YouTube",
            url: "https://www.youtube.com/",
          },
          {
            type: "link",
            label: "Calendar",
            url: "https://calendar.google.com/",
          },
          {
            type: "link",
            label: "Photos",
            url: "https://photos.google.com/",
          },
          {
            type: "link",
            label: "Documents",
            url: "https://docs.google.com/",
          },
          {
            type: "link",
            label: "Sites",
            url: "https://sites.google.com",
          },
          {
            type: "link",
            label: "Groups",
            url: "https://groups.google.com/",
          },
          {
            type: "link",
            label: "Reader",
            url: "https://web.archive.org/web/2010if_/http://www.google.com/reader/view/?hl=en&tab=wy",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "Even more »",
            url: "https://about.google/products/#all-products",
          },
        ],
      },
      {
        type: "full_spacer",
      },
      {
        type: "account_menu",
        label: "{name}",
        position: "left",
        hover: false,
        account: true,
        profile_picture: false,
        url: "https://accounts.google.com/ServiceLogin?continue=https://accounts.google.com/SignOutOptions?continue={url}",
      },
      {
        type: "link",
        label: "<b>Sign in</b>",
        account: false,
        url: "https://accounts.google.com/ServiceLogin?continue={url}",
      },
      {
        type: "spacer",
      },
      {
        type: "menu",
        label: "Settings",
        icon: "settings",
        position: "left",
        hover: false,
        url: "https://www.google.com/preferences",
        items: [
          {
            type: "link",
            label: "Search settings",
            url: "https://www.google.com/preferences",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "iGoogle",
            url: "https://web.archive.org/web/2011if_/http://www.google.com/ig",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "Web History",
            url: "https://www.google.com/history",
          },
        ],
      },
    ],
  },
  {
    name: "2013",
    theme: "2013",
    layout: [
      {
        type: "link",
        label: "+{name}",
        account: true,
        url: "https://accounts.google.com/ServiceLogin?continue=https://accounts.google.com/SignOutOptions?continue={url}",
      },
      {
        type: "link",
        label: "Sign in",
        account: false,
        url: "https://accounts.google.com/ServiceLogin?continue={url}",
      },
      {
        type: "link",
        label: "Search",
        url: "https://www.google.com/",
        regex: ["^https://www.google.com/webhp.*$", "^https://www.google.com/search(?!.*(?:(?:\\?|\\&)tbm|(?:\\?|\\&)udm)=).*$"],
      },
      {
        type: "link",
        label: "Images",
        url: "https://www.google.com/imghp",
        regex: ["^https://www.google.com/imghp.*$", "^https://www.google.com/search.*(?:(?:\\?|\\&)udm=2|(?:\\?|\\&)tbm=isch).*$"],
      },
      {
        type: "link",
        label: "Maps",
        url: "https://www.google.com/maps",
        regex: ["^https://www.google.com/maps.*$"],
      },
      {
        type: "link",
        label: "Play",
        url: "https://play.google.com/",
        regex: ["^https://play.google.com/.*$"],
      },
      {
        type: "link",
        label: "YouTube",
        url: "https://www.youtube.com/",
        regex: ["^https://.*.youtube.com/.*$"],
      },
      {
        type: "link",
        label: "News",
        url: "https://news.google.com/",
        regex: ["^https://news.google.com/.*$", "^https://www.google.com/search.*(?:\\?|\\&)tbm=nws.*$"],
      },
      {
        type: "link",
        label: "Gmail",
        url: "https://mail.google.com/",
        regex: ["^https://mail.google.com/.*$"],
      },
      {
        type: "link",
        label: "Drive",
        url: "https://drive.google.com/",
        regex: ["^https://drive.google.com/.*$"],
      },
      {
        type: "menu",
        label: "More",
        position: "right",
        hover: false,
        url: "https://about.google/products/#all-products",
        items: [
          {
            type: "link",
            label: "Calendar",
            url: "https://calendar.google.com/",
          },
          {
            type: "link",
            label: "Translate",
            url: "https://translate.google.com/",
          },
          {
            type: "link",
            label: "Mobile",
            url: "https://about.google/products/",
          },
          {
            type: "link",
            label: "Books",
            url: "https://books.google.com/",
          },
          {
            type: "link",
            label: "Offers",
            url: "https://pay.google.com/about/",
          },
          {
            type: "link",
            label: "Wallet",
            url: "https://wallet.google.com/",
          },
          {
            type: "link",
            label: "Shopping",
            url: "https://shopping.google.com/",
          },
          {
            type: "link",
            label: "Blogger",
            url: "https://www.blogger.com/about/",
          },
          {
            type: "link",
            label: "Reader",
            url: "https://web.archive.org/web/2013if_/http://www.google.com/reader/about/",
          },
          {
            type: "link",
            label: "Finance",
            url: "https://www.google.com/finance/",
          },
          {
            type: "link",
            label: "Photos",
            url: "https://photos.google.com/",
          },
          {
            type: "link",
            label: "Videos",
            url: "https://www.google.com/videohp",
          },
          {
            type: "spacer",
          },
          {
            type: "link",
            label: "Even more »",
            url: "https://about.google/products/#all-products",
          },
        ],
      },
    ],
  },
];

let customPresets = [];

// Create GBar And Set Values
const gBar = document.createElement("div");
gBar.id = "gbar";

const gBarStyle = document.createElement("style");
gBarStyle.textContent = `
/* Hide conflicting elements */
#gp-gbar,
.gaiabar {
  display: none !important;
}

/* Universal GBar Styling */

/* GBar Item Styling */
#gbar * {
  font-family: Arial, sans-serif !important;
  outline: none !important;
}
#gbar {
  display: flex !important;
  font-size: 13px;
  flex-direction: row;
  position: relative;
  white-space: nowrap;
  width: 100%;
  z-index: 9998;
}
.gbar-item {
  position: relative;
  display: inline-block;
}
.gbar-item-dropdown:has(.gbar-item-icon) > .gbar-item:after {
  display: none !important;
}
.gbar-item-dropdown {
  position: relative;
}
.gbar-full-spacer {
  flex-grow: 1;
}
/* GBar Menu Styling */
.gbar-item-dropdown.active > .gbar-menu {
  display: flex;
}
.gbar-menu {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  z-index: -1;
}
.gbar-menu.left {
  right: 0;
}
.gbar-menu.center {
  left: 50%;
  translate: -50% 0%;
}
.gbar-menu.right {
  left: 0;
}
.gbar-account-menu {
  flex-direction: column;
}
.gbar-account-menu-information {
  display: flex;
  flex-direction: row;
}
.gbar-account-menu-picture {
  width: 48px;
  height: 48px;
}
.gbar-account-menu-details {
  display: flex;
  flex-direction: column;
}
.gbar-account-menu-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* Era Specific Styling */

/* 2009 */
[theme="2009"]#gbar {
  align-items: center;
  height: 25px;
  box-sizing: border-box;
  padding: 0 8px;
  background-color: #fff;
  border-bottom: 1px solid #c9d7f1;
}

[theme="2009"] .gbar-item {
  color: #00c !important;
  line-height: 25px;
  margin-right: calc(0.5em + 4px);
  text-decoration: underline !important;
}

[theme="2009"] .gbar-item.active {
  color: #000 !important;
  font-weight: bold;
  text-decoration: none !important;
  cursor: text !important;
}

[theme="2009"] .gbar-item-dropdown > .gbar-item,
[theme="2009"] .gbar-item:has(+ .gbar-spacer),
[theme="2009"] .gbar-item:has(+ .gbar-full-spacer),
[theme="2009"] .gbar-item-dropdown:has(+ .gbar-spacer),
[theme="2009"] .gbar-item-dropdown:has(+ .gbar-full-spacer),
[theme="2009"] .gbar-item:last-child,
[theme="2009"] .gbar-item-dropdown:last-child {
  margin-right: 0;
}

[theme="2009"] .gbar-spacer::after {
  content: "|";
  text-align: center;
  display: inline-block;
  width: 11px;
}

[theme="2009"] .gbar-item-dropdown {
  height: 25px;
  margin-right: calc(0.5em + 4px);
}

[theme="2009"] .gbar-item-dropdown > .gbar-item:after {
  content: "▼";
  display: inline-block;
  font-size: 11px;
  margin-left: 4px;
}

[theme="2009"] .gbar-menu {
  top: 24px;
  background-color: #fff;
  border-top: 1px solid #c9d7f1;
  border-right: 1px solid #3366cc;
  border-bottom: 1px solid #3366cc;
  border-left: 1px solid #a2bae7;
}

[theme="2009"] .gbar-menu-item {
  color: #00c !important;
  text-decoration: none !important;
  padding: 0.2em 0.5em;
}

[theme="2009"] .gbar-menu-item:hover {
  color: #fff !important;
  background-color: #36c;
  text-decoration: none !important;
  padding: 0.2em 0.5em;
}
[theme="2009"] .gbar-menu-spacer {
  height: 1px;
  background-color: #c9d7f1;
  margin: 0.2em 0.5em;
}
[theme="2009"] .gbar-account-menu-information {
  display: flex;
  flex-direction: column;
}
[theme="2009"] .gbar-account-menu-email {
  font-weight: bold;
  padding: 0.2em 0.5em;
}
/* 2010 */
[theme="2010"]#gbar {
  background: linear-gradient(0deg, #f8f8f8 0%, #ffffff 25%);
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  padding: 0 5px;
  height: 30px;
  box-shadow: inset 0 2px 0 #bad3ea;
}

[theme="2010"] .gbar-item {
  color: #36c;
  height: 100%;
  line-height: 32px;
  padding: 0 7px;
  text-decoration: none !important;
}

[theme="2010"] .gbar-item:hover::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 0;
  width: 100%;
  height: calc(100% - 2px);
  border-top: 1px solid rgba(186, 211, 234, 0.4);
  box-sizing: border-box;
  background: linear-gradient(0deg, rgba(65, 97, 159, 0.12) 0%, rgba(51, 102, 204, 0.08) 25%);
  z-index: -1;
}

[theme="2010"] .gbar-item.active {
  color: #000;
  font-weight: bold;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  box-shadow: inset 0 3px 0 #1a54e1;
}

[theme="2010"] .gbar-item:has(> .gbar-item-icon),
[theme="2011"] .gbar-item:has(> .gbar-item-icon),
[theme="2013"] .gbar-item:has(> .gbar-item-icon) {
  font-size: 0;
}

[theme="2010"] .gbar-item-icon {
  display: inline-block;
  vertical-align: text-bottom;
  pointer-events: none;
}

[theme="2010"] .gbar-item-icon.settings {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjY4NzUgMy42MjVMNC44MTI1IDQuMDYyNUwzLjA2MjUgMi4zMTI1TDEuMzEyNSA0LjA2MjVMMy4wNjI1IDUuODEyNUwyLjYyNSA2LjY4NzVIMFY5LjMxMjVIMi42MjVMMy4wNjI1IDEwLjE4NzVMMS4zMTI1IDExLjkzNzVMMy4wNjI1IDEzLjY4NzVMNC44MTI1IDExLjkzNzVMNS42ODc1IDEyLjM3NVYxNUg4LjMxMjVWMTIuMzc1TDkuMTg3NSAxMS45Mzc1TDEwLjkzNzUgMTMuNjg3NUwxMi42ODc1IDExLjkzNzVMMTAuOTM3NSAxMC4xODc1TDExLjM3NSA5LjMxMjVIMTRWNi42ODc1SDExLjM3NUwxMC45Mzc1IDUuODEyNUwxMi42ODc1IDQuMDYyNUwxMC45Mzc1IDIuMzEyNUw5LjE4NzUgNC4wNjI1TDguMzEyNSAzLjYyNVYxSDUuNjg3NVYzLjYyNVpNNyAxMC40MDYyQzguMzI4OTMgMTAuNDA2MiA5LjQwNjI1IDkuMzI4OTMgOS40MDYyNSA4QzkuNDA2MjUgNi42NzEwNiA4LjMyODkzIDUuNTkzNzUgNyA1LjU5Mzc1QzUuNjcxMDYgNS41OTM3NSA0LjU5Mzc1IDYuNjcxMDYgNC41OTM3NSA4QzQuNTkzNzUgOS4zMjg5MyA1LjY3MTA2IDEwLjQwNjIgNyAxMC40MDYyWiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4yNSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuNjg3NSAyLjYyNUw0LjgxMjUgMy4wNjI1TDMuMDYyNSAxLjMxMjVMMS4zMTI1IDMuMDYyNUwzLjA2MjUgNC44MTI1TDIuNjI1IDUuNjg3NUgwVjguMzEyNUgyLjYyNUwzLjA2MjUgOS4xODc1TDEuMzEyNSAxMC45Mzc1TDMuMDYyNSAxMi42ODc1TDQuODEyNSAxMC45Mzc1TDUuNjg3NSAxMS4zNzVWMTRIOC4zMTI1VjExLjM3NUw5LjE4NzUgMTAuOTM3NUwxMC45Mzc1IDEyLjY4NzVMMTIuNjg3NSAxMC45Mzc1TDEwLjkzNzUgOS4xODc1TDExLjM3NSA4LjMxMjVIMTRWNS42ODc1SDExLjM3NUwxMC45Mzc1IDQuODEyNUwxMi42ODc1IDMuMDYyNUwxMC45Mzc1IDEuMzEyNUw5LjE4NzUgMy4wNjI1TDguMzEyNSAyLjYyNVYwSDUuNjg3NVYyLjYyNVpNNyA5LjQwNjI1QzguMzI4OTMgOS40MDYyNSA5LjQwNjI1IDguMzI4OTMgOS40MDYyNSA3QzkuNDA2MjUgNS42NzEwNiA4LjMyODkzIDQuNTkzNzUgNyA0LjU5Mzc1QzUuNjcxMDYgNC41OTM3NSA0LjU5Mzc1IDUuNjcxMDYgNC41OTM3NSA3QzQuNTkzNzUgOC4zMjg5MyA1LjY3MTA2IDkuNDA2MjUgNyA5LjQwNjI1WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzI1OV8xMSkiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMSA3QzExIDkuMjA5MTQgOS4yMDkxNCAxMSA3IDExQzQuNzkwODYgMTEgMyA5LjIwOTE0IDMgN0MzIDQuNzkwODYgNC43OTA4NiAzIDcgM0M5LjIwOTE0IDMgMTEgNC43OTA4NiAxMSA3Wk03IDEwQzguNjU2ODUgMTAgMTAgOC42NTY4NSAxMCA3QzEwIDUuMzQzMTUgOC42NTY4NSA0IDcgNEM1LjM0MzE1IDQgNCA1LjM0MzE1IDQgN0M0IDguNjU2ODUgNS4zNDMxNSAxMCA3IDEwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zNSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzI1OV8xMSIgeDE9IjciIHkxPSIwIiB4Mj0iNyIgeTI9IjE0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM3MTkzRDYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDYzMDg0Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==);
  background-position: center;
  background-repeat: no-repeat;
  width: 14px;
  height: 15px;
  margin-top: 7px;
}

[theme="2010"] .gbar-item-dropdown.active .gbar-item-icon.settings {
  margin-top: 4px;
}

[theme="2010"] .gbar-spacer {
  width: 1px;
  height: 100%;
  box-sizing: border-box;
  border-top: 2px solid #fff;
  background-color: #e6e6e6;
}

[theme="2010"] .gbar-item-dropdown > .gbar-item:after {
  content: "";
  display: inline-block;
  border-top: 3px solid #36c;
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  padding-top: 1px;
  margin-bottom: 1px;
  margin-left: 4px;
}

[theme="2010"] .gbar-item-dropdown.active > .gbar-item {
  background-color: #fff;
  top: 2px;
  border-top: 1px solid rgba(186, 211, 234, 0.4);
  border-left: 1px solid #c3d1ec;
  border-right: 1px solid #c3d1ec;
  height: calc(100% + 2px);
  padding: 0 6px;
  line-height: 26px;
  box-sizing: border-box;
}

[theme="2010"] .gbar-menu {
  top: calc(100% + 3px);
  background-color: #fff;
  border: 1px solid #c3d1ec;
  box-shadow: 0 1px 5px #ccc;
}

[theme="2010"] .gbar-menu-item {
  color: #36c !important;
  text-decoration: none !important;
  height: 27px;
  line-height: 27px;
  padding: 0 12px 0 6px;
}

[theme="2010"] .gbar-menu-item:hover {
  background-color: #e4ebf8;
}

[theme="2010"] .gbar-menu-spacer {
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
}
[theme="2010"] .gbar-account-menu-information {
  display: flex;
  flex-direction: row;
  padding: 10px 10px 6px 10px;
}
[theme="2010"] .gbar-account-menu-details {
  display: flex;
  flex-direction: column;
}
[theme="2010"] .gbar-account-menu-picture {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e5e5;
  margin-right: 10px;
}
[theme="2010"] .gbar-account-menu-name {
  color: #000;
  font-weight: bold;
  margin-bottom: 1px;
}
[theme="2010"] .gbar-account-menu-email {
  color: #666;
}
[theme="2010"] .gbar-account-menu-links {
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
}
[theme="2010"] .gbar-account-menu-buttons {
  display: flex;
  flex-direction: row;
}
[theme="2010"] .gbar-account-menu-buttons .gbar-menu-item {
  height: 26px;
}
[theme="2010"] .gbar-account-menu .gbar-menu-item {
  padding: 0 10px;
}

/* 2011 */
[theme="2011"]#gbar,
[theme="2013"]#gbar {
  background-color: #2d2d2d;
  border-bottom: 1px solid #000;
  height: 30px;
  box-sizing: border-box;
  padding: 0 5px 0 4px;
}

[theme="2011"] .gbar-item {
  color: #ccc !important;
  line-height: 30px;
  text-decoration: none !important;
  padding: 0 6px;
}

[theme="2011"] .gbar-item:hover {
  background-color: #4c4c4c;
}

[theme="2011"] .gbar-item.active {
  color: #fff !important;
  font-weight: bold;
  box-shadow: inset 0 2px 0 #dd4b39;
}

[theme="2011"] .gbar-item-icon,
[theme="2013"] .gbar-item-icon {
  display: inline-block;
  vertical-align: text-bottom;
  pointer-events: none;
}

[theme="2011"] .gbar-item-icon.settings,
[theme="2013"] .gbar-item-icon.settings {
  display: inline-block;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgNEw1LjUgNC41TDMuNSAyLjVMMS41IDQuNUwzLjUgNi41TDMgNy41SDBWMTAuNUgzTDMuNSAxMS41TDEuNSAxMy41TDMuNSAxNS41TDUuNSAxMy41TDYuNSAxNFYxN0g5LjVWMTRMMTAuNSAxMy41TDEyLjUgMTUuNUwxNC41IDEzLjVMMTIuNSAxMS41TDEzIDEwLjVIMTZWNy41SDEzTDEyLjUgNi41TDE0LjUgNC41TDEyLjUgMi41TDEwLjUgNC41TDkuNSA0VjFINi41VjRaTTggMTEuNzVDOS41MTg3OCAxMS43NSAxMC43NSAxMC41MTg4IDEwLjc1IDlDMTAuNzUgNy40ODEyMiA5LjUxODc4IDYuMjUgOCA2LjI1QzYuNDgxMjIgNi4yNSA1LjI1IDcuNDgxMjIgNS4yNSA5QzUuMjUgMTAuNTE4OCA2LjQ4MTIyIDExLjc1IDggMTEuNzVaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgM0w1LjUgMy41TDMuNSAxLjVMMS41IDMuNUwzLjUgNS41TDMgNi41SDBWOS41SDNMMy41IDEwLjVMMS41IDEyLjVMMy41IDE0LjVMNS41IDEyLjVMNi41IDEzVjE2SDkuNVYxM0wxMC41IDEyLjVMMTIuNSAxNC41TDE0LjUgMTIuNUwxMi41IDEwLjVMMTMgOS41SDE2VjYuNUgxM0wxMi41IDUuNUwxNC41IDMuNUwxMi41IDEuNUwxMC41IDMuNUw5LjUgM1YwSDYuNVYzWk04IDEwLjc1QzkuNTE4NzggMTAuNzUgMTAuNzUgOS41MTg3OCAxMC43NSA4QzEwLjc1IDYuNDgxMjIgOS41MTg3OCA1LjI1IDggNS4yNUM2LjQ4MTIyIDUuMjUgNS4yNSA2LjQ4MTIyIDUuMjUgOEM1LjI1IDkuNTE4NzggNi40ODEyMiAxMC43NSA4IDEwLjc1WiIgZmlsbD0iI0VBRUFFQSIvPgo8L3N2Zz4K);
  background-position: center;
  background-repeat: no-repeat;
  width: 16px;
  height: 17px;
  margin-top: 7px;
}

[theme="2011"] .gbar-item-dropdown.active .gbar-item-icon.settings {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgNEw1LjUgNC41TDMuNSAyLjVMMS41IDQuNUwzLjUgNi41TDMgNy41SDBWMTAuNUgzTDMuNSAxMS41TDEuNSAxMy41TDMuNSAxNS41TDUuNSAxMy41TDYuNSAxNFYxN0g5LjVWMTRMMTAuNSAxMy41TDEyLjUgMTUuNUwxNC41IDEzLjVMMTIuNSAxMS41TDEzIDEwLjVIMTZWNy41SDEzTDEyLjUgNi41TDE0LjUgNC41TDEyLjUgMi41TDEwLjUgNC41TDkuNSA0VjFINi41VjRaTTggMTEuNzVDOS41MTg3OCAxMS43NSAxMC43NSAxMC41MTg4IDEwLjc1IDlDMTAuNzUgNy40ODEyMiA5LjUxODc4IDYuMjUgOCA2LjI1QzYuNDgxMjIgNi4yNSA1LjI1IDcuNDgxMjIgNS4yNSA5QzUuMjUgMTAuNTE4OCA2LjQ4MTIyIDExLjc1IDggMTEuNzVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTYuNSAzTDUuNSAzLjVMMy41IDEuNUwxLjUgMy41TDMuNSA1LjVMMyA2LjVIMFY5LjVIM0wzLjUgMTAuNUwxLjUgMTIuNUwzLjUgMTQuNUw1LjUgMTIuNUw2LjUgMTNWMTZIOS41VjEzTDEwLjUgMTIuNUwxMi41IDE0LjVMMTQuNSAxMi41TDEyLjUgMTAuNUwxMyA5LjVIMTZWNi41SDEzTDEyLjUgNS41TDE0LjUgMy41TDEyLjUgMS41TDEwLjUgMy41TDkuNSAzVjBINi41VjNaTTggMTAuNzVDOS41MTg3OCAxMC43NSAxMC43NSA5LjUxODc4IDEwLjc1IDhDMTAuNzUgNi40ODEyMiA5LjUxODc4IDUuMjUgOCA1LjI1QzYuNDgxMjIgNS4yNSA1LjI1IDYuNDgxMjIgNS4yNSA4QzUuMjUgOS41MTg3OCA2LjQ4MTIyIDEwLjc1IDggMTAuNzVaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjU2XzE1KSIvPgo8bWFzayBpZD0ibWFzazBfMjU2XzE1IiBzdHlsZT0ibWFzay10eXBlOmFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTYuNSAzTDUuNSAzLjVMMy41IDEuNUwxLjUgMy41TDMuNSA1LjVMMyA2LjVIMFY5LjVIM0wzLjUgMTAuNUwxLjUgMTIuNUwzLjUgMTQuNUw1LjUgMTIuNUw2LjUgMTNWMTZIOS41VjEzTDEwLjUgMTIuNUwxMi41IDE0LjVMMTQuNSAxMi41TDEyLjUgMTAuNUwxMyA5LjVIMTZWNi41SDEzTDEyLjUgNS41TDE0LjUgMy41TDEyLjUgMS41TDEwLjUgMy41TDkuNSAzVjBINi41VjNaTTggMTAuNzVDOS41MTg3OCAxMC43NSAxMC43NSA5LjUxODc4IDEwLjc1IDhDMTAuNzUgNi40ODEyMiA5LjUxODc4IDUuMjUgOCA1LjI1QzYuNDgxMjIgNS4yNSA1LjI1IDYuNDgxMjIgNS4yNSA4QzUuMjUgOS41MTg3OCA2LjQ4MTIyIDEwLjc1IDggMTAuNzVaIiBmaWxsPSJibGFjayIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMjU2XzE1KSI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2ZfMjU2XzE1KSI+CjxwYXRoIGQ9Ik0yMCAtN0gtNFYxN0g2LjVWMTRMNS41IDEzLjVMMy41IDE1LjVMMS41IDEzLjVMMy41IDExLjVMMyAxMC41SDBWNy41SDNMMy41IDYuNUwxLjUgNC41TDMuNSAyLjVMNS41IDQuNUw2LjUgNFYxSDkuNVY0TDEwLjUgNC41TDEyLjUgMi41TDE0LjUgNC41TDEyLjUgNi41TDEzIDcuNUgxNlYxMC41SDEzTDEyLjUgMTEuNUwxNC41IDEzLjVMMTIuNSAxNS41TDEwLjUgMTMuNUw5LjUgMTRWMTdIMjBWLTdaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMjU2XzE1KSIvPgo8cGF0aCBkPSJNMTAuNzUgOUMxMC43NSAxMC41MTg4IDkuNTE4NzggMTEuNzUgOCAxMS43NUM2LjQ4MTIyIDExLjc1IDUuMjUgMTAuNTE4OCA1LjI1IDlDNS4yNSA3LjQ4MTIyIDYuNDgxMjIgNi4yNSA4IDYuMjVDOS41MTg3OCA2LjI1IDEwLjc1IDcuNDgxMjIgMTAuNzUgOVoiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yNTZfMTUpIi8+CjwvZz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9mXzI1Nl8xNSIgeD0iLTUiIHk9Ii04IiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMC41IiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfMjU2XzE1Ii8+CjwvZmlsdGVyPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjU2XzE1IiB4MT0iOCIgeTE9IjAiIHgyPSI4IiB5Mj0iMTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzNCNTY5OCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyMjM2NjciLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzI1Nl8xNSIgeDE9IjgiIHkxPSItMS40MmUtMDciIHgyPSI4IiB5Mj0iMTciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwMTk2OCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDBGMzUiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzI1Nl8xNSIgeDE9IjgiIHkxPSItMS40MmUtMDciIHgyPSI4IiB5Mj0iMTciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwMTk2OCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDBGMzUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K);
}

[theme="2013"] .gbar-item-icon.settings {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgNEw1LjUgNC41TDMuNSAyLjVMMS41IDQuNUwzLjUgNi41TDMgNy41SDBWMTAuNUgzTDMuNSAxMS41TDEuNSAxMy41TDMuNSAxNS41TDUuNSAxMy41TDYuNSAxNFYxN0g5LjVWMTRMMTAuNSAxMy41TDEyLjUgMTUuNUwxNC41IDEzLjVMMTIuNSAxMS41TDEzIDEwLjVIMTZWNy41SDEzTDEyLjUgNi41TDE0LjUgNC41TDEyLjUgMi41TDEwLjUgNC41TDkuNSA0VjFINi41VjRaTTggMTEuNzVDOS41MTg3OCAxMS43NSAxMC43NSAxMC41MTg4IDEwLjc1IDlDMTAuNzUgNy40ODEyMiA5LjUxODc4IDYuMjUgOCA2LjI1QzYuNDgxMjIgNi4yNSA1LjI1IDcuNDgxMjIgNS4yNSA5QzUuMjUgMTAuNTE4OCA2LjQ4MTIyIDExLjc1IDggMTEuNzVaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgM0w1LjUgMy41TDMuNSAxLjVMMS41IDMuNUwzLjUgNS41TDMgNi41SDBWOS41SDNMMy41IDEwLjVMMS41IDEyLjVMMy41IDE0LjVMNS41IDEyLjVMNi41IDEzVjE2SDkuNVYxM0wxMC41IDEyLjVMMTIuNSAxNC41TDE0LjUgMTIuNUwxMi41IDEwLjVMMTMgOS41SDE2VjYuNUgxM0wxMi41IDUuNUwxNC41IDMuNUwxMi41IDEuNUwxMC41IDMuNUw5LjUgM1YwSDYuNVYzWk04IDEwLjc1QzkuNTE4NzggMTAuNzUgMTAuNzUgOS41MTg3OCAxMC43NSA4QzEwLjc1IDYuNDgxMjIgOS41MTg3OCA1LjI1IDggNS4yNUM2LjQ4MTIyIDUuMjUgNS4yNSA2LjQ4MTIyIDUuMjUgOEM1LjI1IDkuNTE4NzggNi40ODEyMiAxMC43NSA4IDEwLjc1WiIgZmlsbD0iI0NDQ0NDQyIvPgo8L3N2Zz4K);
}

[theme="2013"] .gbar-item-dropdown:hover .gbar-item-icon.settings {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgNEw1LjUgNC41TDMuNSAyLjVMMS41IDQuNUwzLjUgNi41TDMgNy41SDBWMTAuNUgzTDMuNSAxMS41TDEuNSAxMy41TDMuNSAxNS41TDUuNSAxMy41TDYuNSAxNFYxN0g5LjVWMTRMMTAuNSAxMy41TDEyLjUgMTUuNUwxNC41IDEzLjVMMTIuNSAxMS41TDEzIDEwLjVIMTZWNy41SDEzTDEyLjUgNi41TDE0LjUgNC41TDEyLjUgMi41TDEwLjUgNC41TDkuNSA0VjFINi41VjRaTTggMTEuNzVDOS41MTg3OCAxMS43NSAxMC43NSAxMC41MTg4IDEwLjc1IDlDMTAuNzUgNy40ODEyMiA5LjUxODc4IDYuMjUgOCA2LjI1QzYuNDgxMjIgNi4yNSA1LjI1IDcuNDgxMjIgNS4yNSA5QzUuMjUgMTAuNTE4OCA2LjQ4MTIyIDExLjc1IDggMTEuNzVaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgM0w1LjUgMy41TDMuNSAxLjVMMS41IDMuNUwzLjUgNS41TDMgNi41SDBWOS41SDNMMy41IDEwLjVMMS41IDEyLjVMMy41IDE0LjVMNS41IDEyLjVMNi41IDEzVjE2SDkuNVYxM0wxMC41IDEyLjVMMTIuNSAxNC41TDE0LjUgMTIuNUwxMi41IDEwLjVMMTMgOS41SDE2VjYuNUgxM0wxMi41IDUuNUwxNC41IDMuNUwxMi41IDEuNUwxMC41IDMuNUw5LjUgM1YwSDYuNVYzWk04IDEwLjc1QzkuNTE4NzggMTAuNzUgMTAuNzUgOS41MTg3OCAxMC43NSA4QzEwLjc1IDYuNDgxMjIgOS41MTg3OCA1LjI1IDggNS4yNUM2LjQ4MTIyIDUuMjUgNS4yNSA2LjQ4MTIyIDUuMjUgOEM1LjI1IDkuNTE4NzggNi40ODEyMiAxMC43NSA4IDEwLjc1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg);
}

[theme="2013"] .gbar-item-dropdown.active .gbar-item-icon.settings {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgM0w1LjUgMy41TDMuNSAxLjVMMS41IDMuNUwzLjUgNS41TDMgNi41SDBWOS41SDNMMy41IDEwLjVMMS41IDEyLjVMMy41IDE0LjVMNS41IDEyLjVMNi41IDEzVjE2SDkuNVYxM0wxMC41IDEyLjVMMTIuNSAxNC41TDE0LjUgMTIuNUwxMi41IDEwLjVMMTMgOS41SDE2VjYuNUgxM0wxMi41IDUuNUwxNC41IDMuNUwxMi41IDEuNUwxMC41IDMuNUw5LjUgM1YwSDYuNVYzWk04IDEwLjc1QzkuNTE4NzggMTAuNzUgMTAuNzUgOS41MTg3OCAxMC43NSA4QzEwLjc1IDYuNDgxMjIgOS41MTg3OCA1LjI1IDggNS4yNUM2LjQ4MTIyIDUuMjUgNS4yNSA2LjQ4MTIyIDUuMjUgOEM1LjI1IDkuNTE4NzggNi40ODEyMiAxMC43NSA4IDEwLjc1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg);
}

[theme="2011"] .gbar-spacer {
  width: 1px;
  height: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%);
}

[theme="2011"] .gbar-item-dropdown > .gbar-item {
  height: 29px;
}

[theme="2011"] .gbar-item-dropdown > .gbar-item:after {
  content: "";
  display: inline-block;
  border-top: 3px solid #ccc;
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  padding-top: 1px;
  margin-bottom: 1px;
  margin-left: 4px;
}

[theme="2011"] .gbar-item-dropdown.active > .gbar-item {
  color: #36c !important;
  background-color: #fff;
  border-left: 1px solid #bebebe;
  border-right: 1px solid #bebebe;
  height: 30px;
  padding: 0 5px;
}

[theme="2011"] .gbar-menu,
[theme="2013"] .gbar-menu {
  background-color: #fff;
  border: 1px solid #bebebe;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

[theme="2011"] .gbar-menu-item {
  color: #36c !important;
  text-decoration: none !important;
  height: 27px;
  line-height: 27px;
  padding: 0 20px;
}

[theme="2011"] .gbar-menu-item:hover {
  background-color: #eff3fb;
}

[theme="2011"] .gbar-menu-spacer {
  background-color: #e5e5e5;
  margin: 10px 0;
  height: 1px;
  width: 100%;
}
[theme="2011"] .gbar-account-menu,
[theme="2013"] .gbar-account-menu {
  padding: 0px;
}
[theme="2011"] .gbar-account-menu-information,
[theme="2013"] .gbar-account-menu-information {
  display: flex;
  flex-direction: row;
  padding: 15px 90px 10px 20px;
}
[theme="2011"] .gbar-account-menu-information:has(.gbar-account-menu-picture),
[theme="2013"] .gbar-account-menu-information:has(.gbar-account-menu-picture) {
  padding: 20px 50px 16px 20px;
}
[theme="2011"] .gbar-account-menu-details,
[theme="2013"] .gbar-account-menu-details {
  display: flex;
  flex-direction: column;
}
[theme="2011"] .gbar-account-menu-picture,
[theme="2013"] .gbar-account-menu-picture {
  width: 54px;
  height: 54px;
  margin-right: 15px;
  border: 1px solid #bebebe;
}
[theme="2010"] .gbar-account-menu-name,
[theme="2011"] .gbar-account-menu-name,
[theme="2013"] .gbar-account-menu-name {
  color: #000;
  font-weight: bold;
}
[theme="2010"] .gbar-account-menu-email,
[theme="2011"] .gbar-account-menu-email,
[theme="2013"] .gbar-account-menu-email {
  color: #666;
}
[theme="2011"] .gbar-account-menu-links,
[theme="2013"] .gbar-account-menu-links {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
[theme="2011"] .gbar-account-menu-link {
  color: #36c !important;
  text-decoration: none !important;
  line-height: 28px;
}
[theme="2011"] .gbar-account-menu-link:hover,
[theme="2013"] .gbar-account-menu-link:hover {
  text-decoration: underline !important;
}
[theme="2011"] .gbar-account-menu-separator,
[theme="2013"] .gbar-account-menu-separator {
  color: #ccc;
  line-height: 28px;
}
[theme="2011"] .gbar-account-menu-buttons,
[theme="2013"] .gbar-account-menu-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-top: 1px solid #bebebe;
  box-shadow: inset 0 12px 4px -10px rgba(0, 0, 0, 0.12);
  height: 50px;
  padding: 0 20px;
}
[theme="2011"] .gbar-account-menu-button,
[theme="2013"] .gbar-account-menu-button {
  text-decoration: none !important;
  cursor: default;
  background: linear-gradient(0deg, #fbfbfb 0%, #ffffff 100%);
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  font-size: 11px;
  font-weight: bold;
  color: #444;
  height: 29px;
  line-height: 29px;
  padding: 0 8px;
}
[theme="2011"] .gbar-account-menu-button:hover,
[theme="2013"] .gbar-account-menu-button:hover {
  color: #222;
  border: 1px solid #c6c6c6 !important;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
[theme="2011"] .gbar-account-menu-button:active,
[theme="2013"] .gbar-account-menu-button:active {
  color: #222;
  border: 1px solid #c6c6c6;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
[theme="2011"] .gbar-account-menu-button:focus,
[theme="2013"] .gbar-account-menu-button:focus {
  border: 1px solid #4d90fe;
}
/* 2013 */
[theme="2013"] .gbar-item {
  color: #ccc !important;
  font-weight: bold;
  line-height: 30px;
  text-decoration: none !important;
  padding: 0 9px;
}

[theme="2013"] .gbar-item:hover {
  color: #fff !important;
}

[theme="2013"] .gbar-item.active {
  color: #fff !important;
}

[theme="2013"] .gbar-item-dropdown > .gbar-item:after {
  content: "";
  display: inline-block;
  border-top: 3px solid #ccc;
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
  padding-top: 1px;
  margin-bottom: 1px;
  margin-left: 4px;
}

[theme="2013"] .gbar-item-dropdown > .gbar-item:hover::after {
  border-top: 3px solid #fff;
}

[theme="2013"] .gbar-item-dropdown.active > .gbar-item::after {
  border-top: 3px solid #000;
}

[theme="2013"] .gbar-item-dropdown.active > .gbar-item {
  color: #000 !important;
  background-color: #fff;
  border-left: 1px solid #bebebe;
  border-right: 1px solid #bebebe;
  padding: 0 8px;
}

[theme="2013"] .gbar-spacer {
  width: 1px;
  height: 100%;
  background: #424242;
}

[theme="2013"] .gbar-menu-item {
  color: #000 !important;
  font-weight: bold;
  text-decoration: none !important;
  height: 27px;
  line-height: 27px;
  padding: 0 20px;
}

[theme="2013"] .gbar-menu-item:hover {
  background-color: #eeeeee;
}

[theme="2013"] .gbar-menu-spacer {
  background-color: #bebebe;
  margin: 10px 0;
  height: 1px;
  width: 100%;
}
[theme="2013"] .gbar-account-menu-email {
  font-weight: bold !important;
}
[theme="2013"] .gbar-account-menu-link {
  color: #000;
  font-weight: bold !important;
  text-decoration: none !important;
  line-height: 28px;
}
`;

gBar.prepend(gBarStyle);

if (document.querySelector("[href^='https://accounts.google.com/SignOutOptions']")) {
  const infoElement = document.querySelector("[href^='https://accounts.google.com/SignOutOptions']");

  userInfo = (infoElement.ariaLabel ?? infoElement.title).split(" ").slice(2);
  userInfo.splice(-2, 1);
  userInfo = userInfo.join(" ").split("\n");

  userEmail = userInfo[1].replace(/\(|\)/g, "");
  userName = userInfo[0].trim();
  userPicture = infoElement.querySelector("img").src.replace("s32", "s128");

  oldUserEmail = userInfo[1].replace(/\(|\)/g, "");
  oldUserName = userInfo[0].trim();
  oldUserPicture = infoElement.querySelector("img").src.replace("s32", "s128");

  gBar.style.setProperty("--user-picture", `url(${userPicture})`);

  oldUserInfo = true;
  userInfo = true;
} else if (document.getElementById("masthead-expanded-menu-account-container")) {
  const infoElement = document.getElementById("masthead-expanded-menu-account-container");

  userEmail = infoElement.querySelector("#masthead-expanded-menu-email").textContent;
  userName = infoElement.querySelector("#masthead-expanded-menu-account-info > p").textContent;
  userPicture = infoElement.querySelector("img#masthead-expanded-menu-gaia-photo").src;

  oldUserEmail = infoElement.querySelector("#masthead-expanded-menu-email").textContent;
  oldUserName = infoElement.querySelector("#masthead-expanded-menu-account-info > p").textContent;
  oldUserPicture = infoElement.querySelector("img#masthead-expanded-menu-gaia-photo").src;

  gBar.style.setProperty("--user-picture", `url(${userPicture})`);

  oldUserInfo = true;
  userInfo = true;
} else {
  userInfo = false;
}

function parseString(string) {
  if (userInfo) {
    return string.replaceAll("{email}", userEmail).replaceAll("{name}", userName).replaceAll("{url}", window.location.href).replace("*", "");
  } else {
    return string.replaceAll("{email}", "Email").replaceAll("{name}", "Name").replaceAll("{url}", window.location.href).replace("*", "");
  }
}

function handleMenuClick(item, e) {
  const itemLink = item.querySelector(".gbar-item");

  if (itemLink == e.target && !item.classList.contains("active")) {
    e.preventDefault();
    item.classList.add("active");
  } else if (item.classList.contains("active") && (!item.contains(e.target) || itemLink == e.target)) {
    if (itemLink == e.target) {
      e.preventDefault();
    }
    item.classList.remove("active");
  }
}

function placeGBar() {
  const gplex = document.getElementById("ugf");
  const v3 = document.getElementById("masthead-positioner");

  if (gplex) {
    gplex.prepend(gBar);
  } else if (v3) {
    v3.prepend(gBar);
  } else {
    document.documentElement.prepend(gBar);
  }
}

function validateJson(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return error;
  }
}

async function loadPresets(dropdownElement, codeElementEdit, codeElementDisplay) {
  console.log(codeElementDisplay)
  dropdownElement.querySelectorAll("*:not(.gbar-config-dropdown-spacer#default):not(.gbar-config-dropdown-item#preset)").forEach((element) => {
    element.remove();
  });

  customPresets = await GM.getValue("custom-presets", []);

  if (customPresets.length != 0) {
    const presetSpacer = document.createElement("span");
    presetSpacer.classList.add("gbar-config-dropdown-spacer");
    for (let i = customPresets.length - 1; i >= 0; i--) {
      const item = customPresets[i];

      const presetElement = document.createElement("button");
      presetElement.classList.add("gbar-config-dropdown-item");
      presetElement.textContent = item.name;
      dropdownElement.prepend(presetElement);

      presetElement.addEventListener("click", async function () {
        presetElement.blur();
        codeElementEdit.value = JSON.stringify(item, null, 2);
        codeElementDisplay.innerHTML = syntaxHighlight(codeElementEdit.value);

        if (!dropdownElement.querySelector(".gbar-config-dropdown-item#delete")) {
          const deleteElement = document.createElement("button");
          deleteElement.classList.add("gbar-config-dropdown-item");
          deleteElement.id = "delete";
          deleteElement.textContent = "Delete preset...";

          deleteElement.addEventListener("click", async function () {
            customPresets.splice(i, 1);
            presetElement.remove();
            deleteElement.remove();
            if (customPresets.length == 0) {
              dropdownElement.querySelector(".gbar-config-dropdown-spacer:not(#default)").remove();
            }
            await GM.setValue("custom-presets", customPresets);
            loadPresets(dropdownElement, codeElementEdit, codeElementDisplay);
          });
          dropdownElement.appendChild(deleteElement);
        }
      });
    }
    dropdownElement.prepend(presetSpacer);
  }

  for (let i = presets.length - 1; i >= 0; i--) {
    const item = presets[i];
    const presetElement = document.createElement("button");
    presetElement.classList.add("gbar-config-dropdown-item");
    presetElement.textContent = item.name;
    dropdownElement.prepend(presetElement);

    presetElement.addEventListener("click", function () {
      if (dropdownElement.querySelector(".gbar-config-dropdown-item#delete")) {
        const deleteElement = dropdownElement.querySelector(".gbar-config-dropdown-item#delete");
        deleteElement.remove();
      }
      codeElementEdit.value = JSON.stringify(item, null, 2);
      codeElementDisplay.innerHTML = syntaxHighlight(codeElementEdit.value);
      presetElement.blur();
    });
  }
}

async function saveCustomPreset(json, dropdownElement, codeElementEdit, codeElementDisplay) {
  let itemAdded = false;
  if (customPresets.length) {
    customPresets.forEach((item) => {
      if (item.name == json.name) {
        customPresets[customPresets.indexOf(item)] = json;
        itemAdded = true;
        return;
      }
    });
  }
  if (itemAdded == false) {
    customPresets.push(json);
  }
  await GM.setValue("custom-presets", customPresets);
  await loadPresets(dropdownElement, codeElementEdit, codeElementDisplay);
}

function detectLocation(layout, item) {
  const layoutArray = layout.map((x) => x);

  layoutArray.forEach((element) => {
    element.score = 0;
    if (element.type == "link") {
      if (window.location.href == element.url) {
        element.score = Infinity;
      } else if (element.regex) {
        element.regex.forEach((pattern) => {
          if (window.location.href.match(pattern)) {
            element.score += 1;
          }
        });
      }
    }
  });

  if (layoutArray[item].score == Infinity) {
    return true;
  } else if (layoutArray[item].score == Math.max(...layoutArray.map((x) => x.score), 0) && layoutArray[item].score != 0) {
    return true;
  } else {
    return false;
  }
}

async function loadConfig() {
  // Get Config
  const config = await GM.getValue("config", JSON.stringify(presets[0], null, 2));
  const configJson = JSON.parse(config);

  // Reset GBar If Needed
  document.querySelectorAll("#gbar *:not(style)").forEach((element) => {
    element.remove();
  });

  // Set Theme
  gBar.setAttribute("theme", configJson.theme);

  // Add Items
  let createdMenus = [];

  if (configJson.fake_account) {
    userInfo = true;
    userEmail = configJson.fake_account.email;
    userName = configJson.fake_account.name;
    userPicture = configJson.fake_account.profile_picture;
    gBar.style.setProperty("--user-picture", `url(${userPicture})`);
  } else if (!configJson.fake_account && oldUserInfo) {
    userInfo = true;
    userEmail = oldUserEmail;
    userName = oldUserName;
    userPicture = oldUserPicture;
    gBar.style.setProperty("--user-picture", `url(${userPicture})`);
  } else if (!configJson.fake_account && !oldUserInfo) {
    userInfo = false;
  }

  configJson.layout.forEach((item) => {
    let newElement;

    switch (item.type) {
      case "link": {
        newElement = document.createElement("a");
        newElement.classList.add("gbar-item");
        newElement.innerHTML = parseString(item.label);
        newElement.href = parseString(item.url);
        newElement.title = parseString(item.label);

        if (detectLocation(configJson.layout, configJson.layout.indexOf(item)) == true || item.label.startsWith("*")) {
          newElement.classList.add("active");
          if (gBar.getAttribute("theme") == "2009") {
            newElement.removeAttribute("href");
          }
        }

        break;
      }
      case "spacer": {
        newElement = document.createElement("div");
        newElement.classList.add("gbar-spacer");
        break;
      }
      case "full_spacer": {
        newElement = document.createElement("div");
        newElement.classList.add("gbar-full-spacer");
        break;
      }
      case "menu": {
        newElement = document.createElement("div");
        newElement.classList.add("gbar-item-dropdown");

        let newElementLink = document.createElement("a");
        newElementLink.classList.add("gbar-item");
        newElementLink.href = parseString(item.url);
        newElementLink.title = parseString(item.label);
        if (item.icon && gBar.getAttribute("theme") != "2009") {
          let newElementIcon = document.createElement("span");
          newElementLink.innerHTML = parseString(item.label);
          newElementIcon.classList.add("gbar-item-icon");
          newElementIcon.classList.add(item.icon);
          newElementLink.appendChild(newElementIcon);
        } else {
          newElementLink.innerHTML = parseString(item.label);
        }

        newElement.appendChild(newElementLink);

        let newElementMenu = document.createElement("div");
        newElementMenu.classList.add("gbar-menu");
        newElementMenu.classList.add(item.position);
        newElement.appendChild(newElementMenu);

        item.items.forEach((subitem) => {
          let newSubElement;

          switch (subitem.type) {
            case "link": {
              newSubElement = document.createElement("a");
              newSubElement.classList.add("gbar-menu-item");
              newSubElement.innerHTML = parseString(subitem.label);
              newSubElement.href = parseString(subitem.url);
              newSubElement.title = parseString(item.label);
              break;
            }
            case "spacer": {
              newSubElement = document.createElement("div");
              newSubElement.classList.add("gbar-menu-spacer");
              break;
            }
            default: {
              return;
            }
          }

          if ("account" in subitem) {
            if (subitem.account == true && userInfo == true) {
              newElementMenu.appendChild(newSubElement);
            } else if (subitem.account == false && userInfo == false) {
              newElementMenu.appendChild(newSubElement);
            }
          } else {
            newElementMenu.appendChild(newSubElement);
          }
        });

        if (item.hover == true) {
          newElement.addEventListener("mouseenter", function () {
            newElement.classList.add("active");
          });
          newElement.addEventListener("mouseleave", function () {
            newElement.classList.remove("active");
          });
        } else {
          createdMenus.push(newElement);
        }
        break;
      }
      case "account_menu": {
        newElement = document.createElement("div");
        newElement.classList.add("gbar-item-dropdown");

        let newElementLink = document.createElement("a");
        newElementLink.classList.add("gbar-item");
        newElementLink.href = parseString(item.url);
        newElementLink.title = parseString(item.label);
        if (item.icon && gBar.getAttribute("theme") != "2009") {
          let newElementIcon = document.createElement("span");
          newElementLink.innerHTML = parseString(item.label);
          newElementIcon.classList.add("gbar-item-icon");
          newElementIcon.classList.add(item.icon);
          newElementLink.appendChild(newElementIcon);
        } else {
          newElementLink.innerHTML = parseString(item.label);
        }

        newElement.appendChild(newElementLink);

        let newElementMenu = document.createElement("div");
        newElementMenu.classList.add("gbar-menu");
        newElementMenu.classList.add("gbar-account-menu");
        newElementMenu.classList.add(item.position);
        newElement.appendChild(newElementMenu);

        switch (gBar.getAttribute("theme")) {
          case "2009":
            newElementMenu.innerHTML = `
            <div class="gbar-account-menu-information">
            <span class="gbar-account-menu-email">${userEmail}</span>
            <div class="gbar-menu-spacer"></div>
            <a class="gbar-menu-item" href="https://accounts.google.com/ServiceLogin?continue=https://accounts.google.com/SignOutOptions?continue=${window.location.href}">Sign in to another account...</a>
            `;
            break;
          case "2010":
            newElementMenu.innerHTML = `
            <div class="gbar-account-menu-information">
              ${item.profile_picture ? `<img src="${userPicture}" class="gbar-account-menu-picture">` : ""}
              <div class="gbar-account-menu-details">
                <span class="gbar-account-menu-name">${userName}</span>
                <span class="gbar-account-menu-email">${userEmail}</span>
              </div>
            </div>
            <div class="gbar-account-menu-links">
              <a class="gbar-menu-item" href="https://myaccount.google.com">View profile</a>
              <a class="gbar-menu-item" href="https://myaccount.google.com">Account settings</a>
              <a class="gbar-menu-item" href="https://policies.google.com/privacy">Privacy</a>
            </div>
            <div class="gbar-menu-spacer"></div>
            <div class="gbar-account-menu-buttons">
              <a class="gbar-menu-item" href="https://accounts.google.com/Logout?continue=${window.location.href}">Sign out</a>
              <a class="gbar-menu-item" href="https://accounts.google.com/ServiceLogin?continue=https://accounts.google.com/SignOutOptions?continue=${window.location.href}">Switch account</a>
            </div>
            `;
            break;
          case "2011":
          case "2013":
          default:
            newElementMenu.innerHTML = `
            <div class="gbar-account-menu-information">
              ${item.profile_picture ? `<img src="${userPicture}" class="gbar-account-menu-picture">` : ""}
              <div class="gbar-account-menu-details">
                <span class="gbar-account-menu-name">${userName}</span>
                <span class="gbar-account-menu-email">${userEmail}</span>
                <div class="gbar-account-menu-links">
                  <a class="gbar-account-menu-link" href="https://myaccount.google.com">Account</a>
                  <span class="gbar-account-menu-separator">–</span>
                  <a class="gbar-account-menu-link" href="https://policies.google.com/privacy">Privacy</a>
                </div>
              </div>
            </div>
            <div class="gbar-account-menu-buttons">
              <a class="gbar-account-menu-button" href="https://accounts.google.com/ServiceLogin?continue=https://accounts.google.com/SignOutOptions?continue=${window.location.href}">Add account</a>
              <a class="gbar-account-menu-button" href="https://accounts.google.com/Logout?continue=${window.location.href}">Sign out</a>
            </div>
            `;
            break;
        }

        if (item.hover == true) {
          newElement.addEventListener("click", function (event) {
            event.preventDefault();
          });
          newElement.addEventListener("mouseenter", function () {
            newElement.classList.add("active");
          });
          newElement.addEventListener("mouseleave", function () {
            newElement.classList.remove("active");
          });
        } else {
          createdMenus.push(newElement);
        }
        break;
      }
      default: {
        return;
      }
    }

    if ("account" in item) {
      if (item.account == true && userInfo == true) {
        gBar.appendChild(newElement);
      } else if (item.account == false && userInfo == false) {
        gBar.appendChild(newElement);
      }
    } else {
      gBar.appendChild(newElement);
    }
  });

  document.addEventListener("click", (e) => {
    createdMenus.forEach((item) => {
      handleMenuClick(item, e);
    });
  });
}

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, null, "\t");
  }

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function(match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

async function changeConfig() {
  if (settingsOpen) {
    return;
  }
  settingsOpen = true;

  const gBarSettings = document.createElement("div");
  gBarSettings.id = "gbar-config-background";

  gBarSettings.innerHTML = `
  <div id="gbar-config-main">
    <div id="gbar-config-header">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzk4IiBoZWlnaHQ9IjEzNyIgdmlld0JveD0iMCAwIDM5OCAxMzciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMjguNTA0IDEwNC45MTNWMTI3LjQ5NkwxMDIuMDM3IDEzMy42MzlDOTEuNTU4NiAxMzUuNjI2IDgxLjM4MTIgMTM2LjY4IDcxLjUwNDkgMTM2LjhDNDYuMjExOSAxMzYuMzE5IDI4LjE0NTUgMTI4Ljc5MSAxNy4zMDU3IDExNC4yMTdDNi4zNDUzOCAxMDAuMTI1IDAuOTI1NDU2IDg1LjMxMSAxLjA0NTkgNjkuNzczOUMxLjE2NjM0IDUxLjE2NTUgNy43NjA1OCAzNS4xNDY2IDIwLjgyODYgMjEuNzE3M0MzMy43NzYyIDguMDQ3MDQgNTIuMDgzNSAxLjAwMTE0IDc1Ljc1MDUgMC41Nzk1OUM4NS44Njc3IDAuNzYwMjU0IDk1LjI5MjMgMi4wODUxMiAxMDQuMDI0IDQuNTU0MkMxMTAuOTUgNi40ODEyOCAxMTYuMzQgOC40OTg3IDEyMC4xOTQgMTAuNjA2NEMxMjMuNzQ3IDEyLjcxNDIgMTI2LjUxNyAxNC40OTA3IDEyOC41MDQgMTUuOTM2TDExMy4xNDggMzAuNTY5OEwxMDYuNjQ0IDMyLjEwNTVMMTExLjI1MSAyNC42OTgyQzEwOS44MDYgMjIuOTUxOCAxMDcuOTY5IDIxLjA4NSAxMDUuNzQxIDE5LjA5NzdDMTAzLjM5MiAxNy4xNzA2IDEwMC42MjIgMTUuMzMzOCA5Ny40MzAyIDEzLjU4NzRDOTQuMzU4OSAxMS42MDAxIDkwLjY1NTMgMTAuMDY0NSA4Ni4zMTkzIDguOTgwNDdDODQuMzMyIDguMzE4MDMgODIuMTAzOCA3LjgwNjE1IDc5LjYzNDggNy40NDQ4MkM3Ny4wNDUyIDcuMzI0MzggNzQuMzk1NSA3LjI2NDE2IDcxLjY4NTUgNy4yNjQxNkM1Ni43NTA3IDcuMzg0NiA0NC42MTYgMTIuMzgzIDM1LjI4MTcgMjIuMjU5M0MyNS41MjU5IDMyLjEzNTYgMjAuNTg3NyA0NS4zMjQxIDIwLjQ2NzMgNjEuODI0N0MyMC41ODc3IDc5LjgzMDkgMjYuNDg5NCA5NS4zNjggMzguMTcyNCAxMDguNDM2QzQ5LjY3NDYgMTIyLjA0NiA2NS42MDMyIDEyOS4wMzIgODUuOTU4IDEyOS4zOTNDOTEuODU5NyAxMjkuMzkzIDk2LjU4NzEgMTI4LjgyMSAxMDAuMTQgMTI3LjY3N0MxMDMuNzUzIDEyNi44MzQgMTA2Ljg1NSAxMjUuODcgMTA5LjQ0NCAxMjQuNzg2Vjk0Ljk3NjZMODEuNTMxNyA5Ni40MjE5TDk2LjI1NTkgODguNDcyN0gxMzUuNTVMMTMwLjY3MiA5My4wNzk2QzEyOS41ODggOTMuODYyNSAxMjguOTg2IDk0Ljg1NjEgMTI4Ljg2NiA5Ni4wNjA1QzEyOC42MjUgOTguODkxIDEyOC41MDQgMTAxLjg0MiAxMjguNTA0IDEwNC45MTNaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjYyXzIpIi8+CjxwYXRoIGQ9Ik0xODQuODcyIDEzNEgxNDkuMTlDMTUxLjkgMTMxLjQxIDE1My41ODcgMTI5LjM2MyAxNTQuMjQ5IDEyNy44NTdDMTU0LjYxIDEyNi40MTIgMTU0Ljc5MSAxMjQuMjE0IDE1NC43OTEgMTIxLjI2M1YxMTIuNjgyQzE1NC45MTEgOTQuNDM0NiAxNTUuMDkyIDc4LjA1NDQgMTU1LjMzMyA2My41NDFDMTU1LjY5NCA0Ni4yNTc1IDE1Ni4xMTYgMjguMzExNSAxNTYuNTk4IDkuNzAzMTJIMTQzLjEzOEwxNTYuNTk4IDMuMzc5ODhIMTgxLjYyQzE3OC42MDkgNS4wMDU4NiAxNzYuNjgxIDYuNTQxNSAxNzUuODM4IDcuOTg2ODJDMTc0Ljg3NSA5LjYxMjc5IDE3NC4zMzMgMTIuMjAyMyAxNzQuMjEyIDE1Ljc1NTRMMTcyLjY3NyA1NC4wNTYyTDE4NC44NzIgNDkuNjI5OUMxODcuMSA0OS42Mjk5IDE4OS4zODggNDkuNTY5NyAxOTEuNzM3IDQ5LjQ0OTJDMjA2LjU1MSA0OS42OTAxIDIxNy40MjEgNTMuNjk0OCAyMjQuMzQ3IDYxLjQ2MzRDMjMxLjIxMiA2OS4yMzE5IDIzNC42NDUgNzguMzU1NSAyMzQuNjQ1IDg4LjgzNEMyMzQuNjQ1IDk4LjEwODEgMjMyLjA1NSAxMDYuNTA5IDIyNi44NzYgMTE0LjAzN0MyMjEuNTc2IDEyMS41NjQgMjEzLjQ0NyAxMjcuMjg1IDIwMi40ODYgMTMxLjJDMTk1LjkyMiAxMzMuMTg3IDE5MC4wNTEgMTM0LjEyIDE4NC44NzIgMTM0Wk0xNzIuNjc3IDU0Ljg2OTFMMTcyLjQ5NiA3MS42NzA5QzE3Mi4zNzYgODQuNDk4IDE3Mi4zMTUgOTcuMjA0OCAxNzIuMzE1IDEwOS43OTFDMTcyLjMxNSAxMTcuOCAxNzIuNDM2IDEyMi4xMDYgMTcyLjY3NyAxMjIuNzA4QzE3Mi42NzcgMTI0LjU3NSAxNzMuMjQ5IDEyNi4wNTEgMTc0LjM5MyAxMjcuMTM1QzE3NS40NzcgMTI4LjM5OSAxNzguNDI4IDEyOS4wMzIgMTgzLjI0NiAxMjkuMDMyQzE4OC4zMDQgMTI5LjAzMiAxOTIuNDkgMTI4LjU4IDE5NS44MDIgMTI3LjY3N0MyMDAuMjU4IDEyNi4zNTIgMjAzLjk2MiAxMjQuNDU1IDIwNi45MTMgMTIxLjk4NkMyMDkuNjIzIDExOS42MzcgMjExLjczIDExNi45ODcgMjEzLjIzNiAxMTQuMDM3QzIxNC45MjIgMTEwLjk2NSAyMTYuMDM2IDEwNy44MDQgMjE2LjU3OCAxMDQuNTUyQzIxNy4wNiAxMDEuMzYgMjE3LjMwMSA5OC4zNDkgMjE3LjMwMSA5NS41MTg2QzIxNy40MjEgODkuODU3NyAyMTYuMDA2IDgzLjE0MzEgMjEzLjA1NSA3NS4zNzQ1QzIxMS40MjkgNzEuNjQwOCAyMDkuMDIgNjguMTc4MSAyMDUuODI5IDY0Ljk4NjNDMjAyLjc1NyA2MS45MTUgMTk4LjY5MiA1OS40NDYgMTkzLjYzNCA1Ny41NzkxQzE4OS41MzkgNTYuMDEzMyAxODUuODM1IDU1LjExIDE4Mi41MjMgNTQuODY5MUMxNzkuMDkgNTQuNTY4IDE3NS44MDggNTQuNTY4IDE3Mi42NzcgNTQuODY5MVoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8yNjJfMikiLz4KPHBhdGggZD0iTTMwNy42MzMgODAuODg0OEwzMTEuMzM2IDk0LjA3MzJDMzE0LjA0NiAxMDMuNzY5IDMxNi44NzcgMTEyLjMyIDMxOS44MjggMTE5LjcyOEMzMjEuNjk0IDEyNC4wNjMgMzIzLjMyIDEyNy4zNDYgMzI0LjcwNiAxMjkuNTc0QzMyNi4xNTEgMTMxLjgwMiAzMjcuNTY2IDEzMy43NTkgMzI4Ljk1MSAxMzUuNDQ1QzMyNi45NjQgMTM1LjY4NiAzMjUuMTU3IDEzNS44OTcgMzIzLjUzMSAxMzYuMDc4QzMxOS42MTcgMTM1Ljg5NyAzMTUuNzkzIDEzNC43ODMgMzEyLjA1OSAxMzIuNzM1QzMwOS4xMDggMTMwLjg2OCAzMDYuOTEgMTI4Ljg4MSAzMDUuNDY1IDEyNi43NzNDMzAzLjgzOSAxMjQuNjY2IDMwMi42MDQgMTIyLjc2OSAzMDEuNzYxIDEyMS4wODNMMjkyLjk5OSAxMjkuNTc0QzI5MS4zMTMgMTMwLjY1OCAyODguNjAzIDEzMS45NTIgMjg0Ljg2OSAxMzMuNDU4QzI4MS4wNzUgMTM1LjIwNCAyNzYuMjI3IDEzNi4xMzggMjcwLjMyNiAxMzYuMjU4QzI2Mi42NzggMTM2LjEzOCAyNTYuOTg3IDEzNC4xNTEgMjUzLjI1MyAxMzAuMjk2QzI0OS4zMzkgMTI2LjYyMyAyNDcuMzgxIDEyMi4xOTcgMjQ3LjM4MSAxMTcuMDE4QzI0Ny4zODEgMTExLjUzNyAyNDkuMDM3IDEwNi43OCAyNTIuMzUgMTAyLjc0NUMyNTUuNDIxIDk4LjY1MDEgMjU5LjI0NSA5NS4xODczIDI2My44MjIgOTIuMzU2OUMyNjguMzk5IDg5LjQwNjEgMjczLjA5NiA4Ni45OTcyIDI3Ny45MTQgODUuMTMwNEMyODIuNDMgODMuMzIzNyAyODYuMjU0IDgxLjkwODUgMjg5LjM4NiA4MC44ODQ4TDI4Ni41ODUgNzIuNzU0OUMyODMuNzU1IDY0LjM4NDEgMjgwLjQxMyA1OS4yMDUxIDI3Ni41NTkgNTcuMjE3OEMyNzIuNjQ0IDU1LjM1MDkgMjY2LjY4MiA1NC42ODg1IDI1OC42NzMgNTUuMjMwNUwyNzIuMTMyIDQ5LjQ0OTJDMjc2LjM0OCA0OS40NDkyIDI4MC40MTMgNDkuNTY5NyAyODQuMzI3IDQ5LjgxMDVDMjg4LjE4MSA1MC4xNzE5IDI5MS41ODQgNTEuMzQ2MiAyOTQuNTM1IDUzLjMzMzVDMjk3LjcyNiA1NS40NDEyIDMwMC4xOTUgNTguNjAyOSAzMDEuOTQyIDYyLjgxODRDMzAzLjYyOCA2Ny4wOTQxIDMwNS41MjUgNzMuMTE2MiAzMDcuNjMzIDgwLjg4NDhaTTI5NC43MTUgOTkuNTgzNUwyOTIuOTk5IDkzLjI2MDNDMjkyLjE1NiA4OC43NDM3IDI5MC43NDEgODYuNTQ1NiAyODguNzUzIDg2LjY2NkMyODYuMTY0IDg2LjY2NiAyODEuODU4IDg4Ljc0MzcgMjc1LjgzNiA5Mi44OTg5QzI3My4wMDYgOTQuODg2MiAyNzAuNTk3IDk3LjM1NTMgMjY4LjYwOSAxMDAuMzA2QzI2Ni4zODEgMTAzLjI1NyAyNjUuMjY3IDEwNi43MiAyNjUuMjY3IDExMC42OTRDMjY1LjI2NyAxMTMuMjg0IDI2NS44OTkgMTE1LjUxMiAyNjcuMTY0IDExNy4zNzlDMjY4LjI0OCAxMTkuMzA2IDI2OS42NjMgMTIwLjkwMiAyNzEuNDEgMTIyLjE2N0MyNzQuOTYzIDEyNC42MzYgMjc4Ljg0NyAxMjUuODcgMjgzLjA2MiAxMjUuODdDMjg3Ljg4IDEyNS44NyAyOTEuNzY0IDEyNC44NzYgMjk0LjcxNSAxMjIuODg5QzI5Ny40MjUgMTIxLjE0MyAyOTkuMzIyIDExOS42NjcgMzAwLjQwNiAxMTguNDYzQzI5OC42IDExMy43NjYgMjk2LjcwMyAxMDcuNDcyIDI5NC43MTUgOTkuNTgzNVoiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8yNjJfMikiLz4KPHBhdGggZD0iTTM3Ni4zNzUgMTI4Ljg1MUwzNjkuNTEgMTM0SDMzNy41MzNDMzM5LjY0IDEzMS4wNDkgMzQwLjkzNSAxMjguNjQgMzQxLjQxNyAxMjYuNzczQzM0MS43NzggMTI0LjkwNyAzNDEuOTU5IDEyMi4yNTcgMzQxLjk1OSAxMTguODI0QzM0Mi4wNzkgOTUuNjM5IDM0Mi4yNiA3NC43NDIyIDM0Mi41MDEgNTYuMTMzOEgzMjguMzE5TDM0MC44NzUgNTAuMTcxOUgzNjMuMjc3QzM2MC45MjkgNTIuNTIwNSAzNTkuNzU0IDU1LjI5MDcgMzU5Ljc1NCA1OC40ODI0VjY0LjI2MzdDMzYxLjIgNjIuNzU4MSAzNjIuOTc2IDYxLjEwMjEgMzY1LjA4NCA1OS4yOTU0QzM2Ny4wNzEgNTcuNTQ5IDM2OS4zNiA1NS45MjMgMzcxLjk0OSA1NC40MTc1QzM3Ny4xMjggNTAuODY0NCAzODMuMzYxIDQ5LjAyNzcgMzkwLjY0OCA0OC45MDcyQzM5Mi41MTUgNDguOTA3MiAzOTMuOTMgNDkuMDI3NyAzOTQuODk0IDQ5LjI2ODZDMzk1LjczNyA0OS42Mjk5IDM5Ni41NSA0OS45OTEyIDM5Ny4zMzMgNTAuMzUyNUwzODkuNzQ1IDY5LjIzMTlMMzg0LjUwNSA3Mi4yMTI5TDM4Ni4wNDEgNjMuMzYwNEMzODUuMjU4IDYyLjg3ODYgMzg0LjQ0NSA2Mi40MjY5IDM4My42MDIgNjIuMDA1NEMzODIuNzU5IDYxLjc2NDUgMzgxLjQwNCA2MS42NDQgMzc5LjUzNyA2MS42NDRDMzc2LjIyNSA2MS42NDQgMzcyLjg4MyA2Mi41MTczIDM2OS41MSA2NC4yNjM3QzM2Ni4xOTggNjYuMjUxIDM2Mi45NDYgNjkuNTAyOSAzNTkuNzU0IDc0LjAxOTVMMzU5LjM5MyAxMjAuNTQxQzM1OS4zOTMgMTIzLjg1MyAzNTkuOTk1IDEyNS45MyAzNjEuMiAxMjYuNzczQzM2Mi4zNDQgMTI3Ljc5NyAzNjQuMTUxIDEyOC4zNjkgMzY2LjYyIDEyOC40OUwzNzYuMzc1IDEyOC44NTFaIiBmaWxsPSJ1cmwoI3BhaW50M19saW5lYXJfMjYyXzIpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjYyXzIiIHgxPSIxOTUiIHkxPSIwLjUwMDAwMSIgeDI9IjE5NSIgeTI9IjEzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMTk2RUVGIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzEwNjRFNSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMjYyXzIiIHgxPSIxOTUiIHkxPSIzIiB4Mj0iMTk1IiB5Mj0iMTM0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNERTU3NDQiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRDEzRDI5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl8yNjJfMiIgeDE9IjE5NSIgeTE9IjQ4LjUiIHgyPSIxOTUiIHkyPSIxMzQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGQkYxQSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRkIzMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDNfbGluZWFyXzI2Ml8yIiB4MT0iMTk1IiB5MT0iNDQuNSIgeDI9IjE5NSIgeTI9IjEzNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMEFBNTYxIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwOTE0QiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=" id="gbar-config-header-logo" />
      <div class="gbar-config-dropdown">
        <button class="gbar-config-button">Presets</button>
        <div id="gbar-config-dropdown-items">
          <span class="gbar-config-dropdown-spacer" id="default"></span>
          <button class="gbar-config-dropdown-item" id="preset">Save preset...</button>
        </div>
      </div>
    </div>
    <div id="gbar-config-content">
      <div id="gbar-config-code">
        <code id="gbar-config-code-display"></code>
        <textarea id="gbar-config-code-edit" placeholder="Insert JSON Here..." spellcheck="false"></textarea>
      </div>
    </div>
    <div id="gbar-config-footer">
      <button class="gbar-config-button" id="apply">Apply</button>
      <button class="gbar-config-button" id="cancel">Close</button>
    </div>
  </div>
  <style>
    html,
    body {
      overflow: hidden !important;
    }
    #gbar * {
      user-select: none !important;
      cursor: default !important;
    }
    [theme="2009"] .gbar-full-spacer::after {
      display: inline-block;
      content: "<-->";
      vertical-align: middle;
      text-align: center;
      width: 100%;
    }
    [theme="2010"] .gbar-full-spacer {
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAyNiAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMUwwIDZMNSAxMVY3SDIxVjExTDI2IDZMMjEgMVY1SDVWMVoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMjUiLz4KPHBhdGggZD0iTTUgMEwwIDVMNSAxMFY2SDIxVjEwTDI2IDVMMjEgMFY0SDVWMFoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yNjVfMTQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjY1XzE0IiB4MT0iMTMiIHkxPSIwIiB4Mj0iMTMiIHkyPSIxMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjNzE5M0Q2Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzA2MzA4NCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=);
      background-repeat: no-repeat;
      background-position: center 10px;
    }
    [theme="2011"] .gbar-full-spacer,
    [theme="2013"] .gbar-full-spacer {
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAyNiAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMUwwIDZMNSAxMVY3SDIxVjExTDI2IDZMMjEgMVY1SDVWMVoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNNSAwTDAgNUw1IDEwVjZIMjFWMTBMMjYgNUwyMSAwVjRINVYwWiIgZmlsbD0iI0VBRUFFQSIvPgo8L3N2Zz4K);
      background-repeat: no-repeat;
      background-position: center 10px;
    }
    #gbar-config-main * {
      font-family: Arial, sans-serif !important;
    }
    #gbar-config-background {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.5);
      position: fixed;
      top: 0px;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 9999;
      overflow-y: scroll;
      overflow-x: auto;
    }
    #gbar-config-main {
      display: flex;
      flex-direction: column;
      width: 900px;
      height: 700px;
      margin: auto;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.25);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    #gbar-config-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      padding: 0 10px;
      box-sizing: border-box;
      background-color: #f1f1f1;
      border-bottom: 1px solid #e5e5e5;
      z-index: 9999;
    }
    #gbar-config-header-logo {
      height: 25px;
      margin: 0 5px;
    }
    .gbar-config-button {
      position: relative;
      color: #444;
      background: linear-gradient(to bottom, #fff, #fbfbfb);
      border: 1px solid #dcdcdc;
      border-radius: 2px;
      font-size: 11px;
      font-weight: bold;
      height: 30px;
      padding: 0 10px;
      outline: none;
    }
    .gbar-config-button:hover {
      color: #222;
      background: linear-gradient(to bottom, #fff, #f8f8f8);
      border: 1px solid #c6c6c6;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }
    .gbar-config-dropdown > .gbar-config-button::after {
      content: "";
      display: inline-block;
      border-top: 3px solid #444;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      vertical-align: middle;
      margin-left: 8px;
      margin-right: -2px;
    }
    .gbar-config-dropdown > .gbar-config-button:hover::after,
    .gbar-config-dropdown:focus-within > .gbar-config-button::after {
      border-top: 3px solid #222;
    }
    .gbar-config-button:active,
    .gbar-config-dropdown:focus-within > .gbar-config-button {
      color: #222;
      background: linear-gradient(to bottom, #fff, #f8f8f8);
      border: 1px solid #c6c6c6;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    .gbar-config-dropdown {
      position: relative;
    }
    #gbar-config-dropdown-items {
      display: none;
    }
    .gbar-config-dropdown:focus-within > .gbar-config-button + #gbar-config-dropdown-items {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #fff;
      border: 1px solid #bebebe;
      box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
      padding: 6px 0;
    }
    .gbar-config-dropdown-item {
      color: #333;
      font-size: 13px;
      padding: 6px 20px 6px 20px;
      border: none;
      background-color: transparent;
      white-space: nowrap;
      text-align: left;
      cursor: default;
      user-select: none;
    }
    .gbar-config-dropdown-spacer {
      width: 100%;
      height: 1px;
      background-color: #e5e5e5;
      margin: 6px 0;
    }
    .gbar-config-dropdown-item:hover {
      background-color: #e3e3e3;
    }
    #gbar-config-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      box-sizing: border-box;
    }
    #gbar-config-footer {
      display: flex;
      flex-direction: row;
      padding: 0 10px;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      background-color: #f5f5f5;
      box-shadow: inset 0 12px 4px -10px rgba(0, 0, 0, 0.12);
      border-top: 1px solid #bebebe;
    }
    #gbar-config-code {
      display: grid;
      position: relative;
      font-family: "Courier New", Courier, monospace !important;
      font-size: 10.5pt;
      border: 1px solid #d9d9d9;
      border-top: 1px solid #b4b4b4;
      outline: none;
      margin: 10px;
      overflow: auto;
      height: 534px;
    }
    #gbar-config-code:hover {
      border: 1px solid #b4b4b4;
    }
    #gbar-config-code:focus-within {
      border: 1px solid #4d90fe;
    }
    #gbar-config-code-edit {
      grid-column: 1;
      grid-row: 1;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      font-family: "Courier New", Courier, monospace !important;
      font-size: 10.5pt;
      resize: none;
      color: transparent;
      caret-color: #263238;
      background-color: transparent;
    }
    #gbar-config-code-display {
      pointer-events: none;
      grid-column: 1;
      grid-row: 1;
      white-space: pre;
      width: auto;
      height: auto;
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      color: #263238;
      font-family: "Courier New", Courier, monospace !important;
      font-size: 10.5pt;
      .string {
        color: #B71C1C;
      }
      .number {
        color: #263238;
      }
      .key {
        color: #2196F3;
      }
      .boolean,
      .null {
        color: #3F51B5;
      }
      * {
        font-family: "Courier New", Courier, monospace !important;
        font-size: 10.5pt;
      }
    }
  </style>
  `;

  const codeElementEdit = gBarSettings.querySelector("#gbar-config-code-edit");
  const codeElementDisplay = gBarSettings.querySelector("#gbar-config-code-display");
  codeElementEdit.value = await GM.getValue("config", JSON.stringify(presets[0], null, 2));
  codeElementDisplay.innerHTML = syntaxHighlight(codeElementEdit.value);

  codeElementEdit.addEventListener("input", () => {
      codeElementDisplay.innerHTML = syntaxHighlight(codeElementEdit.value);
  })

  const dropdownElement = gBarSettings.querySelector("#gbar-config-dropdown-items");

  await loadPresets(dropdownElement, codeElementEdit, codeElementDisplay);

  const savePresetElement = gBarSettings.querySelector(".gbar-config-dropdown-item#preset");

  savePresetElement.addEventListener("click", async function () {
    const jsonValid = validateJson(codeElementEdit.value);

    if (jsonValid == true) {
      const json = JSON.parse(codeElementEdit.value);
      await saveCustomPreset(json, dropdownElement, codeElementEdit, codeElementDisplay);
    } else {
      alert(jsonValid);
    }

    savePresetElement.blur();
  });

  gBarSettings.querySelector(".gbar-config-button#apply").addEventListener("click", async function () {
    const jsonValid = validateJson(codeElementEdit.value);

    if (jsonValid == true) {
      await GM.setValue("config", codeElementEdit.value);
      loadConfig();
    } else {
      alert(jsonValid);
    }
  });

  codeElementEdit.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      const jsonValid = validateJson(codeElementEdit.value);

      if (jsonValid == true) {
        await GM.setValue("config", codeElementEdit.value);
        loadConfig();
      } else {
        alert(jsonValid);
      }
    }
  });

  gBarSettings.querySelector(".gbar-config-button#cancel").addEventListener("click", function () {
    placeGBar();
    gBarSettings.remove();

    settingsOpen = false;
  });

  gBarSettings.querySelector("#gbar-config-content").prepend(gBar);
  document.documentElement.prepend(gBarSettings);
}

loadConfig();

placeGBar();

GM_registerMenuCommand("Configure Gbar", changeConfig);
GM_registerMenuCommand("Refresh Gbar", placeGBar);
