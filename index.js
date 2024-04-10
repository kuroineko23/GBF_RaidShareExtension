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

chrome.action.onClicked.addListener(function (tab) {                //when you click the extension
    chrome.scripting.executeScript({                                //run the following script
        target: { tabId: tab.id }, func: () => {                    //on the current tab
            return {
                raid_code: stage.pJsnData.twitter.battle_id,        //get the raid code
                raid_name: stage.pJsnData.twitter.monster,          //get the monster name
                player_name: stage.pJsnData.nickname,               //get current nickname
                player_id: stage.pJsnData.user_id,                  //get current userid
                health_remaining: Math.floor(stage.pJsnData.boss.param[0].hp / stage.pJsnData.boss.param[0].hpmax * 100) + '%'  //get current monster hp in percentage
            }
        }, world: "MAIN" //run the script in current tab
    }).then((result) => {
        sendToServer(result[0].result) //get the result and send it to specified server
    });
})

function sendToServer(code) {
    fetch(server, {                     //using fetch api to the <server> variable
        method: 'POST',                 //with POST method
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key,       //using <key> as authorization
        },
        body: JSON.stringify(code),     //send the data from previous script
        mode: "cors"
    }).then((res) => {
        console.log(res)
    })
}