// ==UserScript==
// @name        Next-Previous Episode Link on Element Opie
// @namespace   unknown
// @include     http://elementopie.com/*/*
// @version     0.5
// @grant       none
// ==/UserScript==

//Pick up needed bits from website
var url = document.URL;

var strip_url = url.replace(/[^a-z]/g, "");
var strip_url = strip_url.replace("q", "");
var podcast = strip_url.replace("httpelementopiecom", "")
console.log("Detected podcast " + podcast);

var episode = url.replace(/[^0-9]/g, "");
console.log("Successfully retrived webpage info.");
console.log("Data retrieved: " + episode);
var episode_number = parseInt(episode);

//make previous/next episode link
var previous_episode = episode_number - 1;
var next_episode = episode_number + 1;
console.log("The previous episode: " + previous_episode + "\nThe next episode: " + next_episode);

//Because of website structure changes, the next/previous episode button placement needed to be changed. There was no better place to put them, so I had to use this sort of fudgery.
if (podcast == "tightwadtech" && episode_number <= 11){
  var paragraph = document.getElementsByClassName('field-item even');
  var download_link = paragraph[0];
  console.log("Injecting links above the synopsis.");
  var existing = download_link.innerHTML;
  download_link.innerHTML = '<br /><p style="text-align:center;"><a href="/?q=' + podcast + '/' + previous_episode +'">‹ Previous Episode </a> || <a href="/?q=tightwadtech/' + next_episode +'">Next Episode ›</a></p>' +  existing;
  console.log("Link injection successful.");
}
//This version should work universally
var paragraph = document.getElementsByClassName('entry');
var n = parseInt(paragraph.length);
var download_link = paragraph[n - 1];
console.log("Injecting links into paragraph block " + parseInt(paragraph.length));
var existing = download_link.innerHTML;
download_link.innerHTML = existing + '<br /><p style="text-align:center;"><a href="/?q=' + podcast + '/' + previous_episode +'">‹ Previous Episode </a> || <a href="/?q=tightwadtech/' + next_episode +'">Next Episode ›</a></p>';
console.log("Link injection successful.");
