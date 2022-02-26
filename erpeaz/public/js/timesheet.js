frappe.ui.form.on('Timesheet', {
    	refresh(frm) {
        	frm.set_query('task', 'time_logs', function(doc, cdt, cdn) {
                var d = locals[cdt][cdn];
                return {
                    "filters": [
                    	['status',"!=","Open"],
                    	['status',"!=","Cancelled"],
                    	['project',"=",d.project]
                    ]
                };
            });
    	}
});



// frappe.ui.form.on('Timesheet',
// {
// 	onload(frm) 
// 	{
// 	   	if(frappe.user.name !==undefined)
//         {
//             frm.set_value("employee",frappe.user.name);
//         }
// 	},
// 	refresh(frm)
// 	{
// 		setTimeout(() => 
// 		{
// 			$("[data-doctype='Sales Invoice']").hide();
// 		}, 10);
// 	}
// });

// frappe.ui.form.on('Timesheet Detail',
// {
//     project:function(frm,cdt,cdn)
//     {
//         var d=locals[cdt][cdn];
//         var p=d.project;
//         frm.set_query("task",
//         function ()
//           {
// 			return{
// 				     filters:{"task":p}
// 			      };
// 	   	});
//     }
// })
