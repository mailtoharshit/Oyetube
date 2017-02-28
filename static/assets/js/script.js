// hide result box
var hideResultBox = function() {
    $(".resutlBox").hide();
};

// hide video box
var hideVideoBox = function() {
        $(".videoBox").hide();
    }
    // show result box
var showResultBox = function(data) {
    $(".resutlBox").show();
    showBoxes(data);
};
$(document).ready(function() {
    hideResultBox();
    hideVideoBox();
    var firstTime = 0;

    $(".searchForm").keyup(function() {
        var query = $(".searchBox").val();
        if (query != "" && firstTime == 0) {
            firstTime = 1;
            youtubeApiCall(query);
        } else if (query != "" && firstTime == 1) {

            youtubeApiCall(query);

        }

        return false;
    });

    $(".searchForm").on("submit", function() {
        var query = $(".searchBox").val();
        if (query != "" && firstTime == 0) {
            firstTime = 1;

            youtubeApiCall(query);
        } else if (query != "" && firstTime == 1) {
            youtubeApiCall(query);
        }
        return false;
    });
});



var showBoxes = function(data) {
    for (var i = 0; i < 3; i++) {
        var singleData = data.items[i].snippet;

        console.log(data.items[i]);
        var imgBox = "<img src=\"" + singleData.thumbnails.medium.url + "\" class=\"imgThumb\">";
        var title = singleData.title;
        var channel = singleData.channelTitle;
        var timeInterval = 300;

        var resStirng = "<div class=\"eachResult animated slideInUp clearfix videoPlay\" id=\"" + i + "\" > " +
            "<div class=\"imgBox\">" + imgBox + "</div> " +
            "<div class=\"infoBox\"> " +
            "<div class=\"infoBoxMiddle\">" +
            "<h2 class=\"videoTitle\">" + title + "</h2> " +
            "<p class=\"channelName\">" + channel + "</p> " +
            "</div> " +
            "</div> " +
            "</div>";
        $(".resutlBox").append(resStirng);
    }

    $(".videoPlay").on("click", function() {
        var id = $(this).attr("id");
        var videoId = data.items[id].id.videoId;
        var videoTitle = data.items[id].id.videoTitle;
        onVideoAnim(videoId, videoTitle);
    });
};

var relatedVideos = function(title) {
        youtubeApiCall(title);
    }
    // perform underline animation
var parformUnderlineAnimation = function() {
    $(".searchBox").on("focus", function() {
        $(".slideBox.trueColor").addClass("active");
    });
    $(".searchBox").on("blur", function() {
        $(".slideBox.trueColor").removeClass("active");
    });
};

// perform animation on video play
var onVideoAnim = function(videoId, videoTitle) {
    $("#videoFrame").attr("src", "https://www.youtube.com/embed/" + videoId + '?autoplay=1');
    $("#infoBox").text(videoTitle);
    setTimeout(function() {
        $(".videoBox").show();
    }, 1000);
};

var clearItems = function() {
    console.log("cleard");
    $(".resutlBox").find(".eachResult").fadeOut("slow");
};

var deleteItems = function() {
    $(".resutlBox").find(".eachResult").remove();
}

// youtubeApiCall
var youtubeApiCall = function(query) {
    deleteItems();
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: query,
            type: 'video',
            key: 'AIzaSyAxUOvZf6kS55s8J81YvOFJkf-esz_cUHk',
            maxResults: 3,
            order: date
        },
        function(data) {
            showResultBox(data);
            var videoId = data.items[0].id.videoId;
            var videoTitle = data.items[0].id.videoTitle;
            onVideoAnim(videoId, videoTitle);
        }
    );
};