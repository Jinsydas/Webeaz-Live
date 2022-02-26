frappe.ui.form.on('Attendance', {
	refresh(frm) {
		// your code here
	},
		status:function(frm)
	{
	    var t= frm.doc.status
	    //console.log(t)
	   // if(t=== "Present")
	   // {
	   //     frappe.set_value("color","#29CD42")
	        
	   // }
	    if(t==="Absent")
	    {
	         frm.set_value("color","#eb0909")
	    }
	    else if (t=== "Present")
	    {
	        frappe.set_value("color","#29CD42")
	    }
	}
})
