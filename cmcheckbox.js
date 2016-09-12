/**
 * cmcheckbox jQuery Plugin v0.0.1
 * Replaces native input boxes with customized HTML
 * Simply attach cmcheckbox() to any element.
 * Yiannis Despotis, Convertico Media
 */
(function ( $ ) {

	$.fn.cmcheckbox = function( options ) {

		// Initialize default options
        var settings = $.extend({
            // checked state
        	checkedColor: "#fff",
            checkedBackgroundColor: "transparent",
            checkedBorderWidth: "2px",
            checkedBorderColor : "#556b2f",
            checkedFaClass : "fa-check",
            checkedFaSize : "23px",
            // unchecked state
        	uncheckedColor: "#fff",
            uncheckedBackgroundColor: "#fff",
            uncheckedBorderWidth: "2px",
            uncheckedBorderColor : "#556b2f",
            uncheckedFaClass : "",
            uncheckedFaSize : "25px",
            // general
			width : "25px",
			height : "25px",
            // callbacks
            onCheck : function() {},
            onUncheck : function() {},
        }, options );

        // generate custom css on hover
        var headStyleClasses = [];
        var headCss = "";
        function generateHeadCss(className, css){
        	headStyleClasses.push({className,css});
        	$.each(headStyleClasses, function(index, val){
        		headCss += val.className+"{" + val.css + "}";
        	});
        	$("head").find("style[data-cmcheckbox='true']").remove();
        	$("head").append("<style data-cmcheckbox='true'>"+headCss+"</style>");
        }
        
        // generate checkbox style
        function getCheckboxStyle(state){
        	var style = 'display:block;float:left;margin:0;margin-right:5px;position:relative;';
        	if(state == 'checked') {
        		style += 'width:'+settings.width+';';
	        	style += 'height:'+settings.height+';';
	        	style += 'border:'+settings.checkedBorderWidth+' solid '+settings.checkedBorderColor+';';
	        	style += 'background-color:'+settings.checkedBackgroundColor+';';
        	}else{
        		style += 'width:'+settings.width+';';
	        	style += 'height:'+settings.height+';';
	        	style += 'border:'+settings.uncheckedBorderWidth+' solid '+settings.uncheckedBorderColor+';';
	        	style += 'background-color:'+settings.uncheckedBackgroundColor+';';
        	}
        	return style;
        }

        // generate font awesome style
        function getSymbolStyle(state){
        	var style = 'position:absolute;top:0;left:0;right:0;bottom:0;text-align:center;margin:auto;';
        	if(state == 'checked') {
        		style += 'color:'+settings.checkedColor+';';
	        	style += 'font-size:'+settings.checkedFaSize+';';
        	}else{
        		style += 'color:'+settings.checkedColor+';';
	        	style += 'font-size:'+settings.checkedFaSize+';';
        	}
        	return style;
        }

        // style custom checkbox based on state
        function styleCheckbox(state, $checkboxContainer){
        	$checkboxContainer.children("span.cm-generated-checkbox").remove();
        	if(state == 'checked'){
        		style = getCheckboxStyle('checked');
	        	$checkboxContainer.prepend('<span class="cm-generated-checkbox checked" style="'+style+'"><i style="'+getSymbolStyle('checked')+'" class="fa '+settings.checkedFaClass+'"><i></span>');
        	}else{
        		style = getCheckboxStyle('unchecked');
	        	$checkboxContainer.prepend('<span class="cm-generated-checkbox unchecked" style="'+style+'"><i style="'+getSymbolStyle('unchecked')+'" class="fa '+settings.uncheckedFaClass+'"><i></span>');
        	}
        }

        // custom checkbox click event
        function attachEvent(elementIdentifier){
        	$('body').on("click", elementIdentifier + " span", function(e){
                // console.log(elementIdentifier);
                var $customCheckbox = $(this).closest(elementIdentifier);
        		var $checkbox = $customCheckbox.children("input[type='checkbox']");
	        	if($checkbox[0].checked){
                    // style custom checkbox and uncheck native
	        		$checkbox.prop('checked', true);
	        		styleCheckbox('unchecked', $customCheckbox);
                    // on uncheck callback
                    settings.onUncheck.call( $customCheckbox );
	        	}else{
                    // style custom checkbox and check native
	        		$checkbox.prop('checked', false);
	        		styleCheckbox('checked', $customCheckbox);
                    // on check callback
                    settings.onCheck.call( $customCheckbox );
	        	}
	        });
        }

        var $checkboxContainer; // checkbox jQuery container
        var $checkbox; // actual checkbox
        var style; // css style
        var bindingElements = [];
        // transform native checkboxes
        this.each(function() {
	        // Convert native checkbox to all attached classes or ids
	        $checkboxContainer = $(this);
	        $checkbox = $checkboxContainer.children("input[type='checkbox']");
	        $checkbox.css({"display" : "none"});
	        // build checkbox style based on settings
	        if($checkbox.is(":checked")){
	        	styleCheckbox('checked', $checkboxContainer);
	        }else{
	        	styleCheckbox('unchecked', $checkboxContainer);
	        }
        	// identify class or ID
        	var IDAttribute = $(this).attr('id');
        	var className = ($(this).attr("class")).replace(new RegExp(" ", 'g'), ".");
			// For some browsers, 'attr' is undefined; for others, 'attr' is false.  Check for both.
			if (typeof IDAttribute !== typeof undefined && IDAttribute !== false) {
			    // take ID
                bindingElements.push("#" + IDAttribute) // attach event by id
			}else{
				// take class
                bindingElements.push("." + className) // attach event by class
                console.log("." + className);
			}
	    });

        if(bindingElements.length > 0){
            var uniqueBindingElements = []; // filter out unique elements
            $.each(bindingElements, function(i, value){
                if($.inArray(value, uniqueBindingElements) === -1) uniqueBindingElements.push(value);
            });
            $.each(uniqueBindingElements, function(index, element){
                attachEvent(element);
                // append css general styles
                generateHeadCss(element+":hover", "cursor:pointer;");
            });    
        }

	};

}( jQuery ));