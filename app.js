const videos = document.getElementsByClassName("video");
const audios = document.getElementsByClassName("audio");
const maindiv = document.getElementsByClassName("maindiv")[0];
function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

const overlay = document.getElementById("overlay");
const timer = document.getElementById("timer");
const progressBar = document.getElementById("progress");

loadedAssets = 0;

const homepage = document.getElementById("homepage");
const button = document.getElementById("startButton");

window.mobileCheck = function () {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	if (check) {
		document.getElementById("mobile").style.display = "flex";
	}
};
window.mobileCheck();
button.addEventListener("click", async () => {
	startLoading();
	animItem.play();
	animItem.style.transform = "translate(-48%, -35%)";
	button.style.borderRadius = "0";
	button.style.cursor = "default";
	button.classList.remove("buttonHover");
	button.style.pointerEvents = "none";
	await sleep(300);
	button.style.height = "20px";
	button.style.width = "calc(var(--scale)*140px)";
	button.style.borderRadius = "10px";
	await sleep(400);
	progressBar.style.opacity = "1";
});

const animItem = document.getElementById("svg");
let scale = Math.min(window.innerHeight / 1080, window.innerWidth / 1920);

window.addEventListener("resize", () => {
	scale = Math.min(window.innerHeight / 1080, window.innerWidth / 1920);
	root.style.setProperty("--scale", scale);
});

root = document.querySelector(":root");
root.style.setProperty("--scale", scale);

let currentVideo = null;

// const svgContainer = document.getElementById("svg");
// const animItem = bodymovin.loadAnimation({
// 	wrapper: svgContainer,
// 	animType: "svg",
// 	loop: false,
// 	autoplay: false,
// 	path: "./lottie/play_phone.json",
// });

function UpdateProgressBar() {
	const progress = (loadedAssets / 9) * 100;
	progressBar.style.width = `calc(${progress}% - 20px)`;
}

// document
// 	.getElementById("passwordForm")
// 	.addEventListener("submit", function (event) {
// 		var password = document.getElementById("passwordInput").value;
// 		if (password !== "MiloStoleMyBeat123") {
// 			document.getElementById("errorMessage").textContent =
// 				"Incorrect password!";
// 			event.preventDefault(); // Prevent form submission
// 		} else {
// 			document.getElementById("errorMessage").textContent = "";
// 			// Password is correct, you can proceed with form submission
// 			document.getElementsByClassName("mainPassword")[0].style.display = "none";
// 			document.getElementById("homepage").style.display = "grid";
// 			document.getElementsByClassName("maindiv")[0].style.display = "grid";
// 			event.preventDefault();
// 		}
// 	});

document
	.getElementById("playPauseButton")
	.addEventListener("click", async () => {
		
		currentVideo.play();
		hideBigPlayPause();
		tinyPlayToPause();
	});

document.getElementById("tinyPlayPause").addEventListener("click", async () => {
	if (currentVideo.paused) {
		tinyPlayToPause();
		currentVideo.play();
		hideBigPlayPause();
	} else {
		tinyPauseToPlay();
		currentVideo.pause();
		showBigPlayPause();
	}
});

function showBigPlayPause() {
	document.getElementById("playPause").style.display = "flex";
	document.getElementById("playPause").style.opacity = "1";
	document.getElementById("thePauseButton").style.visibility = "hidden";
	document.getElementById("thePlayButton").style.visibility = "visible";
}

function hideBigPlayPause() {
	document.getElementById("thePauseButton").style.visibility = "visible";
	document.getElementById("thePlayButton").style.visibility = "hidden";
	document.getElementById("playPause").style.opacity = "0";
	(async () => {
		await sleep(500);
		if (!currentVideo.paused){
			document.getElementById("playPause").style.display = "none";
		}
	})();
}

function tinyPauseToPlay(){
	document.getElementById("tinyPauseButton").style.display = "none";
		document.getElementById("tinyPlayButton").style.display = "block";
}

function tinyPlayToPause(){
	document.getElementById("tinyPauseButton").style.display = "block";
		document.getElementById("tinyPlayButton").style.display = "none";
}

document.addEventListener("keydown", async (e) => {
	try {
		if (e.key == " ") {
			if (currentVideo.paused) {
				currentVideo.play();
				tinyPlayToPause();
				hideBigPlayPause();
			} else {
				currentVideo.pause();
				tinyPauseToPlay();
				showBigPlayPause();
			}
		}
	} catch (e) {}
});

async function loadVideo(src, id) {
	let loadVideo = await fetch(src);
	let video = await loadVideo.blob();
	let videoUrl = URL.createObjectURL(video);
	videos[id - 1].src = videoUrl;

	loadedAssets++;
	UpdateProgressBar();
	if (loadedAssets == sources.length) {
		await onLoaded();
	}
}

async function loadAudio(src, id) {
	let loadAudio = await fetch(src);
	let audio = await loadAudio.blob();
	let audioUrl = URL.createObjectURL(audio);

	audios[id - 1].src = audioUrl;
	audios[id - 1].loop = true;
	loadedAssets++;
	UpdateProgressBar();
	if (loadedAssets == sources.length) {
		await onLoaded();
	}
}

let sources = [
	"https://milosmusic.b-cdn.net/MainVideos/1.mp4", //0
	"https://milosmusic.b-cdn.net/MainVideos/1_1.mp4", //1
	"https://milosmusic.b-cdn.net/MainVideos/2.mp4", //2
	"https://milosmusic.b-cdn.net/MainVideos/2_1.mp4", //3
	"https://milosmusic.b-cdn.net/MainVideos/2_22.mp4", //4
	"https://milosmusic.b-cdn.net/MainVideos/2_3.mp4", //5
	"https://milosmusic.b-cdn.net/MainVideos/2_2.mp4", //6
	"https://milosmusic.b-cdn.net/MainVideos/new_3.mp4", //7
	"https://milosmusic.b-cdn.net/MainVideos/3_1.mp4", //8
	"https://milosmusic.b-cdn.net/MainVideos/N_4.mp4", //9
];
// loading assets
async function startLoading() {
	// loadVideo("./videos/1_4k.mp4", 1);
	// loadVideo("./videos/1_1_4k.mp4", 2);
	// loadVideo("./videos/2_4k.mp4", 3);
	// loadVideo("./videos/2_1.mp4", 4);
	// loadVideo("./videos/2_2.mp4", 5);
	// loadVideo("./videos/2_3.mp4", 6);
	// loadVideo("./videos/2_2_4k.mp4", 7);
	loadAudio("./audio/firstInteractionMusic.mp3", 1);
	// loadVideo("./videos/3_4k.mp4", 8)
	sources.forEach((src, index) => {
		loadVideo(src, index + 1);
	});
}

async function onLoaded() {
	homepage.style.opacity = "0";
	videos[0].currentTime = 0.1;
	await sleep(1500);
	videos[0].style.opacity = "1";
	document.getElementById("tinyPlayPause").style.opacity = "1";
	document.getElementById("tinyPlayPause").style.pointerEvents = "all";
	await sleep(400);
	videos[0].play();
	currentVideo = videos[0];
	homepage.style.display = "none";
}

function handleTimer(time, func) {
	timer.style.display = "flex";
	timer.style.opacity = "1";
	timer.innerHTML = time;
	const interval = setInterval(() => {
		timer.innerHTML = time;
		if (time == 0) {
			clearInterval(interval);
			func.click();
			timer.style.opacity = "0";
		}
		time--;
	}, 1000);
	function endTimer() {
		clearInterval(interval);
		timer.style.display = "none";
	}
	return endTimer;
}

const buttons = document.getElementById("buttons");
videos[0].addEventListener("ended", async () => {
	while (buttons.firstChild) {
		buttons.removeChild(buttons.firstChild);
	}
	videos[0].style.opacity = "0";
	audios[0].loop = true;
	await sleep(900);
	videos[0].style.display = "none";
	videos[1].style.opacity = "1";
	currentVideo = null;
	audios[0].play();
	videos[1].loop = true;
	videos[1].play();
	const option1 = buttons.appendChild(document.createElement("button"));
	const option2 = buttons.appendChild(document.createElement("button"));
	option1.classList.add("option");
	option2.classList.add("option");
	option1.innerHTML = "Tomorrow's a new day, go to sleep";
	option2.innerHTML = "Lemme check my Phone";
	buttons.style.opacity = "1";
	const endTimer = handleTimer(10, option1);
	option1.addEventListener("click", async () => {
		endTimer();
		videos[1].style.opacity = "0";
		buttons.style.opacity = "0";
		audios[0].pause();
		videos[1].pause();
		await sleep(900);
		while (buttons.firstChild) {
			buttons.removeChild(buttons.firstChild);
		}
		videos[1].style.display = "none";
		videos[2].style.opacity = "1";
		videos[2].play();
		currentVideo = videos[2];
		document.getElementById("texture").style.opacity = "0.1";
		maindiv.style.background = "#141817";
	});
	option2.addEventListener("click", async () => {
		endTimer();
		videos[1].style.opacity = "0";
		videos[1].pause();
		buttons.style.opacity = "0";
		audios[0].pause();
		await sleep(900);
		while (buttons.firstChild) {
			buttons.removeChild(buttons.firstChild);
		}
		videos[1].style.display = "none";
		videos[6].style.opacity = "1";
		videos[6].play();
		currentVideo = videos[6];
		maindiv.style.background = "#141817";
	});
});
let iterCount = 0;
videos[2].addEventListener("ended", () => snoozeInteraction());
videos[6].addEventListener("ended", () => snoozeInteraction());
let snoozeTimers;
async function snoozeInteraction() {
	const option1 = buttons.appendChild(document.createElement("button"));
	const option2 = buttons.appendChild(document.createElement("button"));
	option1.innerHTML = "Snooze";
	option2.innerHTML = "Stop";
	option2.addEventListener("mouseover", async () => {
		if (option2.disabled == true) {
			option2.innerHTML = "Nah, I'm gonna sleep more";
		}
	});
	option2.addEventListener("mouseleave", () => {
		option2.innerHTML = "Stop";
	});
	option1.classList.add("snoozestop");
	option2.classList.add("snoozestop");
	buttons.style.top = "calc(var(--scale) * 335px)";
	option2.disabled = true;
	videos[2].style.opacity = "0";
	videos[6].style.opacity = "0";
	currentVideo = null;
	await sleep(1000);
	buttons.style.opacity = "1";
	videos[2].style.display = "none";
	videos[6].style.display = "none";
	videos[3].style.opacity = "1";
	videos[3].play();
	videos[3].loop = true;
	snoozeTimers = handleTimer(5, option1);
	option1.addEventListener("click", () => secondInteraction(iterCount));
	option2.addEventListener("click", async () => {
		snoozeTimers();
		videos[5].style.opacity = "0";
		videos[5].pause();
		buttons.style.opacity = "0";
		buttons.style.pointerEvents = "none";
		await sleep(1000);
		buttons.style.display = "none";
		buttons.style.pointerEvents = "all";
		videos[7].style.opacity = "1";
		videos[7].play();
		currentVideo = videos[7];
	});
}

async function secondInteraction(i) {
	snoozeTimers();

	videos[3 + i].style.opacity = "0";
	videos[3 + i].pause();
	buttons.style.opacity = "0";
	buttons.style.pointerEvents = "none";
	await sleep(1000);
	if (i == 1) {
		buttons.children[0].disabled = true;
		buttons.children[1].disabled = false;
		snoozeTimers = handleTimer(5, buttons.children[1]);
	} else {
		snoozeTimers = handleTimer(5, buttons.children[0]);
	}
	videos[3 + i].style.display = "none";
	videos[4 + i].style.opacity = "1";
	buttons.style.opacity = "1";
	buttons.style.pointerEvents = "all";
	videos[4 + i].loop = true;
	videos[4 + i].play();
	iterCount++;
}

videos[7].addEventListener("ended", async () => {
	videos[7].style.opacity = "0";
	videos[7].pause();
	await sleep(1000);
	videos[8].style.display = "block";
	videos[8].style.opacity = "1";
	videos[8].loop = true;
	videos[8].play();
	currentVideo = videos[8];
	const thirdInteraction = document.getElementById("thirdInteraction");
	thirdInteraction.style.opacity = "1";
	thirdInteraction.style.pointerEvents = "all";
	const buttons = thirdInteraction.getElementsByTagName("button");
	const thirdTimer = handleTimer(10, buttons[0]);
	[...buttons].forEach((button) => {
		button.addEventListener("click", async () => {
			thirdTimer();
			videos[8].style.opacity = "0";
			videos[8].pause();
			thirdInteraction.style.opacity = "0";
			thirdInteraction.style.pointerEvents = "none";
			await sleep(1000);
			videos[9].style.display = "block";
			videos[9].style.opacity = "1";
			videos[9].play();
			currentVideo = videos[9];
		});
	});
});

videos[9].addEventListener("ended", async () => {
	document.getElementById("credits").style.opacity = "1";
	document.getElementById("credits").style.visibility = "visible";
});

document
	.getElementById("experienceAgain")
	.addEventListener("click", async () => {
		document.getElementById("credits").style.opacity = "0";
		document.getElementById("credits").style.visibility = "hidden";
		resetVideos();
	});

async function showCredits() {
	document.getElementById("credits").style.display = "flex";
	document.getElementById("credits").style.opacity = "1";
}

function resetVideos() {
	for (let i = 0; i < videos.length; i++) {
		if (i == 0) {
			videos[i].style.opacity = "1";
			videos[i].style.display = "block";
			continue;
		}
		videos[i].style.opacity = "0";
		videos[i].currentTime = 0;
		videos[i].style.display = "block";
		videos[i].pause();
	}
	videos[0].play();
	currentVideo = videos[0];
}

document.getElementById("readMore").addEventListener("click", () => {
	document.getElementById("credits").style.opacity = "1";
	document.getElementById("credits").style.visibility = "visible";
});
