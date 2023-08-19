import { tweetsData } from "./data.js";

const tweetBtn = document.getElementById("tweet-btn");
const tweetInput = document.getElementById("tweet-input");

//
tweetBtn.addEventListener("click", function () {
	console.log(tweetInput.value);
	tweetInput.value = "";
});

document.addEventListener("click", function (event) {
	if (event.target.dataset.comment) {
		console.log(event.target.dataset.comment);
	} else if (event.target.dataset.heart) {
		console.log(event.target.dataset.heart);
	} else if (event.target.dataset.retweet) {
		console.log(event.target.dataset.retweet);
	}
});

// gets data from tweet data
function getFeedHtml() {
	let feedHtml = ``;
	tweetsData.forEach(function (tweet) {
		feedHtml += `
        <div class="tweet">
	        <div class="tweet-inner">
		        <img src="${tweet.profilePic}" class="profile-pic" />
		        <div>
			        <p class="handle">${tweet.handle}</p>
		        	<p class="tweet-text">${tweet.tweetText}</p>
			        <div class="tweet-details">
				        <span class="tweet-detail">
                        <i class="fa-regular fa-comment" data-comment="${tweet.uuid}"  style="color: #2a2537;"></i>
                        ${tweet.replies.length}</span>
				        <span class="tweet-detail">
                        <i class="fa-solid fa-heart" data-heart="${tweet.uuid}"></i>
                        ${tweet.likes}</span>
				        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}</span>
			        </div>
		        </div>
	        </div>
        </div>
        `;
	});
	return feedHtml;
}

console.log(getFeedHtml());

// renders data
function render() {
	const renderFeed = document.getElementById("feed");
	renderFeed.innerHTML = getFeedHtml();
}
render();
