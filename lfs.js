    $("select.cp-property0").live("change", function() {
        $("#product-form").ajaxSubmit({
            url : $("#cp-url").attr("data"),
            success : function(data) {
                var data = $.parseJSON(data);
                $(".standard-price-value").html(data["price"]);
                $(".for-sale-price-value").html(data["for-sale-price"]);
                $(".for-sale-standard-price-value").html(data["for-sale-standard-price"]);
                $(".packing-result").html(data["packing-result"]);
		            $(".cp-validation").html(data["property_component_qualification_validated"]);		
                $.jGrowl(data["message"]);

                // Re-bind lightbox
                $("a.product-image").lightBox({
                    "txtImage" : "Image",
                    "txtOf" : " of "
                });
            }
        });
    });

    $(".cp-property").live("change", function() {
        $("#product-form").ajaxSubmit({
            url : $("#cp-url").attr("data"),
            success : function(data) {
                var data = $.parseJSON(data);
                $(".standard-price-value").html(data["price"]);
                $(".for-sale-price-value").html(data["for-sale-price"]);
                $(".for-sale-standard-price-value").html(data["for-sale-standard-price"]);
                $(".packing-result").html(data["packing-result"]);
		            $(".sub-images").html(data["images-components"]);	
                $.jGrowl(data["message"]);

                // Re-bind lightbox
                $("a.product-image").lightBox({
                    "txtImage" : "Image",
                    "txtOf" : " of "
                });
            }
        });
    });
