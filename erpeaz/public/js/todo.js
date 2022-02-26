var t4;
var v="new";
frappe.ui.form.on('ToDo', 
{
     refresh(frm){
         frm.add_custom_button(__('Timesheet'), function()
  {
 frappe.set_route("Form", "Timesheet")



 }, __("Add"));
    },
    onload(frm)
    {
    console.log(frm)
      if(frm.doc.status==="Open"&&frm.doc.owner!==undefined)
      {
          v="exist";
      }
    },
    status(frm)
    {
      if(frm.doc.status==="Open" && frm.doc.reference_type==="Asset Maintenance")
      {
         msgprint("Sorry you can't cancel asset maintenance") ;
         frm.doc.status==="In Progress";
      }
    },
  	after_save(frm) 
	{
	    if(frm.doc.reference_type==="Task")
	    {
		     if(frm.doc.status==="Closed")
             {
                   frappe.db.set_value('Task', frm.doc.reference_name, {'status':"Completed",'completed_by':frm.doc.owner,'completed_on':frappe.datetime.nowdate()}); //
             }
             else if(frm.doc.status==="Open" && v==="exist")
            {
                     frappe.db.set_value('Task', frm.doc.reference_name, 'status',"UnAssigned" );
            }
            else// if(frm.doc.status==="In Progress" )
             {
                    frappe.db.set_value('Task', frm.doc.reference_name, 'status',frm.doc.status );
             }
         
        //   if(frm.doc.status==="Open"&&v==="exist")
        //     {
        //              frappe.db.set_value('Task', frm.doc.reference_name, 'status',"UnAssigned" );
        //     }
         
         
	    }
	     if(frm.doc.reference_type==="Issue")
	    {
	        if(frm.doc.status==="Closed")
            {
                
	            frappe.db.set_value('Task', frm.doc.task, {'status':"Completed",'completed_by':frm.doc.owner,'completed_on':frappe.datetime.nowdate()});
	             frappe.db.set_value('Issue', frm.doc.reference_name, 'status',"Resolved"); 
	           
	          //  msgprint("Issue Resolved");
            }
             else if(frm.doc.status==="Open"&&v==="exist")
            {
                     frappe.db.set_value('Task', frm.doc.task, 'status',"UnAssigned" );
                      frappe.db.set_value('Issue', frm.doc.reference_name, 'status',"UnAssigned" );
                      // frm.reload_doc();
            }
            else //if(frm.doc.status==="In Progress" )
            {
                frappe.db.set_value('Task', frm.doc.task, 'status',frm.doc.status );
                frappe.db.set_value('Issue', frm.doc.reference_name, 'status',frm.doc.status );
            }
            
            // if(frm.doc.status==="Open"&&v==="exist")
            // {
            //          frappe.db.set_value('Task', frm.doc.task, 'status',"UnAssigned" );
            //           frappe.db.set_value('Issue', frm.doc.reference_name, 'status',"UnAssigned" );
            // }
           
            
            
	    } 
	        if(frm.doc.reference_type=="Asset Maintenance")
	        {
	           if(frm.doc.status==="Closed")
	           {
	           // console.log(frm.doc.reference_name);
	                frappe.call({
                        "method":"frappe.client.get",
                        "args":{
                            "doctype":"Asset Maintenance Log",
                            "filters":{"asset_name":frm.doc.reference_name,'due_date':frm.doc.date,'assign_to_name':frm.doc.assign_to_full_name},
                        },
                        callback:function(d)
                        {
                        if(d)
                        {
	                        frappe.db.set_value('Asset Maintenance Log',d.message.name,{'maintenance_status':'Completed','completion_date':frappe.datetime.nowdate()});
	                    }
	               
	           }
	       });
	        }
	        }
}
});

// frappe.ui.form.on('ToDo', 
// {
    
//     onload(frm)
//     {
//       if(frm.doc.status==="Open"&&frm.doc.owner!==undefined)
//       {
//           v="exist";
//       }
//     },
//     status(frm)
//     {
//       if(frm.doc.status==="Open" && frm.doc.reference_type==="Asset Maintenance")
//       {
//          msgprint("Sorry you can't cancel asset maintenance") ;
//          frm.doc.status==="In Progress";
//       }
//     },
//   	after_save(frm) 
// 	{
// 	    if(frm.doc.reference_type==="Task")
// 	    {
// 		     if(frm.doc.status==="Closed")
//              {
//                   frappe.db.set_value('Task', frm.doc.reference_name, {'status':"Completed",'completed_by':frm.doc.owner,'completed_on':frappe.datetime.nowdate()}); //
//              }
//              else if(frm.doc.status==="Open" && v==="exist")
//             {
//                      frappe.db.set_value('Task', frm.doc.reference_name, 'status',"UnAssigned" );
//             }
//             else// if(frm.doc.status==="In Progress" )
//              {
//                     frappe.db.set_value('Task', frm.doc.reference_name, 'status',frm.doc.status );
//              }
         
//         //   if(frm.doc.status==="Open"&&v==="exist")
//         //     {
//         //              frappe.db.set_value('Task', frm.doc.reference_name, 'status',"UnAssigned" );
//         //     }
         
         
// 	    }
// 	     if(frm.doc.reference_type==="Issue")
// 	    {
// 	        if(frm.doc.status==="Closed")
//             {
                
// 	            frappe.db.set_value('Task', frm.doc.task, {'status':"Completed",'completed_by':frm.doc.owner,'completed_on':frappe.datetime.nowdate()});
// 	             frappe.db.set_value('Issue', frm.doc.reference_name, 'status',"Resolved"); 
	           
// 	          //  msgprint("Issue Resolved");
//             }
//              else if(frm.doc.status==="Open"&&v==="exist")
//             {
//                      frappe.db.set_value('Task', frm.doc.task, 'status',"UnAssigned" );
//                       frappe.db.set_value('Issue', frm.doc.reference_name, 'status',"UnAssigned" );
//             }
//             else //if(frm.doc.status==="In Progress" )
//             {
//                 frappe.db.set_value('Task', frm.doc.task, 'status',frm.doc.status );
//                 frappe.db.set_value('Issue', frm.doc.reference_name, 'status',frm.doc.status );
//             }
            
//             // if(frm.doc.status==="Open"&&v==="exist")
//             // {
//             //          frappe.db.set_value('Task', frm.doc.task, 'status',"UnAssigned" );
//             //           frappe.db.set_value('Issue', frm.doc.reference_name, 'status',"UnAssigned" );
//             // }
            
            
            
// 	    } 
// 	        if(frm.doc.reference_type=="Asset Maintenance")
// 	        {
// 	           if(frm.doc.status==="Closed")
// 	           {
// 	           // console.log(frm.doc.reference_name);
// 	                frappe.call({
//                         "method":"frappe.client.get",
//                         "args":{
//                             "doctype":"Asset Maintenance Log",
//                             "filters":{"asset_name":frm.doc.reference_name,'due_date':frm.doc.date,'assign_to_name':frm.doc.assign_to_full_name},
//                         },
//                         callback:function(d)
//                         {
//                         if(d)
//                         {
// 	                        frappe.db.set_value('Asset Maintenance Log',d.message.name,{'maintenance_status':'Completed','completion_date':frappe.datetime.nowdate()});
// 	                    }
	               
// 	           }
// 	       });
// 	        }
// 	        }
// }
    
    
    
// // 	after_save(frm) 
// // 	{
// // 	    if(frm.doc.reference_type==="Task")
// // 	    {
// // 		 if(frm.doc.status==="Closed")
// //          {
// //             // console.log(frm.doc.date);
// //             frappe.db.set_value('Task', frm.doc.reference_name, {'status':"Completed",'completed_by':frm.doc.owner,'completed_on':frm.doc.date}); //
// //          }
// //          else
// //          {
// //              frappe.db.set_value('Task', frm.doc.reference_name, 'status',frm.doc.status );
// //          }
// // 	    }
// // 	     if(frm.doc.reference_type==="Issue")
// // 	    {
// // 	        if(frm.doc.status==="Closed")
// //             {
                
// // 	            frappe.db.set_value('Task', frm.doc.task, {'status':"Completed",'completed_by':frm.doc.owner,'completed_on':frm.doc.date});
// // 	             frappe.db.set_value('Issue', frm.doc.reference_name, 'status',"Resolved"); 
	           
// // 	          //  msgprint("Issue Resolved");
// //             }
// //             {
// //                 frappe.db.set_value('Task', frm.doc.task, 'status',frm.doc.status );
// //                 frappe.db.set_value('Issue', frm.doc.reference_name, 'status',frm.doc.status );
// //             }
// // 	    }  
	   
// // 	}
// });
