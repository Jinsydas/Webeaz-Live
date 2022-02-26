frappe.ui.form.on('Salary Slip', {
	refresh(frm) {
		// your code here
	},
	start_date:function(frm){
            if(frm.doc.start_date > get_today())
            {
        frappe.msgprint("You can't process salary for future dates. ");
        frappe.validated = false


            }
},
end_date:function(frm){
            if(frm.doc.end_date > get_today())
            {
        frappe.msgprint("You can't process salary for future dates. ");
        frappe.validated = false


            }
},
before_save:function(frm) 
{
if(frm.doc.start_date > get_today() || frm.doc.end_date > get_today())
            {
        frappe.msgprint("You can't process salary for future dates. ");
        frappe.validated = false


 }
 },
})
