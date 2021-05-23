
var myVar ;
var myState  ;
var myStateName ;
var myDistrict ;
var myDistName ;
var myAge ;
var checkDose1 = 0;
var checkDose2 = 0 ;

var states = {"states":[{"state_id":1,"state_name":"Andaman and Nicobar Islands"},{"state_id":2,"state_name":"Andhra Pradesh"},{"state_id":3,"state_name":"Arunachal Pradesh"},{"state_id":4,"state_name":"Assam"},{"state_id":5,"state_name":"Bihar"},{"state_id":6,"state_name":"Chandigarh"},{"state_id":7,"state_name":"Chhattisgarh"},{"state_id":8,"state_name":"Dadra and Nagar Haveli"},{"state_id":37,"state_name":"Daman and Diu"},{"state_id":9,"state_name":"Delhi"},{"state_id":10,"state_name":"Goa"},{"state_id":11,"state_name":"Gujarat"},{"state_id":12,"state_name":"Haryana"},{"state_id":13,"state_name":"Himachal Pradesh"},{"state_id":14,"state_name":"Jammu and Kashmir"},{"state_id":15,"state_name":"Jharkhand"},{"state_id":16,"state_name":"Karnataka"},{"state_id":17,"state_name":"Kerala"},{"state_id":18,"state_name":"Ladakh"},{"state_id":19,"state_name":"Lakshadweep"},{"state_id":20,"state_name":"Madhya Pradesh"},{"state_id":21,"state_name":"Maharashtra"},{"state_id":22,"state_name":"Manipur"},{"state_id":23,"state_name":"Meghalaya"},{"state_id":24,"state_name":"Mizoram"},{"state_id":25,"state_name":"Nagaland"},{"state_id":26,"state_name":"Odisha"},{"state_id":27,"state_name":"Puducherry"},{"state_id":28,"state_name":"Punjab"},{"state_id":29,"state_name":"Rajasthan"},{"state_id":30,"state_name":"Sikkim"},{"state_id":31,"state_name":"Tamil Nadu"},{"state_id":32,"state_name":"Telangana"},{"state_id":33,"state_name":"Tripura"},{"state_id":34,"state_name":"Uttar Pradesh"},{"state_id":35,"state_name":"Uttarakhand"},{"state_id":36,"state_name":"West Bengal"}],"ttl":24};

$( document ).ready(function() {
     //test with no data in cache
    // chrome.storage.sync.remove(['storedStateId','storedStateName','storedDistId','storedDistName'],function(){
    //     console.log('sync removed ');
    // });

    chrome.storage.sync.get(['storedStateId'], function(result) {
        myState = result.storedStateId;
        if(myState!=undefined){
        $("#dropdownStates ul li a").parents(".dropdown").find('.btn').val(myState);
        console.log('myState retrieved is ' + myState);
        getDistrict ();
        }
    });  

    chrome.storage.sync.get(['storedStateName'], function(result) {
       // alert(JSON.stringify(result.storedStateName));
        myStateName = result.storedStateName;
        if(myStateName!=undefined){
        $("#dropdownStates ul li a").parents(".dropdown").find('.btn').html(myStateName + ' <span class="caret"></span>');
        console.log('myStateName retrieved is ' + myStateName);
        }
    });

    chrome.storage.sync.get(['storedDistId'], function(result) {
        myDistrict = result.storedDistId ;
        if(myDistrict!=undefined){
        $("#dropdownDist ul li a").parents(".dropdown").find('.btn').val(myDistrict);
        console.log('myDistrict retrieved to ' + myDistrict);
        }
    });

    chrome.storage.sync.get(['storedDistName'], function(result) {
        myDistName = result.storedDistName ;
        if(myDistName!=undefined){
        $("#dropdownDist ul li a").parents(".dropdown").find('.btn').html(myDistName + ' <span class="caret"></span>');
        console.log('myDistName retrieved to ' + myDistName);
        }
    }); 

    for( var index in states.states ) {
        //console.log("in state drop down");
        var id = states.states[index].state_id ;
        var name = states.states[index].state_name ;
          $('#dropdownStates ul ').append('<li><a href="#" id="'+id+'" value="'+name+'">'+name+'</a></li>');
            }

      $("#dropdownAge ul li a").click(function(){
        console.log( "which age is clicked: " + $(this).text());
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
      });

     //on dynamic data states
      $("#dropdownStates ul li").on("click", "a", function(){
        console.log( "which state is clicked: " + this.innerHTML); //<a href="#" id="(7,'Chhattisgarh')" value="7">Chhattisgarh</a>
        console.log( "which state is clicked2: " + this.innerText ); //chahhatis
        console.log( "which state is clicked3: " + this.getAttribute("id")); //chahhatis
        console.log( "which state is clicked4: " + this.getAttribute("value")); 
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
      //  alert($(this).text());
      //  alert($(this).data('value')); //not set
        myState = this.getAttribute("id") ;
        myStateName = this.getAttribute("value");
        chrome.storage.sync.set({'storedStateId':myState}, function() {
            console.log('storedStateId is set to ' + myState);
           
          });
        chrome.storage.sync.set({'storedStateName':myStateName}, function() {
            console.log('storedStateName is set to ' + myStateName);
          });  
          getDistrict ();
      });

      //on dynamic data district
      $("#dropdownDist ul ").on("click", "li a", function(){
        console.log( "which dist is clicked: " + this.getAttribute("id"));  
        console.log( "which dist is clicked2: " + this.getAttribute("value"));  
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        myDistrict = this.getAttribute("id") ;
        myDistName = this.getAttribute("value") ;
        chrome.storage.sync.set({'storedDistId':myDistrict}, function() {
            console.log('storedDistId is set to ' + myDistrict);
          });
        chrome.storage.sync.set({'storedDistName':myDistName}, function() {
            console.log('storedDistName is set to ' + myDistName);
          }); 
        
    });

    //on dynamic data age
    $("#dropdownAge ul li").on("click", "a", function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        myAge = this.getAttribute("id") ;
        chrome.storage.sync.set({"storedAge":myAge}, function() {
            console.log('storedAge is set to ' + myAge);
          });
    });
     

    $("#startMonitoring").click(function(){
        console.log( "startMonitoring: ");
        startMonitoring();
    });

    $("#stopMonitoring").click(function(){
        console.log( "stopMonitoring: ");
        stopMonitoring();
    });

    $("#clearlog").click(function(){
        console.log( "clearlog: ");
        clearlog();
    });

    $("#Dose1").click(function(){
        console.log( "Dose1: ");
        Dose1();
    });

    $("#Dose2").click(function(){
        console.log( "Dose2: ");
        Dose2();
    });

    $("#BothDose").click(function(){
        console.log( "BothDose: ");
        BothDose();
    });
 
//once age is loaded then let start the monitoring 
  chrome.storage.sync.get(['storedAge'], function(result) {
    myAge = result.storedAge ;
    if(myAge!=undefined){
    $("#dropdownAge ul li a").parents(".dropdown").find('.btn').html(myAge + ' <span class="caret"></span>');
    console.log('storedAge retrieved to ' + myAge);
    //startMonitoring();
    }
  });


});

function getDistrict () { 
    console.log( "getdistrict is called: " + myState  );
    var myurl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+ myState ;
    console.log(myurl);
   $.ajax({
       type: "get",
       url: myurl,
       dataType: "json", 
       success: function(data){
        //console.log("in dist drop down populating " + data);
        $('#dropdownDist ul ').empty();
        for( var index in data.districts ) {
              var id = data.districts[index].district_id ;
              var name = data.districts[index].district_name ;
              $('#dropdownDist ul ').append('<li><a href="#" id="'+id + '"  value="' + name  + '">' + name+'</a></li>');
           }
       }
   }) ;
}

function startMonitoring () {
        if ( myState == undefined ){
            //alert(" myState i should not be called "+myState);
            $("#myalerts").show();
            $("#myalerts").empty();
            $("#myalerts").append('<span>Please select the State.</span>');
             
        }else if ( myDistrict == undefined ){
            $("#myalerts").show();
            $("#myalerts").empty();
            $("#myalerts").append('<span>Please select the District.</span>');
             
        }else if ( myAge == undefined ){
            $("#myalerts").show();
            $("#myalerts").empty();
            $("#myalerts").append('<span>Please select the Age.</span>');
             
        } else  if( myDistrict != undefined  && myAge != undefined ){
            getData();
            if ( myVar != undefined ){
              clearInterval(myVar);
            }
            myVar = setInterval(getData, 3000);
            $("#myalerts").hide();
           // $("p").css("background-color", "rgb(0,0,255)");
            $("p").append("<b>"+ myStateName + " : " +myDistName + ", above: " + myAge +" years. Monitoring is started</b>.<br>");
            updateScroll();
            }
    }

function stopMonitoring () {
    clearInterval(myVar);
    $("p").append("<b>Monitoring is stopped</b>.<br>");
    updateScroll();
    }

function clearlog () {
    
    $("p").empty();
    $("p").append("<b>Log is cleared</b>.<br>");
    updateScroll();
    }

function Dose1(){
        checkDose1 = 1;
        checkDose2 = 0 ;
      }
  
function Dose2(){
            checkDose1 = 0;
            checkDose2 = 1 ;
      }   
  
function  BothDose(){
      checkDose1 = 0;
      checkDose2 = 0 ;
  }

function updateScroll(){
    var gettext = $("p").text() ;
    //console.log(gettext);
    if (gettext.length > 5000){
        getsubtext = gettext.substring(3000, 5000);
       $("p").empty();
       $("p").append(getsubtext);
    }

    var element = document.getElementById("mylog");
    //console.log(element.innerHTML);
    element.scrollTop = element.scrollHeight;
   }

function getData () { 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+'-'+mm+'-'+yyyy;
    //console.log(today);
     var myurl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+myDistrict+"&date="+today  ;
     console.log(myurl);

    var tryCount = 0
    $.ajax({
        type: "get",
        url: myurl,
        //url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=363&date=15-05-2021",
        dataType: "json", 
        success: function(data){
            //console.log(data["centers"]);
            var count = 0 ;
            tryCount = 0 ;
            for(var i = 0; i < data["centers"].length; i++) {
                var center = data["centers"][i];
                for(var x = 0; x < center["sessions"].length; x++) {
                    var y = center["sessions"][x];
                    if (y["min_age_limit"] == myAge && y["available_capacity"] > 0 ){
                        if( y["available_capacity_dose1"]>1  && checkDose1 ==0 && checkDose2 ==0     ){
                            // console.log("Vaccine available: " + y["vaccine"] + " at " +  center["address"] + "for age above " + 
                            //   + y["min_age_limit"] + " on date: " + y["date"] );
                            var todayDate = formatAMPM(new Date());
                            $("p").append(todayDate+ " " + y["vaccine"] + " at " +  center["address"] + " for age above " + 
                            + y["min_age_limit"] + " on date: " + y["date"] +  "Quantity Dose 1/2: " + y["available_capacity"]  +  ".<br>");
                            count = count + 1 ;
                            var x = document.getElementById("myAudio"); 
                            updateScroll();
                            }

                        else if( y["available_capacity_dose1"]>1  && checkDose1 ==1  ){
                            // console.log("Vaccine available: " + y["vaccine"] + " at " +  center["address"] + "for age above " + 
                            //   + y["min_age_limit"] + " on date: " + y["date"] );
                            var todayDate = formatAMPM(new Date());
                            $("p").append(todayDate+ " " + y["vaccine"] + " at " +  center["address"] + " for age above " + 
                            + y["min_age_limit"] + " on date: " + y["date"] +  " Quantity Dose1: " + y["available_capacity_dose1"]  +  ".<br>");
                            count = count + 1 ;
                            var x = document.getElementById("myAudio"); 
                            updateScroll();
                            }

                        else if( y["available_capacity_dose2"]>1  && checkDose2 ==1    ){
                            // console.log("Vaccine available: " + y["vaccine"] + " at " +  center["address"] + "for age above " + 
                            //   + y["min_age_limit"] + " on date: " + y["date"] );
                            var todayDate = formatAMPM(new Date());
                            $("p").append(todayDate+ " " + y["vaccine"] + " at " +  center["address"] + " for age above " + 
                            + y["min_age_limit"] + " on date: " + y["date"] +  " Quantity Dose2: " + y["available_capacity_dose2"]  +  ".<br>");
                            count = count + 1 ;
                            var x = document.getElementById("myAudio"); 
                            updateScroll();
                            }

                    }
                }
    
            } 
            if (count == 0) {
                var todayDate = formatAMPM(new Date());
                $("p").append( todayDate + " No Vaccine Available (Dose 1/2) in " +  myDistName + " for age above " + myAge + ".<br>");
                updateScroll();
            }; 

        }
    
    }) ;
    tryCount = tryCount +1;
 
}

    
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var sec = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + sec + ' ' + ampm;
    return strTime;
  }


 