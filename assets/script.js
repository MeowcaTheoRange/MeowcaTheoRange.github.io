async function generateAPIIndices() {
  var quaverAPI = await fetch("https://api.quavergame.com/v1/users/full/108492");
  quaverAPI = await quaverAPI.json();
  document.body.innerHTML = document.body.innerHTML.replace(/\$QUAVERSCORE\$/gm, Math.round(quaverAPI.user.keys4.stats.overall_performance_rating * 100) / 100);
}
generateAPIIndices();