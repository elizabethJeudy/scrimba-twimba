import { tweetsData } from "./data.js";

const tweetBtn = document.getElementById("tweet-btn");
const tweetInput = document.getElementById("tweet-input");

//
tweetBtn.addEventListener("click", function () {
	console.log(tweetInput.value);
	tweetInput.value = "";
});

document.addEventListener("click", function (event) {
	if (event.target.dataset.like) {
		handleLikes(event.target.dataset.like);
	}
});
// iterates over tweet data, grabbing user uuid
function handleLikes(tweetID) {
	const targetTweet = tweetsData.filter(function (tweet) {
		return tweet.uuid === tweetID;
	})[0]; // [0] grabs the object from array
	// increment/decrement liked tweets
	if (targetTweet.isLiked) {
		targetTweet.likes--;
	} else {
		targetTweet.likes++;
	}
	targetTweet.isLiked = !targetTweet.isLiked;
	render();
}

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
                        <i class="fa-regular fa-comment" data-reply="${tweet.uuid}"  style="color: #2a2537;"></i>
                        ${tweet.replies.length}</span>
				        <span class="tweet-detail">
                        <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
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

// renders data
function render() {
	const renderFeed = document.getElementById("feed");
	renderFeed.innerHTML = getFeedHtml();
}
render();
