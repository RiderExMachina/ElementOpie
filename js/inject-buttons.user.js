// ==UserScript==
// @name        Element Opie next-previous
// @namespace   unknown
// @include     http://elementopie.com/*/*
// @version     1.1
// @grant       none
// ==/UserScript==

// This picks up the URL from the document. There's actually a lot we can do with this information...
var url = document.URL;

/* We're going to first strip everything that isn't text from the url, then remove any "q"s, if there are any. We then	*\
|* remove the unnecessary words from the url (cause all we really need is the podcast name), and bam; we're left		*|
\* with our podcast name! If Mark comes up with a podcast with the letter q in it, we'll be screwed, though...			*/
var strip_url = url.replace(/[^a-z]/g, "");
var strip_url = strip_url.replace(/[q]/g, "");
var podcast = strip_url.replace("httpelementopiecom", "")
console.log("Detected podcast " + podcast);

/* Back to the URL, we now remove anything that isn't a number. This allows us to grab the episode number. This does *\
\* have some limitations though, like the Tightwad Tech ".5" episodes. I could add some exceptions later, but eh...  */
var episode = url.replace(/[^0-9]/g, "");
console.log("Successfully retrived webpage info.");
console.log("Data retrieved: " + episode);
var episode_number = parseInt(episode);

/* Here we take the episode number that we just picked up and assume the previous and next episodes by using some  *\
\* basic arithmetic. Again, this has some limitations, like the aformentioned TT ".5" episodes.                    */
var previous_episode = episode_number - 1;
var next_episode = episode_number + 1;
console.log("The previous episode: " + previous_episode + "\nThe next episode: " + next_episode);

/* Around Tightwad Tech episode 11, Mark made some changes to the site, so the tag I was using to inject the links into *\
|* don't exist. So, I made a hack. It kind of throws everything off, as the links are now being placed right above the  *|
\* synopsis paragraph instead of below the Tips of the Week like down below, but I didn't really have a choice.         */
//
/* As far as the actual code here, it looks to see if it captured the Tightwad Tech podcast, and then if on or before   *\
|* episode 11. if it does, it looks for the class name "field-item even". It copies the contents of that first synopsis *|
\* paragraph and then injects the links and the contents. Nothing is missing from the original page. 				    */
if (podcast == "tightwadtech" && episode_number <= 11){
  var paragraph = document.getElementsByClassName('field-item even');
  var download_link = paragraph[0];
  console.log("Injecting links above the synopsis.");
  var existing = download_link.innerHTML;
  download_link.innerHTML = '<br /><p style="text-align:center;"><a href="/?q=' + podcast + '/' + previous_episode +'">‹ Previous Episode </a> || <a href="/?q=tightwadtech/' + next_episode +'">Next Episode ›</a></p>' +  existing;
  console.log("Link injection successful.");
}

/*This part of the code should work across all of the Element Opie podcasts. It takes the last paragraph of the synopsis 	*\
|* paragraph, copies it, and then injects the content and the links. Again, nothing missing from the original page. I had   *|
\* tried buttons before, but something was screwy with them. Maybe try again now that I know the links are working?         */
var paragraph = document.getElementsByClassName('entry');
var n = parseInt(paragraph.length);
var download_link = paragraph[n - 1];
console.log("Injecting links into paragraph block " + parseInt(paragraph.length));
var existing = download_link.innerHTML;
download_link.innerHTML = existing + '<br /><p style="text-align:center;"><a href="/?q=' + podcast + '/' + previous_episode +'">‹ Previous Episode </a> || <a href="/?q=tightwadtech/' + next_episode +'">Next Episode ›</a></p>';
console.log("Link injection successful.");
