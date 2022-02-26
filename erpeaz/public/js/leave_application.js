frappe.ui.form.on('Leave Application', {
	refresh(frm) {
	
	},
	
	from_date:function(frm){
            if(frm.doc.from_date < get_today())
            {
        frappe.msgprint("You can't apply for leave on past dates. ");
        frappe.validated = false


            }
},
to_date:function(frm){
            if(frm.doc.to_date < get_today())
            {
        frappe.msgprint("You can't apply for leave on past dates. ");
        frappe.validated = false


            }
},
before_save:function(frm) 
{
if(frm.doc.from_date < get_today() || frm.doc.to_date < get_today())
            {
        frappe.msgprint("You can't apply for leave on past dates. ");
        frappe.validated = false


 }
 },
})
