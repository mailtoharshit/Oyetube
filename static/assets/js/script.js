$(document).ready(function() {
    hideResultBox();
    hideVideoBox();
    parformUnderlineAnimation();

    var firstTime = 0;

    $(".searchForm").keyup(function() {
        var query = $(".searchBox").val();
        if (query != "" && firstTime == 0) {
            firstTime = 1;
            afterSearchAnim();
            youtubeApiCall(query);
        } else if (query != "" && firstTime == 1) {
            clearItems();
            youtubeApiCall(query);

        }

        return false;
    });

    $(".searchForm").on("submit", function() {
        var query = $(".searchBox").val();
        if (query != "" && firstTime == 0) {
            firstTime = 1;
            afterSearchAnim();
            youtubeApiCall(query);
        } else if (query != "" && firstTime == 1) {
            clearItems();
            youtubeApiCall(query);
        }
        return false;
    });
});

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

// perform aftersearch animation
var afterSearchAnim = function() {
    $(".contentBox").addClass("active");
    $(".logo").addClass("active");
    $(".searchBoxArea").addClass("active");
    $(".slideBox").addClass("slideBoxActive");
    $(".searchForm").addClass("active");
    $(".searchBox").addClass("active");
};

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
    $("#infoBox").html(videoTitle);

    $(".logo").addClass("fadeOut");
    $(".searchBoxArea").addClass("fadeOut");
    $(".resutlBox").addClass("fadeOut");
    $(".contentBox").addClass("contentBoxBig");

    setTimeout(function() {
        $(".videoBox").show();
    }, 1000);

    $(".closeVideoBtn").on("click", function() {
        onVideoClose();
    });
};

var onVideoClose = function() {
    $(".videoBox").addClass("fadeOut");

    setTimeout(function() {
        $(".videoBox").hide();
        $(".videoBox").removeClass("fadeOut");
        $(".contentBox").removeClass("contentBoxBig");
        $(".logo").removeClass("fadeOut");
        $(".searchBoxArea").removeClass("fadeOut");
        $(".resutlBox").removeClass("fadeOut");
    }, 1000);
};

// youtubeApiCall
var youtubeApiCall = function(query) {
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: query,
            type: 'video',
            key: 'AIzaSyAxUOvZf6kS55s8J81YvOFJkf-esz_cUHk',
            maxResults: 3
        },
        function(data) {
            showResultBox(data);
            var videoId = data.items[0].id.videoId;
            var videoTitle = data.items[0].id.videoTitle;

            onVideoAnim(videoId, videoTitle);
        }
    );
};

var clearItems = function() {
    console.log("cleard");
    $(".resutlBox").find(".eachResult").fadeOut("slow");
    $(".resutlBox").fadeOut("slow");
};