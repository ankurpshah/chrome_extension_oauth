// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key' : 'anonymous',
  'consumer_secret' : 'anonymous',
  'scope' : 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  'app_name' : 'Sample - OAuth Test'
});

var contacts = null;

function setIcon() {
  if (oauth.hasToken()) {
    chrome.browserAction.setIcon({ 'path' : 'img/icon-19-on.png'});
  } else {
    chrome.browserAction.setIcon({ 'path' : 'img/icon-19-off.png'});
  }
};

function onContacts(text, xhr) {
	contacts = JSON.parse(text);
	chrome.tabs.create({ 'url' : 'contacts.html'});
};

function getContacts() {
  oauth.authorize(function() {
    console.log("on authorize");
    setIcon();
    var url = "https://www.googleapis.com/oauth2/v2/userinfo";
    oauth.sendSignedRequest(url, onContacts, {
      'parameters' : {
        'alt' : 'json',
      }
    });
  });
};

function logout() {
  oauth.clearTokens();
  setIcon();
};

setIcon();
chrome.browserAction.onClicked.addListener(getContacts);
