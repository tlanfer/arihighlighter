var clientId = "i70ttyxevsl351a4jxpws6mjde6z90";
var profileImage = function (userId, accessToken, cb) {

    fetch(`https://api.twitch.tv/helix/users?id=${userId}`, {
       method: "GET",
       headers: {
           "Client-ID": clientId,
           "Authorization": `Bearer ${accessToken}`,
           "Accept": "application/vnd.twitchtv.v5+json",
       }
    }).then(response => response.json())
      .then(data => {
          cb(data["data"][0]["profile_image_url"]);
      });

}