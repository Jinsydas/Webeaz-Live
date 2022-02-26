frappe.ui.form.on('Job Applicant', {
	refresh(frm) {
		setTimeout(() => {
        frm.remove_custom_button('Job Offer');
      frm.remove_custom_button("Create Interview");
        frm.remove_custom_button('Job Offer', 'View');
        }, 10);
	},
			status:function(frm){
	   // console.log(frm.doc.status)
	    
	    	if(frm.doc.status==="Rejected - Resume"){
	    	msgprint("The applicant is rejected by resume. So can't schedule the interview.")
	    //	console.log("ggggg")
	    	    
	    	}
	    		if(frm.doc.status==="Schedule Interview"){
                 console.log(frm.doc.interview_time)
                    if(frm.doc.interview_time !== undefined){
                    frm.set_value("interview_time","0")
            
                    
                   
    }
        	

}


	
},

before_save:function(frm) 
{
if(frm.doc.interview_date < get_today()){
      frappe.throw("You can't schedule the interview for a past date. ");
     return false; 
 }
 },
interview_date:function(frm){
 if(frm.doc.interview_date < get_today()){
        frappe.msgprint("You can't schedule the interview for a past date. ");
        frappe.validated = false


 }
}
})
