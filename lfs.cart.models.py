from lfs.catalog.models import PropertyOption, PropertyComponents, _calculate_property_price

class CartItem(models.Model):

 def get_product_price_gross(self, request):
        """
        Returns the product item price. Based on selected properties, etc.
        """
        if not self.product.is_configurable_product():
            price = self.product.get_price_gross(request)
        else:
            if self.product.active_price_calculation:
                try:
                    price = self.get_calculated_price(request)
                except:
                    price = self.product.get_price_gross(request)
            else:
                price = self.product.get_price_gross(request, with_properties=False)
		properties = []
		
		for property_value in CartItemPropertyValue.objects.filter(cart_item=self):	     	    
	            properties.append((property_value.property_id, property_value.value))    
    		property_price = _calculate_property_price(properties)
		if not self.product.price_includes_tax(request):
                                    property_price = property_price * ((100 + self.product.get_tax_rate(request)) / 100)
		price += property_price
	
  return price
