frappe.ui.form.on('Appointment Letter', {
	refresh(frm) {
		if(frm.is_new()){
	    	    frm.set_intro("New Confirmation Letter")
		}
	    
	},
    
	appointment_date:function(frm){
	    
	    if(frm.doc.confirmation_date > frm.doc.appointment_date){
	        frappe.msgprint("You can't create an Appointment Letter for an employee before officially confirmed.")
	    }
	},
	
before_save:function(frm){
     if (frm.doc.confirmation_date > frm.doc.appointment_date)
     {
       frappe.throw("You can't create an Appointment Letter for an employee before officially confirmed");
     return false; 
 }
},

job_applicant:function(frm)
{
	    var i=frm.doc.job_applicant;
	    console.log(i,"mmmmmmm")
	    	    frappe.call({
"method":"frappe.client.get",
"args":{
"doctype":"Interview",
"filters":{"job_applicant":i},
},
callback:function(d){
if(d){
console.log(d.message);
var t1=d.message.name
console.log(t1)
frm.set_value("ref_id",t1)
}
}
})
	}

	
})
