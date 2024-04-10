const regex_raid = new RegExp("https:\/\/((game\.granbluefantasy)|(gbf\.game\.mbga))\.jp\/#raid_multi\/*");
var server;
var key;

chrome.storage.local.get('_raidfinder_server', (data) => {
    if (data._raidfinder_server != null)
        server = data._raidfinder_server
})
chrome.storage.local.get('_raidfinder_key', (data) => {
    if (data._raidfinder_key != null)
        key = data._raidfinder_key
})

chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id }, func: () => {
            return {
                raid_code: stage.pJsnData.twitter.battle_id,
                raid_name: stage.pJsnData.twitter.monster,
                player_name: stage.pJsnData.nickname,
                player_id: stage.pJsnData.user_id,
                health_remaining: Math.floor(stage.pJsnData.boss.param[0].hp / stage.pJsnData.boss.param[0].hpmax * 100) + '%'
            }
        }, world: "MAIN" //bruh
    }).then((result) => {
        sendToServer(result[0].result)
    });
})

function sendToServer(code) {
    fetch(server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key,
        },
        body: JSON.stringify(code),
        mode: "cors"
    }).then((res) => {
        console.log(res)
    })
}