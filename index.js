import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const tweetBtn = document.getElementById("tweet-btn");
const tweetInput = document.getElementById("tweet-input");

// handles tweet button clicks
tweetBtn.addEventListener("click", function () {
	tweetInput.value = "";
	console.log({
		handle: `@Lizzy`,
		profilePic: `images/troll.jpg`,
		likes: 207,
		retweets: 105,
		tweetText: tweetInput.value,
		replies: [],
		isLiked: false,
		isRetweeted: false,
		uuid: uuidv4(),
	});
});

// handle clicks for replies, likes, retweets
document.addEventListener("click", function (event) {
	if (event.target.dataset.like) {
		handleLikes(event.target.dataset.like);
	} else if (event.target.dataset.retweet) {
		handleRetweets(event.target.dataset.retweet);
	} else if (event.target.dataset.reply) {
		handleReplies(event.target.dataset.reply);
	}
});

// iterates over tweet data, grabbing user uuid for likes
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

// handles retweets
function handleRetweets(tweetID) {
	const targetTweet = tweetsData.filter(function (tweet) {
		return tweet.uuid === tweetID;
	})[0];
	if (targetTweet.isRetweeted) {
		targetTweet.retweets--;
	} else {
		targetTweet.retweets++;
	}
	targetTweet.isRetweeted = !targetTweet.isRetweeted;
	render();
}

// toggles replies
function handleReplies(replyId) {
	document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

// gets data from tweet data
function getFeedHtml() {
	let feedHtml = ``;
	tweetsData.forEach(function (tweet) {
		let likedIcon = "";
		let retweetedIcon = "";

		// checks if icon as been liked or retweeted, conditionally renders css for it
		if (tweet.isLiked) {
			likedIcon = "liked";
		}
		if (tweet.isRetweeted) {
			retweetedIcon = "retweeted";
		}
		// checks if tweet as replies
		let repliesHtml = "";
		if (tweet.replies.length > 0) {
			tweet.replies.forEach(function (reply) {
				repliesHtml += `
				<div class="tweet-reply">
					<div class="tweet-inner">
						<img src="${reply.profilePic}" class="profile-pic"/>
							<div>
								<p class="handle">${reply.handle}</p>
								<p class="tweet-text">${reply.tweetText}</p>
							</div>
					</div>
				</div>`;
			});
		}

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
                        <i class="fa-solid fa-heart ${likedIcon}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}</span>
				        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetedIcon}" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}</span>
			        </div>
		        </div>
	        </div>
					<div class="hidden" id="replies-${tweet.uuid}">
					${repliesHtml}
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
