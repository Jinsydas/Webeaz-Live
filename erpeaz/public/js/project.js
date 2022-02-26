frappe.ui.form.on('Project', 
{
    onload(frm)
    {
        if(frm.doc.customer !==undefined)
        {
            frm.set_value("customers",frm.doc.customer);
        }
        if(frm.doc.sales_order !==undefined)
        {
            frm.set_value("proforma_invoice",frm.doc.sales_order);
        }
    
        if(frm.doc.sales_order===frm.doc.project_name)
         {
            frm.set_value("project_name","");
         }
   
    },
    customers(frm)
    {
        frm.set_value("customer",frm.doc.customers);   
    },
    proforma_invoice(frm)
    {
        frm.set_value("sales_order",frm.doc.proforma_invoice); 
    }
    
    
    

});
