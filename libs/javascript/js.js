
    $(window).on('beforeunload', function() {
        $('body').hide();
        $(window).scrollTop(0);


      });


      function changecountry (value){
        value = value.replace(" ", "%20");
      }
       
 
    

    var mymap = L.map('mapid').setView([0, 0], 2);
   
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        var layerGroup = L.layerGroup().addTo(mymap);


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
       } else { 
        alert("Geolocation is not supported by this browser.");
       }       

function showPosition(position) {
  var lat =  position.coords.latitude; 
    var long =  position.coords.longitude;


    



    layerGroup.clearLayers();
    mymap.closePopup();
    marker = L.marker([lat,long]).addTo(layerGroup);
    marker.bindPopup("Your Location").openPopup();


 
    }




    var lat1, long1;   

    $('#ButtonS').click(function() {
 

                $.ajax({
                  
                    url: "libs/php/search.php",
                    type: 'POST',
                    dataType: 'json',
                    data:{
                        country : $("#Search").val()
                    },
                    
            
                    success: function(result){
                        console.log(result);

                      

                        lat1 = result['data'][0]['latlng'][0];
                         long1 = result['data'][0]['latlng'][1];

                        
                       
                       
                    layerGroup.clearLayers();
                     mymap.closePopup();
                     mymap.setView([lat1,long1],5);
                     marker = L.marker([lat1,long1]).addTo(layerGroup);
                     marker.bindPopup($("#Search").val()).openPopup();

                

                     $('#takecountry').html(result['data'][0]['name']);
                     $('#countryc').html(result['data'][0]['currencies'][0]['name']);

          
            
                     $('#imagepreview').attr('src', " "); 

          $('#exchangesum').html('');
          $('#countrycc').html('');

        
          $.ajax({
            url:'libs/javascript/curency.json',
            type:'POST',
            
            dataType: 'json',
            success: function( json ) {
                var key = 0;
                $.each(json, function(i, value) {
                    if (i == result['data'][0]['currencies'][0]['code']){
                        console.log("ney");
                        key = key + 1;
                    }
                });

                if ( key == 0){
                    $('#exchangesum').html(" SORRY, WE DON'T HAVE INFORMATION ABOUT THIS CURENCY");
                }
             
            }
        });

       

                        
                   
                      


                            
                    },

                    
                  
            
                });
            });




            $('#Statistics').click(function() {


 

              $.ajax({
                  url: "libs/php/search.php",
                  type: 'POST',
                  dataType: 'json',
                  data:{
                      country : $("#Search").val()
                  },
                  
                
                  success: function(result){
                      console.log(result);
        
        
        
                      $('#name').html(result['data'][0]['name']);
                      $('#code').html(result['data'][0]['alpha3Code']);
                      $('#capital').html(result['data'][0]['capital']);
                      $('#population').html(result['data'][0]['population']);
                      $('#language').html(result['data'][0]['languages'][0]['name']);
                      $('#region').html(result['data'][0]['region']);
                      $('#subregion').html(result['data'][0]['subregion']);
        
                          
        
        
                          
                  },
                  error: function(){
                    $('#name').html("ney ney");
                  }
          
              });
          });

          $('#flag').click(function() {


 

            $.ajax({
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
              
                success: function(result){
                    console.log(result);
      
      
      
                    $('#imagepreview').attr('src', result['data'][0]['flag']); 
                    $('#imagemodal').modal('show'); 
                        
      
      
                        
                }
        
            });
        });

          $('#Timezone').click(function() {
 

            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    lat1 = result['data'][0]['latlng'][0];
                     long1 = result['data'][0]['latlng'][1];

                     $.ajax({
                        url: "libs/php/curl.php",
                        type: 'POST',
                        dataType: 'json',
                        data:{
                            lat: lat1,
                            lng: long1
                        },
                
                
                        success: function(result){
                            console.log(result);
                          
                                $('#time').html(result['data']['time']);
                                $('#sunrise').html(result['data']['sunrise']);
                                $('#sunset').html(result['data']['sunset']);
                        
                            
                        }
                
                    });
                    
                   
                    
               
                  


                        
                }
        
            });
        });


          /*$('#Wikipedia').click(function() {



            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    lat1 = result['data'][0]['latlng'][0];
                     long1 = result['data'][0]['latlng'][1];
 

               $.ajax({
                url: "libs/php/wiki.php",
                type: 'POST',
                dataType: 'json',
                data:{

                    lat: lat1,
                    lng: long1
                    
                },
                
              
                success: function(result){
                    console.log(result);


                    $('#summary').html(result['data'][0]['summary']);
                    $('#link').html(result['data'][0]['wikipediaUrl']);


                    $('#summary4').html(result['data'][1]['summary']);
                    $('#link4').html(result['data'][1]['wikipediaUrl']);

                   

                    $('#summary1').html(result['data'][2]['summary']);
                    $('#link1').html(result['data'][2]['wikipediaUrl']);

                    $('#summary2').html(result['data'][3]['summary']);
                    $('#link2').html(result['data'][3]['wikipediaUrl']);

                    $('#summary3').html(result['data'][4]['summary']);
                    $('#link3').html(result['data'][4]['wikipediaUrl']);


      
                        
      
      
                        
                }

            });

            }
        
            });
        });*/

        $('#Wikipedia').click(function() {

           

            $.ajax({

                url: "libs/php/wiki.php",
                type: 'POST',
                dataType: 'json',
                data:{

                    country : $('#Search').val().replace (/ /g , "%20")
                },
                
              
                success: function(result){
                    console.log(result);


                    $('#summary').html(result['data'][0]['summary']);
                    $('#link').html(result['data'][0]['wikipediaUrl']);


                    $('#summary4').html(result['data'][1]['summary']);
                    $('#link4').html(result['data'][1]['wikipediaUrl']);

                   

                    $('#summary1').html(result['data'][2]['summary']);
                    $('#link1').html(result['data'][2]['wikipediaUrl']);

                    $('#summary2').html(result['data'][3]['summary']);
                    $('#link2').html(result['data'][3]['wikipediaUrl']);

                    $('#summary3').html(result['data'][4]['summary']);
                    $('#link3').html(result['data'][4]['wikipediaUrl']);

                }

            });

        });



        $('#Weather').click(function() {
 

            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    lat1 = result['data'][0]['latlng'][0];
                     long1 = result['data'][0]['latlng'][1];

                     $.ajax({
                        url: "libs/php/weather.php",
                        type: 'POST',
                        dataType: 'json',
                        data:{
                            lat: lat1,
                            lng: long1
                        },
                
                
                        success: function(result){
                            console.log(result);
                          
                                $('#description').html(result['data']['weather'][0]['description']);
                                $('#temperature').html(result['data']['main']['temp']);
                                $('#maxtemperature').html(result['data']['main']['temp_max']);
                                $('#mintemperature').html(result['data']['main']['temp_min']);
                                $('#temperaturelike').html(result['data']['main']['feels_like']);
                                $('#humidity').html(result['data']['main']['humidity']);
                                $('#windspeed').html(result['data']['wind']['speed']);
                        
                            
                        }
                
                    });
                    
                   
                    
               
                  


                        
                }
        
            });
        });

        
        $.ajax({
            url:'libs/javascript/curency.json',
            type:'POST',
            
            dataType: 'json',
            success: function( json ) {
                $.each(json, function(i, value) {
                    $('#myselect').append($('<option>').text(i).attr('value', i));
                });
            }
        });

         
        $.ajax({
            url:'libs/javascript/country.json',
            type:'POST',
            
            dataType: 'json',
            success: function( json ) {
                $.each(json, function(i, value) {
                    $('#Search').append($('<option>').text(value).attr('value', value));
                });
            }
        });





        $('#change').click(function() {
            //$('#exchangesum').html('');
            //$('#countrycc').html('');


            $.ajax({
              
                url: "libs/php/search.php",
                type: 'POST',
                dataType: 'json',
                data:{
                    country : $("#Search").val()
                },
                
        
                success: function(result){
                    console.log(result);

                  

                    //lat1 = result['data'][0]['latlng'][0];
                    //long1 = result['data'][0]['latlng'][1];
                    var cur = result['data'][0]['currencies'][0]['code'];
                    

                
                    

                    
                     
                    


 
                 
                        $.ajax({
                            url: "libs/php/curency.php",
                            type: 'POST',
                            dataType: 'json',
                            data:{
                                base : $('#myselect').val(),
                            },
                            
                          
                            success: function(result){

                                var key = $('#myselect').val() + '_' + cur;
                                console.log(result);
                              
                  
                                    $('#exchangesum').html(result['data']['rates'][cur]*$('#sum').val());
                                    $('#countrycc').html(cur);
                                
                         
                            }
                    
                        });
                       
            

                        
                }
        
            });
        });



         


  
        


       
       

