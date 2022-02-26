frappe.ui.form.on('Interview', {
    
	refresh(frm) 
	{
 	    cur_frm.set_df_property("interview_details", "hidden", true);
 	    cur_frm.set_df_property("expected_average_rating", "hidden", true);
	     cur_frm.set_df_property("resume_link", "hidden", true);
cur_frm.set_df_property("interview_summary", "hidden", true);
		
		if(frm.is_new())
		{
	    	    frm.set_intro("Conduct New Interview")
		}

        setTimeout(() => 
        {
    frm.remove_custom_button('Reschedule Interview');
       
 }, 10);
	},
	
		to_time:function(frm){
	    
	    if (frm.doc.from_time > frm.doc.to_time)
	    {
	        msgprint("To-time must be greater than From-time.")
	    }
	},
	before_save:function(frm) 
{
 if (frm.doc.from_time > frm.doc.to_time){
       frappe.throw("To-time must be greater than From-time.");
     return false; 
 }
 },
after_save(frm){
   //console.log("sssssssssss")
   
    if(frm.doc.status==="Cleared")
    {
        var a = frm.doc.job_applicant
        //console.log(a,"mmmmmmmmmmmmm")
        msgprint("Job applicant Status changed")
        frappe.db.set_value("Job Applicant",frm.doc.job_applicant,"status","Selected - Interview")
    }
       
    
    if(frm.doc.status==="Rejected")
    {
        var b = frm.doc.job_applicant
        //console.log(a,"mmmmmmmmmmmmm")
        msgprint("Job applicant Status changed")
        frappe.db.set_value("Job Applicant",frm.doc.job_applicant,"status","Rejected - Interview")
       
    }
    
},


interview_round:function(frm)
{
   
    var t=frm.doc.job_applicant
        console.log("PPPPPPP",t)
         // frm.refresh("interview_round")
     if(frm.doc.interview_round!==undefined)
     {
        frm.set_value("resume",undefined)
    }
    // else{
    //     console.log("OOOOOO")
    // }
},

total_score:function(frm){
if(frm.doc.total_score>=6)
{
frm.set_value("status","Cleared")
}
if(frm.doc.total_score==5)
{
frm.set_value("status","Under Review")
}
if(frm.doc.total_score<5)
{
frm.set_value("status","Rejected")
}


},
job_applicant:function(frm)
{
    var k=frm.doc.job_applicant
    console.log(k)
//     // frm.refresh("interview_round")
//     console.log("eeeeeeeeeeeee")

// var y=frm.doc.email_id
// console.log("LLLLLL",y)
frappe.call({
"method":"frappe.client.get",
 "args":{
 "doctype":"Job Applicant",
 "filters":{"email_id":k},
 },
 callback:function(d)
 {
    if(d){
    console.log(d.message);
    var t1=d.message.interview_time
 var t2=d.message.resume_attachment
 var t3=d.message.interview_date
 console.log(t1)
 console.log(t2)
 frm.set_value("scheduled_on",t3)
  frm.set_value("from_time",t1)
frm.set_value("resume",t2)
 }
 }
 })

}
});




const a=[];
var t=0;

frappe.ui.form.on('Score Card Valuation', {
	refresh(frm) {
		
	},
		score:function(frm,cdt,cdn)
		{
		    var d=locals[cdt][cdn];
		   // console.log("index of array"+d.idx);
		    var i=d.idx-1;
		    a[i]=d.score;
		    
		    //console.log("full array "+a);
		    //console.log("array length"+a.length);
		    
		    
		    var sum = 0;
             for (let n = 0; n < a.length; n++) 
             {
                 var f=flt(a[n]);
                sum =sum+f;
             }
             //console.log("sum is"+sum);
            frm.set_value("total_score",sum);
            
            
        
	},
       
        
	    
	
	before_score_card_valuation_remove:function(frm,cdt,cdn)
		{
		    var d=locals[cdt][cdn];
		    //console.log("index of array"+d.idx);
		    var i=d.idx-1;
		    a[i]=0
		    
		    //console.log("full array "+a);
		    //console.log("array length"+a.length);
		    
		    
		     var sum = 0;
             for (let n = 0; n < a.length; n++) 
             {
                 var f=flt(a[n]);
                sum =sum+f;
             }
             //console.log("sum is"+sum);
            
		     frm.set_value("total_score",sum);
		        
		}
})
