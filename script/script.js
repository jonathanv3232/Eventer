$(document).ready(function(){
    moveRight();
    idealTemp();
    locationSet();
    currentLocationSet();
    randomBoxColors();
    resizeBlocks();
    $(window).resize(function() {
        resizeBlocks();
    })
    clickBoxes();
});

//Boxes

function randomBoxColors(){
    var colors = ["#7FDBFF","#0074D9","#001f3f","#39CCCC","#3D9970","#2ECC40","#01FF70","#FFDC00","#FF851B","#FF4136","#85144b","#F012BE","#B10DC9","#AAAAAA","#DDDDDD"];
    $(".box").each(function(){
        $(this).css('background', colors[Math.floor(Math.random()*colors.length)]);
    });
}

function resizeBlocks(){
    $('.box').height($('.box').width()/3);
    //do the same thing for the width so it fits smaller.
}

function clickBoxes(){
    $("#box1").click(function(){
        alert ("clickerino");
    });
    $("#box2").click(function(){
        alert ("clickerino");
    }); 
    $("#box3").click(function(){
        alert ("clickerino");
    }); 
    $("#box4").click(function(){
        alert ("clickerino");
    }); 
    $("#box5").click(function(){
        alert ("clickerino");
    }); 
    $("#box6").click(function(){
        alert ("clickerino");
    }); 
}

//Cloud Animation
function moveLeft() {
    $("#movingImg").animate({left: "-=30%"}, 2000, "swing", moveRight);
    
}

function moveRight() {
    $("#movingImg").animate({left: "+=30%"}, 2000, "swing", moveLeft);
}

//Ideal Temp
function idealTemp(){
    $(".btn-set").click(function(){
        var temperature= $("#idealTemp").val();
        numberCheck(temperature);
        tempDisplay(temperature);
    });
}

function numberCheck(temp){
    if(isNaN(temp)) {
        alert("Enter a number");
        idealTemp().stop()
    }
    else if(temp > 149){
        alert("Too Hot!");
        idealTemp().stop();
    } 
    else if (temp == "") {
        alert("Enter a number");
        idealTemp().stop();
    }
    else if(temp<20){
        alert("Too Cold!");
        idealTemp().stop();
    }
}


function tempDisplay(temp) {
   $("#tempDisplay").text("Your Ideal Temperature: " + temp);
}

//Location

function locationSet () {
    $('.btn-setLoc').click(function() {
        var zipcode= $("#zipcodeForm").val();
        if(zipcode==""){
            alert("Enter a Zipcode")
            locationSet().stop()

        }
        else if(isNaN(zipcode)){
            alert("Enter a Valid Zipcode")
            locationSet().stop()
        }
        else if(zipcode.length>5 || zipcode.length<5){
            alert("Enter a Valid Zipcode")
            locationSet().stop()
        }
        else{
            var url="https://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&key=AIzaSyD_-eLfqpSYqLRJBiDKv2ve2GP7HO-8hH4";
            $.getJSON(url,function(data){
                var city=data.results[0].address_components[1].long_name
                var zip= data.results[0].address_components[0].long_name
                var country=data.results[0].address_components[5].short_name
                $('#locationDisplay').text("Your Location:"+city+","+zip)
                //USE WEATHER FUNCTION HERE WITH ZIP CODE
            })
        }
    })
}

function currentLocationSet() {
    $(".btn-curLoc").click(function() {
    var locDiv=$("#locationDisplay")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        locDiv.text("Geolocation is not supported by this browser.");
        currentLocationSet().stop();
    }
    function showPosition(position) {
        var lat=position.coords.latitude;
        var long=position.coords.longitude;
        getZip(lat,long);
    }
  });
}

function getZip(latitude,longitude){
    var url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyD_-eLfqpSYqLRJBiDKv2ve2GP7HO-8hH4";
    $.getJSON(url,function(data){
            var city=data.results[0].address_components[2].long_name
            var zip= data.results[0].address_components[7].long_name
            var country=data.results[0].address_components[6].short_name
            $('#locationDisplay').text("Your Location:"+city+","+zip)
            getForecast(zip,country);
    })
    
}

//OpenWeather

function getForecast(zipcode,country){
    var api_key="623c7e489e6b97e211bd1d20ccea234d";
    var url="http://api.openweathermap.org/data/2.5/weather?zip="+zipcode+","+country+"&appid="+api_key;
    $.getJSON(url, function(data) {
        console.log(data);
    })

}

//api key for openweathermap = 623c7e489e6b97e211bd1d20ccea234d
//Wunder=f9dfa1e87efd1b7d

