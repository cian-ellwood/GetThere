//Some code used from http://www.javascriptkit.com

var alarmsystem={
	padfield:function(f){
		return (f<10)? "0"+f : f
	},
	//Shows the current time
	showcurrenttime:function(){
		var timeobj=new Date()
		var mins = (timeobj.getMinutes())
		if (mins<10){
		var time=(timeobj.getHours())+":0"+(timeobj.getMinutes())
		}
		else{
		var time=(timeobj.getHours())+":"+(timeobj.getMinutes())
		}
		this.ctref.innerHTML=time
		this.ctref.setAttribute("title", time)
		if (typeof this.hourwake!="undefined"){
		//When alarm is set
			if (this.ctref.title==(this.hourwake+":"+this.minutewake)){
				clearInterval(alarmsystem.timer)
				//Notification and Vibration
                	playBeep1();vibrate1();
                	sleep_until(10);
                	playBeep2();vibrate2();
                	sleep_until(5);
                	playBeep3();vibrate3();
                	return false;
			}
		}
	},
	init:function(){
		//Submit button
		var timeobj=new Date()
		this.ctref=document.getElementById("alarm_time")
		this.submitref=document.getElementById("submitbutton")
		this.submitref.onclick=function(){
			alarmsystem.setalarm()
			this.value="Alarm Set"
			this.disabled=true
			return false
		}
		//Reset button
		this.resetref=document.getElementById("resetbutton")
		this.resetref.onclick=function(){
		alarmsystem.submitref.disabled=false
		alarmsystem.hourwake=undefined
		alarmsystem.hourselect.disabled=false
		alarmsystem.minuteselect.disabled=false
		return false
		}
		//Shows the selection boxes to set the alarm
		var selections=document.getElementsByTagName("select")
		this.hourselect=selections[0]
		this.minuteselect=selections[1]
		for (var i=0; i<60; i++){
			if (i<24) //If still within range of hours field: 0-23
			this.hourselect[i]=new Option(this.padfield(i), this.padfield(i), false, timeobj.getHours()==i)
			this.minuteselect[i]=new Option(this.padfield(i), this.padfield(i), false, timeobj.getMinutes()==i)

		}
		//Shows current time
		alarmsystem.showcurrenttime()
		alarmsystem.timer=setInterval(function(){alarmsystem.showcurrenttime()}, 1000)
	},
	//Sets alarm
	setalarm:function(){
		this.hourwake=this.hourselect.options[this.hourselect.selectedIndex].value
		this.minutewake=this.minuteselect.options[this.minuteselect.selectedIndex].value
		this.hourselect.disabled=true
		this.minuteselect.disabled=true
	}

}

