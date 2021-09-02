

var replaceEmotes = function (message, emotes, channel) {
    message = replaceTwitchEmotes(message, emotes);
    message = replaceBttvEmotes(message, channel);
    return message;
}

var replaceTwitchEmotes = function (message, emotes) {
    var allEmotes = []
    for( id in emotes ) {
        var url = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`;
        for( i in emotes[id]){
            var range = emotes[id][i].split("-");
            var from = parseInt(range[0]);
            var to = parseInt(range[1]);
            allEmotes.push({
                from: from,
                to: to,
                url: url,
            })
        }
    }

    allEmotes.sort((a,b)=>{
        if(a.to<b.to){
            return -1;
        }
        if(a.to>b.to){
            return 1;
        }
        return 0;
    })
    allEmotes = allEmotes.reverse();

    allEmotes.forEach((item, i)=>{
        var head = message.substring(0, item.from);
        var tail = message.substring(item.to+1, message.length);
        var img = `<img src="${item.url}">`
        message = head + img + tail;
    })

    return message;
}

var bttvEmotes = {};

var replaceBttvEmotes = function (message, channel){
    if( channel in bttvEmotes){
        bttvEmotes[channel].forEach(itm=>{
            var a = `<img src=${itm.url}>`;
            message = message.replaceAll(itm.code, a);
        })
    }
    return message;
}


var loadBttvEmotes = function (channel){
    if( channel in bttvEmotes){
        return
    }
    console.log("Load bttv emotes for channel", channel)

    var url = `https://api.betterttv.net/3/cached/users/twitch/${channel}`

    var r = new XMLHttpRequest();
    r.addEventListener("load", ()=>{
        var ch = JSON.parse(r.responseText);
        var allEmotes = [];
        ch.channelEmotes.forEach(itm=>{
            allEmotes.push({
                code: itm.code,
                url: `https://cdn.betterttv.net/emote/${itm.id}/1x`
            })
        });
        ch.sharedEmotes.forEach(itm=>{
            allEmotes.push({
                code: itm.code,
                url: `https://cdn.betterttv.net/emote/${itm.id}/1x`
            })
        });
        bttvEmotes[channel] = allEmotes;
    });
    r.open("GET", url);
    r.send();
}