var v="new";
var A;
frappe.ui.form.on('Issue',
{
    onload(frm) 
	{
	   // frappe.db.delete("ToDo",{"subject":"issue32"});
	    
	    if(frm.doc.status==="UnAssigned" && frm.doc.assign_to !==undefined)
	    {
	        v="exist";
	        A=frm.doc.assign_to;
	    }
	    
	    
		if(frappe.user.name !==undefined)
        {
            frm.set_value("raised_by",frappe.user.name);
            
        }
	},
	assign_to(frm)
    {
       if(frm.doc.assign_to===undefined) 
       {
           frm.doc.assignee="UnAssigned";
       }
       else
       {
             frm.doc.assignee="Assigned";   
       }
    },
	after_save(frm) 
	{
	    var x;
	    var y;
	   // console.log(frm.doc.description);
	   // console.log(frm.doc.issue);
	  if(frm.doc.status==="Open"&& frm.doc.assign_to!==undefined)  
	  {
	            frappe.call({
                "method":"frappe.client.get",
                "args":{
                        "doctype":"ToDo",
                        "filters":{"subject":frm.doc.subject,"project":frm.doc.pro},
                        },
                        callback:function(d)
                        {
                        if(d){
                            console.log(d);
                            var t=d.message.name;
                            frappe.db.delete_doc('ToDo',t);

                        }
                        }
                });
	             if(v !=="exist")
	             {
	                   frappe.db.insert
                       ({
                         doctype:'Task',
                         status:frm.doc.status,
                         priority:frm.doc.priority,
                         project:frm.doc.pro,
                         due_date:frm.doc.due_date,
                         assigned_to:frm.doc.assign_to,
                         subject:frm.doc.subject,
                         description:frm.doc.description,
                         issue:frm.doc.name,
                         from_issue:"yes",
                         assignee:"Assigned",
                        })
                        .then(function(doc)
                        { 
                             x=doc.name;
                     
                            console.log("x",x);
                            console.log("y",y);
                            // frappe.db.set_value("ToDo",y,"task",x);
                             msgprint(`Task ${doc.subject} is Created`);
                    
                        }); 
	             }
	             else
	             {
	                 frappe.call
	                 ({
                        "method":"frappe.client.get",
                        "args":
                            {
                                 "doctype":"Task",
                                 "filters":{"subject":frm.doc.subject,
                                            "project":frm.doc.pro,
                                           },
                                           
                            },
                             callback:function(d)
                             {
                                if(d)
                                    {
                                      x=d.message.name;
                                      frappe.db.set_value('Task',x,{'status':"Open","assigned_to":frm.doc.assign_to} );
                                    }
                              }
	                     
	                 });
	                 console.log(A);
	               //  if(frm.doc.assign_to !==A)
	               //  {
	               //         frappe.db.delete("ToDo",
	               //          {
                //                 "subject":frm.doc.subject,
                //                 "project":frm.doc.pro,
                //                 "owner":A,
                //              });
	               //  }
	              
	             }
	            
            //       console.log(x);
                  frappe.db.insert
                  ({
                    doctype:'ToDo',
                     subject:frm.doc.subject,
                     status:frm.doc.status,
                     priority:frm.doc.priority,
                    project:frm.doc.pro,
                    date:frm.doc.due_date,
                    owner:frm.doc.assign_to,
                    description:frm.doc.description,
                    //issue:frm.doc.name,
                    reference_type:"Issue",
                    reference_name:frm.doc.name,
                    assigned_by:frappe.session.user,
                    task:x,
                   
                  })
                  .then(function(doc)
                  { 
                      y=doc.name;
                      frappe.db.set_value("ToDo",y,"task",x);
                    msgprint(`Assigned Issue To ${doc.owner}`);
                  }); 

	
	}
}
});


// frappe.ui.form.on('Issue',
// {
// 	onload(frm) 
// 	{
	    
// 		if(frappe.user.name !==undefined)
//         {
//             frm.set_value("raised_by",frappe.user.name);
//         }
// 	},
// 		assign_to(frm)
//     {
//       if(frm.doc.assign_to===undefined) 
//       {
//           frm.doc.assignee="UnAssigned";
//       }
//       else
//       {
//              frm.doc.assignee="Assigned";   
//       }
//     },
// 	after_save(frm) 
// 	{
// 	    var name=frappe.session.user;
// 	    var x;
// 	    var y;
// 	   // console.log(frm.doc.description);
// 	   // console.log(frm.doc.issue);
// 	  if(frm.doc.status==="Open"&& frm.doc.assign_to!==undefined)  
// 	  {
// 	   // if(frm.doc.issue !==null)
// 	   // {
// 	              frappe.db.insert
//                   ({
//                     doctype:'Task',
//                     status:frm.doc.status,
//                     priority:frm.doc.priority,
//                     project:frm.doc.pro,
//                     due_date:frm.doc.due_date,
//                     assigned_to:frm.doc.assign_to,
//                     subject:frm.doc.subject,
//                     description:frm.doc.description,
//                     issue:frm.doc.name,
//                      from_issue:"yes",
//                      assignee:"Assigned",
//                   })
//                   .then(function(doc)
//                   { 
//                       x=doc.name;
                     
//                      console.log("x",x);
//                      console.log("y",y);
//                     // frappe.db.set_value("ToDo",y,"task",x);
//                      msgprint(`Task ${doc.subject} is Created`);
                    
//                   }); 
//             //       console.log(x);
//                   frappe.db.insert
//                   ({
//                     doctype:'ToDo',
//                      subject:frm.doc.subject,
//                      status:frm.doc.status,
//                      priority:frm.doc.priority,
//                     project:frm.doc.pro,
//                     date:frm.doc.due_date,
//                     owner:frm.doc.assign_to,
//                     description:frm.doc.description,
//                     //issue:frm.doc.name,
//                     reference_type:"Issue",
//                     reference_name:frm.doc.name,
//                     assigned_by:frappe.session.user,
//                     task:x,
                   
//                   })
//                   .then(function(doc)
//                   { 
//                       y=doc.name;
//                       frappe.db.set_value("ToDo",y,"task",x);
//                     msgprint(`Assigned Issue To ${doc.owner}`);
//                   }); 

// 	  }
// 	}
	
	
	
// // 	after_save(frm) 
// // 	{
// // 	    var name=frappe.session.user;
// // 	    var x;
// // 	    var y;
// // 	   // console.log(frm.doc.description);
// // 	   // console.log(frm.doc.issue);
// // 	  if(frm.doc.status==="Assigned.")  
// // 	  {
// // 	   // if(frm.doc.issue !==null)
// // 	   // {
// // 	              frappe.db.insert
// //                   ({
// //                     doctype:'Task',
// //                     status:frm.doc.status,
// //                     priority:frm.doc.priority,
// //                     project:frm.doc.pro,
// //                     due_date:frm.doc.due_date,
// //                     assigned_to:frm.doc.assign_to,
// //                     subject:frm.doc.subject,
// //                     description:frm.doc.description,
// //                     issue:frm.doc.name,
// //                      from_issue:"yes",
// //                   })
// //                   .then(function(doc)
// //                   { 
// //                       x=doc.name;
                     
// //                      console.log("x",x);
// //                      console.log("y",y);
// //                     // frappe.db.set_value("ToDo",y,"task",x);
// //                      msgprint(`Task ${doc.subject} is Created`);
                    
// //                   }); 
// //             //       console.log(x);
// //                   frappe.db.insert
// //                   ({
// //                     doctype:'ToDo',
// //                      subject:frm.doc.subject,
// //                      status:frm.doc.status,
// //                      priority:frm.doc.priority,
// //                     project:frm.doc.pro,
// //                     date:frm.doc.due_date,
// //                     owner:frm.doc.assign_to,
// //                     description:frm.doc.description,
// //                     //issue:frm.doc.name,
// //                     reference_type:"Issue",
// //                     reference_name:frm.doc.name,
// //                     assigned_by:frappe.session.user,
// //                     task:x,
                   
// //                   })
// //                   .then(function(doc)
// //                   { 
// //                       y=doc.name;
// //                       frappe.db.set_value("ToDo",y,"task",x);
// //                     msgprint(`Assigned Issue To ${doc.owner}`);
// //                   }); 
                  
                  
// //                   // frappe.db.set_value('Issue', frm.doc.issue, 'status',frm.doc.status);
                
                
                
                
                  
// // 	   // }
// // 	   //  else if(frm.doc.issue ===null)
// // 	   // {
// // 	   //           frappe.db.insert
// //     //               ({
// //     //                 doctype:'To',
// //     //                  status:frm.doc.status,
// //     //                  priority:frm.doc.priority,
// //     //                 project:frm.doc.project,
// //     //                 date:frm.doc.due_date,
// //     //                 owner:frm.doc.assign_to,
// //     //                 subject:frm.doc.subject,
// //     //                 description:frm.doc.description,
// //     //                 reference_type:"Task",
// //     //                 reference_name:frm.doc.name,
// //     //                 assigned_by:"Sana",
                    
// //     //               })
// //     //               .then(function(doc)
// //     //               { 
// //     //                 msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
// //     //               }); 
// // 	   // }
// // 	  }
// // 	}
// });
