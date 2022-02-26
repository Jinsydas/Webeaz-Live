frappe.ui.form.on('Employee', {
	refresh(frm) {
	if(frm.is_new()){
	    	    frm.set_intro("Register Employees Here")
	    
	}
	},
	date_of_joining:function(frm){
	    
	    if (frm.doc.offer_date > frm.doc.date_of_joining)
	    {
	        msgprint("Employee  date of joining can't be before the offer date")
	    }
	    
	},
 salutation:function(frm)
 {
        var t=frm.doc.salutation
       // console.log("POPOPOPOPO",t)
        if(t=="Mrs" || t=="Miss" || t=="Ms")
        {
          frm.set_value("genders","Female");
            // frm.refresh(gender)
            //msgprint("PPPPPPP")
        }else
        {
            frm.set_value("genders","Male");
            
        }
        }	,
before_save:function(frm) 
{
 if (frm.doc.offer_date > frm.doc.date_of_joining){
      frappe.throw("Employee  date of joining can't be before the offer date.");
     return false; 
 }
 },
 
 onload(frm)
{
    console.log("mmmmmmmmmmmmmmmmmmmmm")
    
    // const is_employee = frappe.user.has_role("Employee")
    // console.log(is_employee,"hi")
 var a=frm.doc.email_id
 console.log(a)
 if(frm.doc.email_id !== undefined)
 {
                   frm.set_value("email_id",undefined)
 }
            
      //cur_frm.set_df_property(“employee_status”, “read_only”,1);
        //console.log(a,"aaaaaaaaaaaaaaaaaaaaaaaaaa")
   
}
})
