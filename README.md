lfs_BOM
=======

lfs web site and Bill of Materials

LFS and configurable product with components.
A configurable product can be a bill of materials. The customer can select his components, the web site calculate the BoM price and display components image.

------------ EXAMPLE --------------

On a web site selling configurable PC, a customer can choose first  his motherboard (Chipset Intel, AMD, ...), then his CPU ( 1GHz, 1.5 GHz, ..), his RAM ..., hard disk ....
The choice is made by property in options and in components that can be purchased separatly too.
Choice on fist property limit component choices on other properties, with a javascript action.
Choice on other properties change the sub_images to components images.
Minor modification : The ProductPropertyValue is used to display option or components of properties in the select menu, not to display them in the product configurated. Suppose you suspend selling a component or an option, set up False to his Display ProductPropertyValue. 

------------ ADD in LFS07 ---------

Add a 4st type of property : property with components
In lfs/catalog/settings.py :
PROPERTY_SELECT_COMPONENT = 4
PROPERTY_FIELD_CHOICES = (....
		(PROPERTY_SELECT_COMPONENT, _(u"Select components")),

In modele.py :
from lfs.catalog.settings import PROPERTY_SELECT_COMPONENT
add component in class Property : components = models.ManyToManyField("Product", through="PropertyComponents")
add class PropertyComponents and ProductPropertiesValid

In views.py
modify : product_inline, calculate_price, calculate_property_price 
add : calculate_component_validated, images_components

In lfs.catalog move and correct '_calculate_property_price' from views to models in order to use it in product_inline and in cart_inline.
Specific rules for computation of the price must be modified in '_calculate_property_price'
In lfs.catalog.views, line 225 change '_calculate_property_price' with :

properties = []
 for key, option_id in request.POST.items():	
        	    if key.startswith("property"):
	    		property_id = int(key.split('-')[1])
	    		properties.append((property_id, option_id))    
    		property_price = _calculate_property_price(properties)
		price += property_price
Idem in lfs.cart.models : change computation of price in line 296 in get_product_price_gross in CartItems 
 

In theme ..lfs/catalog/products/
Modify : product_inline.html
add : product_property_validated.html, images_components.html


In javascript lfs.js
Add $("select.cp-property0")... function.
In line 162 delete .select :  $(".cp-property") to calculate price for change on property.obj.is_number_field
 and add a line 171 : $(".sub-images").html(data["images-components"]);	in  $(".cp-property").live("change", function() {

In lfs.catalog.cart.views.py
line 255 delete "-" : if key.startswith("property")  to allow property0 in add_to_cart

In lfs.calalog.cart.models.y
add :from lfs.catalog.models import PropertyOption, PropertyComponents
line 361 in get_properties in class CartItem
add :
elif property.is_select_component:
                try:
                    component = PropertyComponents.objects.get(pk=int(float(cipv.value)))
                except (PropertyComponents.DoesNotExist, ValueError):
                    value = cipv.value
                    price = 0.0
                else:
                    value = component.name_component
                    price = component.get_price


In lfs.cart.added_to_cart_items, and in cart_inline.html and in checkout_cart-inline.html delete or comment line display_property 35 to 39.
