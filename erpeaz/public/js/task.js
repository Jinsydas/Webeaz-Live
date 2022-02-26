var f;
var s;
frappe.ui.form.on('Task',
{
    onload(frm)
    { 
        //msgprint("aaaaa"+frm.doc.status+frm.doc.assigned_to+frm.doc.issue);
    
        if(frm.doc.status==="UnAssigned" && frm.doc.assigned_to !==undefined && frm.doc.issue !==undefined)
        {
            
            //msgprint("aaaaabbbb");
            f="issuereassign";
            s=frm.doc.assigned_to;
            
            // console.log("f"+f);
            // console.log("s"+s);
        }
    },
    status(frm)
    {
        if(frm.doc.status==="Completed" && frm.doc.assigned_to !==undefined)
        {
            frm.set_value("completed_by",frm.doc.assign_to );
        }
    },
	after_save(frm) 
	{
	   
	   if(frm.doc.from_issue !=="yes")
	   {
	         if(frm.doc.status==="Open"&&frm.doc.assigned_to !==undefined)  
	         {
	            frappe.call({
                "method":"frappe.client.get",
                "args":{
                        "doctype":"ToDo",
                        "filters":{"subject":frm.doc.subject,"project":frm.doc.project},
                        },
                        callback:function(d)
                        {
                        if(d){
                            console.log(d)
                            var t=d.message.name
                            frappe.db.delete_doc('ToDo',t)

                        }
                        }
                });
	            frm.doc.from_issue=undefined;
    	        if(frm.doc.issue !==null)
    	        {
	                    frappe.db.insert
                        ({
                         doctype:'ToDo',
                         status:frm.doc.status,
                         priority:frm.doc.priority,
                         project:frm.doc.project,
                         date:frm.doc.due_date,
                         owner:frm.doc.assigned_to,
                         subject:frm.doc.subject,
                         description:frm.doc.description,
                         issue:frm.doc.issue,
                         reference_type:"Task",
                         reference_name:frm.doc.name,
                         assigned_by:name,
                    
                        })
                        .then(function(doc)
                        { 
                          msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
                        }); 
	            }
   	             else if(frm.doc.issue ===null)
    	         {
	                frappe.db.insert
                        ({
                            doctype:'ToDo',
                            status:frm.doc.status,
                            priority:frm.doc.priority,
                            project:frm.doc.project,
                            date:frm.doc.due_date,
                            owner:frm.doc.assigned_to,
                            subject:frm.doc.subject,
                            description:frm.doc.description,
                            reference_type:"Task",
                            reference_name:frm.doc.name,
                            assigned_by:name,
                    
                         })
                        .then(function(doc)
                        { 
                            msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
                        }); 
	             }
             }
 	    }
 	    console.log(f);
 	    
 	    if(f==="issuereassign"&& frm.doc.assign_to !==s)
 	    {
 	          if(frm.doc.status==="Open"&&frm.doc.assigned_to !==undefined)  
	         {
	            //msgprint("from task");
	           // frm.doc.from_issue=undefined;
    	       // if(frm.doc.issue !==null)
    	       // {
    	                frappe.call
    	                ({
                         "method":"frappe.client.get",
                         "args":{
                        "doctype":"ToDo",
                        "filters":{"subject":frm.doc.subject,"project":frm.doc.project},
                        },
                        callback:function(d)
                        {
                        if(d)
                        {
                            console.log(d);
                            var t=d.message.name;
                            frappe.db.delete_doc('ToDo',t);

                        }
                        }
                });
	                   frappe.db.insert
                        ({
                         doctype:'ToDo',
                         status:frm.doc.status,
                         priority:frm.doc.priority,
                         project:frm.doc.project,
                         date:frm.doc.due_date,
                         owner:frm.doc.assigned_to,
                         subject:frm.doc.subject,
                         description:frm.doc.description,
                         issue:frm.doc.issue,
                         reference_type:"Task",
                         reference_name:frm.doc.name,
                         assigned_by:name,
                    
                        })
                        .then(function(doc)
                        { 
                          msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
                        }); 
	            //}
   	        //      else if(frm.doc.issue ===null)
    	       //  {
	           //     frappe.db.insert
            //             ({
            //                 doctype:'ToDo',
            //                 status:frm.doc.status,
            //                 priority:frm.doc.priority,
            //                 project:frm.doc.project,
            //                 date:frm.doc.due_date,
            //                 owner:frm.doc.assigned_to,
            //                 subject:frm.doc.subject,
            //                 description:frm.doc.description,
            //                 reference_type:"Task",
            //                 reference_name:frm.doc.name,
            //                 assigned_by:name,
                    
            //              })
            //             .then(function(doc)
            //             { 
            //                 msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
            //             }); 
	           //  }
	             
	             
	             frappe.db.set_value('Issue',frm.doc.issue,{'status':"Open","assign_to":frm.doc.assigned_to} );
             }
 	    }
 
}
    
});

// frappe.ui.form.on('Task',
// {
//     status(frm)
//     {
//         if(frm.doc.status==="Completed" && frm.doc.assign_to !==undefined)
//         {
//             frm.set_value("completed_by",frm.doc.assign_to );
//         }
//     },

// 	after_save(frm) 
// 	{
// 	     if(frm.doc.from_issue !=="yes")
// 	   {
// 	         if(frm.doc.status==="Open"&&frm.doc.assigned_to !==undefined)  
// 	         {
// 	            //msgprint("from task");
// 	            frm.doc.from_issue=undefined;
//     	        if(frm.doc.issue !==null)
//     	        {
// 	                    frappe.db.insert
//                         ({
//                          doctype:'ToDo',
//                          status:frm.doc.status,
//                          priority:frm.doc.priority,
//                          project:frm.doc.project,
//                          date:frm.doc.due_date,
//                          owner:frm.doc.assigned_to,
//                          subject:frm.doc.subject,
//                          description:frm.doc.description,
//                          issue:frm.doc.issue,
//                          reference_type:"Task",
//                          reference_name:frm.doc.name,
//                          assigned_by:name,
                    
//                         })
//                         .then(function(doc)
//                         { 
//                           msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
//                         }); 
// 	            }
//   	             else if(frm.doc.issue ===null)
//     	         {
// 	                frappe.db.insert
//                         ({
//                             doctype:'ToDo',
//                             status:frm.doc.status,
//                             priority:frm.doc.priority,
//                             project:frm.doc.project,
//                             date:frm.doc.due_date,
//                             owner:frm.doc.assigned_to,
//                             subject:frm.doc.subject,
//                             description:frm.doc.description,
//                             reference_type:"Task",
//                             reference_name:frm.doc.name,
//                             assigned_by:name,
                    
//                          })
//                         .then(function(doc)
//                         { 
//                             msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
//                         }); 
// 	             }
//              }
//  	    }
 	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
// 	   // var name=frappe.user;
// 	   //var name=frappe.session.user;
// 	   ////msgprint("user"+name);
// 	   //console.log("Assigned to"+frm.doc.assigned_to);
	   
// 	   //if(frm.doc.from_issue !=="yes")
// 	   //{
// 	   //    //msgprint("from task");
	      
// 	   //      if(frm.doc.status==="Assigned.")  
// 	   //      {
// 	   //         msgprint("from task");
// 	   //         frm.doc.from_issue=undefined;
//     // 	        if(frm.doc.issue !==null)
//     // 	        {
// 	   //                 frappe.db.insert
//     //                     ({
//     //                      doctype:'ToDo',
//     //                      status:frm.doc.status,
//     //                      priority:frm.doc.priority,
//     //                      project:frm.doc.project,
//     //                      date:frm.doc.due_date,
//     //                      owner:frm.doc.assigned_to,
//     //                      subject:frm.doc.subject,
//     //                      description:frm.doc.description,
//     //                      issue:frm.doc.issue,
//     //                      reference_type:"Task",
//     //                      reference_name:frm.doc.name,
//     //                      assigned_by:name,
                    
//     //                     })
//     //                     .then(function(doc)
//     //                     { 
//     //                       msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
//     //                     }); 
// 	   //         }
//   	//              else if(frm.doc.issue ===null)
//     // 	         {
// 	   //             frappe.db.insert
//     //                     ({
//     //                         doctype:'ToDo',
//     //                         status:frm.doc.status,
//     //                         priority:frm.doc.priority,
//     //                         project:frm.doc.project,
//     //                         date:frm.doc.due_date,
//     //                         owner:frm.doc.assigned_to,
//     //                         subject:frm.doc.subject,
//     //                         description:frm.doc.description,
//     //                         reference_type:"Task",
//     //                         reference_name:frm.doc.name,
//     //                         assigned_by:name,
                    
//     //                      })
//     //                     .then(function(doc)
//     //                     { 
//     //                         msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
//     //                     }); 
// 	   //          }
//     //          }
//  	  //  }
//  	  //  else
//  	  //  {
//  	  //           msgprint("from issue");
//  	  //  }
	   
// 	}
// });
