var scrim = document.querySelector("div#scrim");
var updates = document.querySelector("span.current");

async function generateAPIIndices() {
  document.body.style.overflow = "hidden";
  updates.innerHTML = "Contacting database servers -- obtaining Discord invite link";
  await fetch("https://ServerVerify.meowcatheorange.repl.co/").then(async (discordLink) => {
    updates.innerHTML = "Database servers returned " + discordLink.status + " " + discordLink.statusText;
    discordLink = await discordLink.text();
    document.querySelector(".discordLink").href = discordLink;
  }).catch(() => {
    updates.innerHTML = "Database server contact failed";
  });
  

  updates.innerHTML = "Contacting Quaver servers -- obtaining info of user 108492";
  await fetch("https://api.quavergame.com/v1/users/full/108492").then(async (quaverAPI) => {
    updates.innerHTML = "Quaver servers returned " + quaverAPI.status + " " + quaverAPI.statusText;
    quaverAPI = await quaverAPI.json();
    document.querySelector("#quaverImage").src = quaverAPI.user.info.avatar_url;
    document.querySelector("#quaverName").innerHTML = quaverAPI.user.info.username;
    document.querySelector("#quaver4kGlobalRank").innerHTML = quaverAPI.user.keys4.globalRank;
    document.querySelector("#quaver4kCountryRank").innerHTML = quaverAPI.user.keys4.countryRank;
    document.querySelector("#quaverCountry").innerHTML = quaverAPI.user.info.country;
    document.querySelector("#quaver4kTotalScore").innerHTML = quaverAPI.user.keys4.stats.total_score;
    document.querySelector("#quaver4kRankedScore").innerHTML = quaverAPI.user.keys4.stats.ranked_score;
    document.querySelector("#quaver4kHighestCombo").innerHTML = quaverAPI.user.keys4.stats.max_combo;
    document.querySelector("#quaver4kAccuracy").innerHTML = Math.round(quaverAPI.user.keys4.stats.overall_accuracy * 100) / 100;
    document.querySelector("#quaver4kPerformance").innerHTML = Math.round(quaverAPI.user.keys4.stats.overall_performance_rating * 100) / 100;
  }).catch(() => {
    updates.innerHTML = "Quaver server contact failed";
  });
  

  updates.innerHTML = "Contacting Quaver servers -- obtaining info of user 170";
  await fetch("https://api.quavergame.com/v1/users/full/170").then(async (quaverAPIPL) => {
    updates.innerHTML = "Quaver servers returned " + quaverAPIPL.status + " " + quaverAPIPL.statusText;
    quaverAPIPL = await quaverAPIPL.json();
    document.querySelector("#quaverPLRank").innerHTML = quaverAPIPL.user.keys4.globalRank;
    document.querySelector("#quaverPLPR").innerHTML = Math.round(quaverAPIPL.user.keys4.stats.overall_performance_rating * 100) / 100;
  }).catch(() => {
    updates.innerHTML = "Quaver server contact failed";
  });
  

  updates.innerHTML = "Contacting Quaver servers -- obtaining info of user 206601";
  await fetch("https://api.quavergame.com/v1/users/full/206601").then(async (quaverAPICZ) => {
    updates.innerHTML = "Quaver servers returned " + quaverAPICZ.status + " " + quaverAPICZ.statusText;
    quaverAPICZ = await quaverAPICZ.json();
    document.querySelector("#quaverCZRank").innerHTML = quaverAPICZ.user.keys4.globalRank;
    document.querySelector("#quaverCZPR").innerHTML = Math.round(quaverAPICZ.user.keys4.stats.overall_performance_rating * 100) / 100;
  }).catch(() => {
    updates.innerHTML = "Quaver server contact failed";
  });

  updates.innerHTML = "Contacting Quaver servers -- obtaining scores of user 108492";
  await fetch("https://api.quavergame.com/v1/users/scores/recent?id=108492&mode=1").then(async (quaverScores) => {
    updates.innerHTML = "Quaver servers returned " + quaverScores.status + " " + quaverScores.statusText;
    quaverScores = await quaverScores.json();
    quaverScores.scores.slice(0, 5).forEach((score) => {
    document.querySelector(".quaverscores").innerHTML += `<div class="mspfastory singlerow">
  <div class="title"><a target="_blank" href="https://quavergame.com/mapset/map/${score.map.id}">${score.map.artist} - ${score.map.title}</a></div>
  <div class="smallinfo">
    <b>Performed on ${new Date(score.time).toLocaleDateString()}</b>
    <b>${score.map.difficulty_name} (${score.map.ranked_status === 2 ? "Ranked" : "Unranked"})</b>
    <b>by <a target="_blank" href="https://quavergame.com/user/${score.map.creator_id}">${score.map.creator_username}</a></b>
  </div>
  <div class="desc">• Modifiers: ${score.mods_string}</div>
  <div class="desc">• Performance Rating: ${Math.round(score.performance_rating * 100) / 100}</div>
  <div class="desc">• Accuracy: ${Math.round(score.accuracy * 100) / 100}%</div>
  <div class="desc">• Score: ${score.total_score}</div>
  <div class="desc">• Grade: ${score.grade}</div>
</div>`;
    });
  }).catch(() => {
    updates.innerHTML = "Quaver server contact failed";
  });
  
  
  updates.innerHTML = "Contacting MSPFA servers -- obtaining info of user 109014333296332953331";
  await fetch("https://mspfa.com/", {
    "body": "do=user&u=109014333296332953331",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "method": "POST"
  }).then(async (mspfaInfo) => {
    updates.innerHTML = "MSPFA servers returned " + mspfaInfo.status + " " + mspfaInfo.statusText;
    mspfaInfo = await mspfaInfo.json();
    var parser = new DOMParser();
    document.querySelector("#mspfaImage").src = mspfaInfo.o;
    document.querySelector("#mspfaName").innerHTML = mspfaInfo.n;
    document.querySelector("#mspfaJoined").innerHTML = new Date(mspfaInfo.d).toLocaleDateString();
    document.querySelector("#mspfaOnline").innerHTML = new Date(mspfaInfo.u).toLocaleDateString();
    document.querySelector("#mspfaDescription").innerHTML = parser.parseFromString(mspfaInfo.r, "text/html").body.innerText;
  }).catch(() => {
    updates.innerHTML = "MSPFA server contact failed";
  });
  
  updates.innerHTML = "Contacting MSPFA servers -- obtaining stories of user 109014333296332953331";
  await fetch("https://mspfa.com/", {
    "body": "do=editor&u=109014333296332953331",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "method": "POST"
  }).then(async (mspfaStories) => {
    updates.innerHTML = "MSPFA servers returned " + mspfaStories.status + " " + mspfaStories.statusText;
    mspfaStories = await mspfaStories.json();
    mspfaStories.slice(0, 5).forEach((story) => {
      if (story.t.includes("unlisted")) return;
      document.querySelector(".mspfastories").innerHTML += `<div class="mspfastory">
  <img alt="Story image" class="icon" onerror="this.src='/assets/funny.jpeg'" src="${story.o}" />
  <div class="title"><a target="_blank" href="https://mspfa.com/?s=${story.i}">${story.n}</a></div>
  <div class="smallinfo">
    <b>Created on ${new Date(story.d).toLocaleDateString()}</b>
    <b>Updated on ${new Date(story.u).toLocaleDateString()}</b>
    <b>${story.h === 2 ? "Ongoing" : (story.h === 1 ? "Inactive" : "Complete")}</b>
  </div>
  <div class="desc">${story.t.join(", ")}</div>
  <div class="desc">${story.r}</div>
</div>`;
    });
  }).catch(() => {
    updates.innerHTML = "MSPFA server contact failed";
  });
  
  updates.innerHTML = "Finished!";
  hideScrim();
}
generateAPIIndices();

function hideScrim() {
  scrim.style.opacity = "0";
  scrim.style.pointerEvents = "none";
  document.body.style.overflowY = "auto";
}