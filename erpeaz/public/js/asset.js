frappe.ui.form.on('Asset', 
{
    on_submit(frm)
	{
	    if (frm.doc.asset_category==="Vehicles")
	    {
	     // msgprint("Created vehicle doc of ");
	      frappe.db.insert
          ({
            doctype:'Vehicle',
            asset_:frm.doc.name,
            license_plate:frm.doc.license_plate,
            make:frm.doc.made_by,
            model:frm.doc.model,
            last_odometer:frm.doc.odometer_value,
            fuel_type:frm.doc.fuel_type,
            uom:frm.doc.fuel_uom
          })
          .then(function(doc)
          { 
              msgprint(`${doc.doctype} ${doc.name} created`);
          }); 
	    }
	}
});
