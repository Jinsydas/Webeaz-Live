frappe.ui.form.on('Job Offer', {

	refresh(frm) {
		 if(frm.is_new()){
	    	    frm.set_intro("New Job Offer")
	    
	}
    frm.set_query("job_applicant", function () {
			return {
				filters:{
					"status": "Selected - Interview ",
				}
			};
		});
	},
	
	offer_date:function(frm){
        if(frm.doc.offer_date < get_today()){
        frappe.msgprint("You can't select past date. ");
        frappe.validated = false


 }
},

before_save:function(frm) 
{
if(frm.doc.offer_date < get_today()){
      frappe.throw("You can't select past date.");
     return false; 
 }
 },
 
		job_applicant:function(frm)
	{
	    var i=frm.doc.job_applicant;
	    console.log(i)
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
frm.set_value("reference_no",t1)
}
}
})
	}
})

