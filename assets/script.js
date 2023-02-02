async function generateAPIIndices() {
  var quaverAPI = await fetch("https://api.quavergame.com/v1/users/full/108492");
  var discordLink = await fetch("https://ServerVerify.meowcatheorange.repl.co/");
  quaverAPI = await quaverAPI.json();
  discordLink = await discordLink.text();
  console.log(discordLink);
  document.body.innerHTML = document.body.innerHTML.replace(/\$QUAVERSCORE\$/gm, Math.round(quaverAPI.user.keys4.stats.overall_performance_rating * 100) / 100);
  document.querySelector(".discordLink").href = discordLink;
}
generateAPIIndices();