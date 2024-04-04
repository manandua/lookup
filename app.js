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
button.addEventListener("click", async () => {
	startLoading();
	animItem.play();
	animItem.style.transform = "translate(-48%, -35%)";
	button.style.borderRadius = "0";
	button.style.cursor = "default";
	button.classList.remove("buttonHover");
	button.style.pointerEvents = "none";
	await sleep(300);
	button.style.height = "20px"
	button.style.width = "100px";
	button.style.borderRadius = "10px"
	await sleep(400);
	progressBar.style.opacity = "1";

});

const animItem = document.getElementById("svg");



// const svgContainer = document.getElementById("svg");
// const animItem = bodymovin.loadAnimation({
// 	wrapper: svgContainer,
// 	animType: "svg",
// 	loop: false,
// 	autoplay: false,
// 	path: "./lottie/play_phone.json",
// });

function UpdateProgressBar(){
	const progress = (loadedAssets / 7) * 100;
	progressBar.style.width = `calc(${progress}% - 20px)`;
}




async function loadVideo(src, id) {
	console.log("loading video"+id);
	let loadVideo = await fetch(src);
	let video = await loadVideo.blob();
	let videoUrl = URL.createObjectURL(video);
	videos[id - 1].src = videoUrl;
	console.log("video loaded" + id);
	loadedAssets++;
	UpdateProgressBar();
	if (loadedAssets == 7) {
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
	if (loadedAssets == 7) {
		await onLoaded();
	}
}

// loading assets
async function startLoading() {
	loadVideo("https://milosmusic.b-cdn.net/MainVideos/milo1.mp4", 1);
	loadVideo("https://milosmusic.b-cdn.net/MainVideos/inter1.mp4", 2);
	loadVideo("https://milosmusic.b-cdn.net/MainVideos/milo2branch1.mp4", 3);
	loadVideo("https://milosmusic.b-cdn.net/MainVideos/inter2_1.mp4", 4);
	loadVideo("https://milosmusic.b-cdn.net/MainVideos/inter2_2.mp4", 5);
	loadVideo("https://milosmusic.b-cdn.net/MainVideos/inter2_3.mp4", 6);
	loadAudio("https://milosmusic.b-cdn.net/MainVideos/1.mp3", 1);
}




async function onLoaded() {
	homepage.style.opacity = "0";
	videos[0].currentTime = 0.1;
	await sleep(1500);
	videos[0].style.opacity = "1";
	await sleep(400);
	videos[0].play();
	homepage.style.display = "none";
}

function handleTimer(time, func){
	timer.style.display = "flex";
	timer.innerHTML = time;
	const interval = setInterval(() => {
		timer.innerHTML = time;
		if (time == 0) {
			clearInterval(interval);
			func.click();
			timer.style.display = "none";
		}
		time--;
	}, 1000)
	function endTimer(){
		console.log("cleared interval");
		clearInterval(interval);
		timer.style.display = "none";
	};
	return endTimer;
}



const buttons = document.getElementById("buttons");
videos[0].addEventListener("ended", async () => {
	videos[0].style.opacity = "0";
	await sleep(900);
	videos[0].style.display = "none";
	videos[1].style.opacity = "1";
	videos[1].play();
	videos[1].loop = true;
	audios[0].play();
	audios[0].loop = true;
	const option1 = buttons.appendChild(document.createElement("button"));
	const option2 = buttons.appendChild(document.createElement("button"));
	option1.classList.add("option");
	option2.classList.add("option");
	option1.innerHTML = "Tomorrows a new day, go to sleep";
	option2.innerHTML = "Lemme check my Phone";
	buttons.style.opacity = "1";
	const endTimer = handleTimer(10, option1);
	option1.addEventListener("click", async () => {
		endTimer();
		videos[1].style.opacity = "0";
		buttons.style.opacity = "0";
		audios[0].pause();
		await sleep(900);
		while (buttons.firstChild) {
			buttons.removeChild(buttons.firstChild);
		}
		videos[1].style.display = "none";
		videos[2].style.opacity = "1";
		videos[2].play();
		document.getElementById("texture").style.opacity = "0.1";
		maindiv.style.background = "#141817";
	});
	option2.addEventListener("click", () => {
		console.log("clicked option 2");
	});
});
let iterCount = 0;
videos[2].addEventListener("ended", () => snoozeInteraction());
let snoozeTimers=[];
async function snoozeInteraction() {
	const option1 = buttons.appendChild(document.createElement("button"));
	const option2 = buttons.appendChild(document.createElement("button"));
	option1.innerHTML = "Snooze";
	option2.innerHTML = "Stop";
	option1.classList.add("snoozestop");
	option2.classList.add("snoozestop");
	buttons.style.top = "calc(var(--scale)*340)";
	option2.disabled = true;
	videos[2].style.opacity = "0";
	await sleep(1000);
	buttons.style.opacity = "1";
	videos[2].style.display = "none";
	videos[3].style.opacity = "1";
	videos[3].play();
	videos[3].loop = true;
	snoozeTimers.push(handleTimer(5, option1));
	option1.addEventListener("click", () => secondInteraction(iterCount));
	option2.addEventListener("click", () => {
		console.log("clicked option 2");
	});
}
async function secondInteraction(i) {
	snoozeTimers[0+i]();
	videos[3 + i].style.opacity = "0";
	videos[3 + i].pause();
	buttons.style.opacity = "0";
	await sleep(1000);
	if (i == 1) {
		buttons.children[0].disabled = true;
		buttons.children[1].disabled = false;
		snoozeTimers.push(handleTimer(5, buttons.children[1]));

	}else{
		snoozeTimers.push(handleTimer(5, buttons.children[0]));
	}
	videos[3 + i].style.display = "none";
	videos[4 + i].style.opacity = "1";
	buttons.style.opacity = "1";
	videos[4 + i].loop = true;
	videos[4 + i].play();
	iterCount++;
}






