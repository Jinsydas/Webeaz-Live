frappe.ui.form.on('Item',
{

item_code:function(frm)
{
    var t=frm.doc.item_code
    console.log(t)
    frm.set_value("item_name",t)
    
}
});
