frappe.ui.form.on('Payroll Entry', {
	refresh(frm) {
		// your code here
	},
	start_date:function(frm){
            if(frm.doc.start_date > get_today())
            {
        frappe.msgprint("You can't select future dates. ");
        frappe.validated = false


            }
},
end_date:function(frm){
            if(frm.doc.end_date > get_today())
            {
        frappe.msgprint("You can't select future dates. ");
        frappe.validated = false


            }
},
before_save:function(frm) 
{
if(frm.doc.start_date > get_today() || frm.doc.end_date > get_today())
            {
        frappe.msgprint("You can't select future dates. ");
        frappe.validated = false


 }
 },
})
