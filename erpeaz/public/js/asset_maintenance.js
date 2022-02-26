frappe.ui.form.on('Asset Maintenance',
{
    after_save(frm)
    {
        console.log(frm);
        frappe.call
        ({
                "method":"frappe.client.get_list",
                "args":{
                        "doctype":"ToDo",
                        "filters":{"reference_type":"Asset Maintenance","reference_name":frm.docname},
                        },
                        callback:function(d)
                        {
                        if(d)
                        {
                            for(var i=0;i<d.message.length;i++)
                            {
                                console.log(d.message[i].name);
                                frappe.db.set_value('ToDo',d.message[i].name,
                                {
                                    'subject': frm.doc.asset_maintenance_tasks[i].maintenance_task,
                                });
                                
                            }
                        }
                        }
                });
    }
});
