// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var contact = chrome.extension.getBackgroundPage().contacts;
var output = document.getElementById('output');
var div = document.createElement('div');
var pName = document.createElement('p');
var ulEmails = document.createElement('ul');

pName.innerText = contact['name'];
div.appendChild(pName);

var emailStr = contact['email'];
var liEmail = document.createElement('li');
liEmail.innerText = ("Email : " + emailStr);
ulEmails.appendChild(liEmail);
div.appendChild(ulEmails);

var ulGender = document.createElement('ul');
var genderStr = contact['gender'];
var liGender = document.createElement('li');
liGender.innerText = ("Gender : " + genderStr);
ulGender.appendChild(liGender);
div.appendChild(ulGender);

output.appendChild(div);

function logout() {
  chrome.extension.getBackgroundPage().logout();
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#clear').addEventListener('click', logout);
});
