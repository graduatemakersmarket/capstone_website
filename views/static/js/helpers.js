/*************************************************************************************************/
/* Load avatar images on the account management page
/*************************************************************************************************/
var loadFile = function(e) {
    if (e.target.files[0].type.includes('image/')) {
        var output = document.getElementById('user-avatar');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src)
        }
    }
};

/*************************************************************************************************/
/* Replace a YouTube link with its video code on the account management page
/*************************************************************************************************/
function YouTubeGetID(url){ /* https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url */
    let regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    if (url.match(regex)) {
        document.getElementById('update-video').value = url.match(regex)[1];
    }
}