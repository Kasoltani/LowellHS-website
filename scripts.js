//FADE
function parallaxFade() {
	scrollPos = $(this).scrollTop();
	$('.top').css({
        'background-position' : '50% ' + (-scrollPos/4)+"px",
        'opacity': 1-(scrollPos/1000)
	});
	$('.top h1').css({
		'margin-top': (scrollPos/4)+"px",
		'opacity': 1-(scrollPos/1000)
	});
}

$(document).ready(function(){
	$(window).scroll(function() {
		parallaxFade();
	});
});

//SCROLL
$(function() {
    $('.scroll-down').click (function() {
      $('html, body').animate({scrollTop: $('.bar').offset().top }, 'slow');
      return false;
    });
  });

//SCHEDULE
$(function(){
    setInterval(function(){
        
        const week = ['W', '-', '-', '-', '-', '-', 'W']
                                                    
        $('#week h3').html('Schedule for the week')
        $('.schedule #mon').html('Mon: ' +week[1]);
        $('.schedule #tue').html('Tue: ' +week[2]);
        $('.schedule #wed').html('Wed: ' +week[3]);
        $('.schedule #thu').html('Thu: ' +week[4]);
        $('.schedule #fri').html('Fri: ' +week[5]);
        
        var date = new Date();
        var day = date.getDay();
        var hr = date.getHours();
        var min = date.getMinutes();
        if(min < 10){
            min = `0${min}`
        }
        let t = `${hr}${min}`;
        let time = parseInt(t);
        
        var code = '';
        var next = '';
        var nsd = 1; //next school day
        var nCode; //next school day code
        var nextD = 1;
        for(var i = 0; i < week.length; i++){
            if(i == day){
                code = week[i];
                codeP = week[i-1];
                

            }
        }

        function nextDay (d){
            nextD = d + 1;
            if(nextD > 6){
                nextD = 0;
            }
            next = week[nextD];
            nCode = next;
            
            if(next == 'W' || next == 'H'){
                nsd++;
                $('#week h3').html('Schedule for next week')
         
                nextDay(nextD);
            }


        }

        nextDay(day);

        

    
    
        $('#date').html(date.toLocaleDateString())//current date
    
        //MONDAY SCHEDULE
        const mStart = ['950', '1030', '1110', '1135', '1215', '1255', '1335', '1415', '1455']
        const mEnd = ['1025', '1105', '1130', '1210', '1250', '1330', '1410', '1450', '1530'];
        //NEUTRAL SCHEDULE
        const nStart = ['750', '845', '940', '1005', '1060', '1155', '1250', '1345', '1440']
        const nEnd = ['840', '935', '960', '1055', '1150', '1245', '1340', '1435', '1530'];

        if(code == 'W' || code == 'H'){
            var currentDate = new Date(new Date().getTime() + 24 * nsd * 60 * 60 * 1000);
            var d = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            $('.schedule #date').html(`Schedule for ${month}/${d}/${year}`);
            $('.schedule #code').html('Code: '+nCode);
            if(nCode == 'M'){
                mTimes();
            }else if(nCode == 'N'){
                nTimes();
            }else{
                nTimes(); //add special schedules
            }
            
        }
    
        function mTimes(){
            $('.schedule #code').html('Code: M');
            //START
            $('.schedule #b1 #start').html("9:50am");
            $('.schedule #b2 #start').html("10:30am");
            $('.schedule #reg #start').html("11:10am");
            $('.schedule #b3 #start').html("11:35am");
            $('.schedule #b4 #start').html("12:15pm");
            $('.schedule #b5 #start').html("12:55pm");
            $('.schedule #b6 #start').html("1:35pm");
            $('.schedule #b7 #start').html("2:15pm");
            $('.schedule #b8 #start').html("2:55pm");
            //END
            $('.schedule #b1 #end').html("10:25am");
            $('.schedule #b2 #end').html("11:05am");
            $('.schedule #reg #end').html("11:30am");
            $('.schedule #b3 #end').html("12:10pm");
            $('.schedule #b4 #end').html("12:50pm");
            $('.schedule #b5 #end').html("1:30pm");
            $('.schedule #b6 #end').html("2:10pm");
            $('.schedule #b7 #end').html("2:50pm");
            $('.schedule #b8 #end').html("3:30pm");
    
        }
    
        function nTimes(){
            $('.schedule #code').html('Code: N');
            //START
            $('.schedule #b1 #start').html("7:50am");
            $('.schedule #b2 #start').html("8:45am");
            $('.schedule #reg #start').html("9:40am");
            $('.schedule #b3 #start').html("10:05am");
            $('.schedule #b4 #start').html("11:00am");
            $('.schedule #b5 #start').html("11:55am");
            $('.schedule #b6 #start').html("12:50pm");
            $('.schedule #b7 #start').html("1:45pm");
            $('.schedule #b8 #start').html("2:40pm");
            //END
            $('.schedule #b1 #end').html("8:40am");
            $('.schedule #b2 #end').html("9:35am");
            $('.schedule #reg #end').html("10:00am");
            $('.schedule #b3 #end').html("10:55am");
            $('.schedule #b4 #end').html("11:50am");
            $('.schedule #b5 #end').html("12:45pm");
            $('.schedule #b6 #end').html("1:40pm");
            $('.schedule #b7 #end').html("2:35pm");
            $('.schedule #b8 #end').html("3:30pm");
    
        }

        function m(){
            var endTime = '';
            var sstart;
            var cb;
            var nb;
            var nI;
            let passing = false;
            for(var i = 0; i < mStart.length; i++){
                if(time >= mStart[0]-100 && time < mStart[0]){
                    endTime = mStart[0];
                    sstart = false;
                }else if(mStart[i] <= time && time < mEnd[i] ){
                    cb = `Block ${i}`;
                    endTime = mEnd[i];
                    sstart = true;
    
                }else if(mEnd[i] <= time && time < mStart[i+1] ){ //passing
                    endTime = mStart[i+1];
                    nI = i + 1;
                    var nb = 'Block ' + nI;
                    passing = true;
                
                }else if(time > mEnd[8]){
                    endTime = '';
                    sstart = false;
                    
                }
            }
            
    
            if(endTime == '' && time > mEnd[8]){
    
                var currentDate = new Date(new Date().getTime() + 24 * nsd * 60 * 60 * 1000);
                var d = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                $('.schedule #date').html(`Schedule for ${month}/${d}/${year}`);
                $('.schedule #code').html('Code: '+nCode);
                if(nCode == 'M'){
                    mTimes();
                }else if(nCode == 'N'){
                    nTimes();
                }
    
            }else{
    
                
                if(cb == 'Block 0'){
                    cb = 'Block 1';
                }else if(cb == 'Block 1'){
                    cb = 'Block 2';
                }else if(cb == 'Block 2'){
                    cb = 'Reg';
                }
                
                var timeLeft = endTime - time;
                
                if(timeLeft > 35){
                    timeLeft = timeLeft - 40;
                }
                    
                if(sstart == false){
                    timeLeft = endTime - time;
                    if(timeLeft > 35){
                        timeLeft = timeLeft - 40;
                    }
                    if(timeLeft == 1){
                        $('.schedule #timeleft').html(`Block 1 starts in ${timeLeft} minute`);
                    }else{
                        $('.schedule #timeleft').html(`Block 1 starts in ${timeLeft} minutes`);
                    }
                }else if(passing  ==  true){
                    if(nb == 'Block 0'){
                        nb = 'Block 1';
                    }else if(nb == 'Block 1'){
                        nb = 'Block 2';
                    }else if(nb == 'Block 2'){
                        nb = 'Reg';
                    }
    
                    if(timeLeft == 1){
                        $('.schedule #timeleft').html(`${nb} starts in ${timeLeft} minute`);
                    }else{
                        $('.schedule #timeleft').html(`${nb} starts in ${timeLeft} minutes`);
                    }
                }else if(sstart == true){
                    if(timeLeft == 1){
                        $('.schedule #timeleft').html(`${cb} ends in ${timeLeft} minute`);
                    }else{
                        $('.schedule #timeleft').html(`${cb} ends in ${timeLeft} minutes`);
                    }
                   
                }        
                
            }
        }
        function n(){
            var endTime = '';
            var sstart;
            var cb;
            var nb;
            var nI;
            var passing;
            for(var i = 0; i < nStart.length; i++){
                if(time >= nStart[0]-100 && time < nStart[0]){
                    endTime = nStart[0];
                    sstart = false;
                }else if(nStart[i] <= time && time < nEnd[i] ){
                    cb = `Block ${i}`;
                    endTime = nEnd[i];
                    sstart = true;
                }else if(nEnd[i] <= time && time < nStart[i+1] ){ //passing
                    endTime = nStart[i+1];
                    nI = i + 1;
                    var nb = 'Block ' + nI;
                    passing = true;
                
                }else if(time > nEnd[8]){
                    endTime = '';
                    sstart = false;
                }
    
            }
    
           
            if(endTime == ''){
                
                var currentDate = new Date(new Date().getTime() + 24 * nsd * 60 * 60 * 1000);
                var d = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                $('.schedule #date').html(`Schedule for ${month}/${d}/${year}`);
                $('.schedule #code').html('Code: '+nCode);
                if(nCode == 'M'){
                    mTimes();
                }else if(nCode == 'N'){
                    nTimes();
        
                }
    
            }else{
    
                if(cb == 'Block 0'){
                    cb = 'Block 1';
                }else if(cb == 'Block 1'){
                    cb = 'Block 2';
                }else if(cb == 'Block 2'){
                    cb = 'Reg';
                }
                
                var timeLeft = endTime - time;
                
                if(timeLeft > 50){
                    timeLeft = timeLeft - 40;
                }
                    
                if(sstart == false){
                    timeLeft = endTime - time;
                    if(timeLeft > 50){
                        timeLeft = timeLeft - 40;
                    }
                    if(timeLeft == 1){
                        $('.schedule #timeleft').html(`Block 1 starts in ${timeLeft} minute`);
                    }else{
                        $('.schedule #timeleft').html(`Block 1 starts in ${timeLeft} minutes`);
                    }
                }else if(passing  ==  true){
                    if(nb == 'Block 0'){
                        nb = 'Block 1';
                    }else if(nb == 'Block 1'){
                        nb = 'Block 2';
                    }else if(nb == 'Block 2'){
                        nb = 'Reg';
                    }
    
                    if(timeLeft == 1){
                        $('.schedule #timeleft').html(`${nb} starts in ${timeLeft} minute`);
                    }else{
                        $('.schedule #timeleft').html(`${nb} starts in ${timeLeft} minutes`);
                    }
                }else if(sstart == true){
                    if(timeLeft == 1){
                        $('.schedule #timeleft').html(`${cb} ends in ${timeLeft} minute`);
                    }else{
                        $('.schedule #timeleft').html(`${cb} ends in ${timeLeft} minutes`);
                    }
                   
                }        
                
            }
        }
    
        if(code == 'M'){
            mTimes();
            m();
        }
    
        if(code == 'N'){
            nTimes();
            n();
            
        }

        if(code == 'R'){
            $('.schedule #code').html('RALLY');
        }

        if(code == 'E'){
            $('.schedule #code').html('PSAT');
        }

    }, 100)
    
})