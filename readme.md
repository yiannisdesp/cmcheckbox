# cmcheckbox jQuery Plugin

### Dependencies
 - jQuery 1.9+
 - FontAwesome 

#### Installation
 - Include cmcheckbox.min.js

#### How it works

##### HTML:

    <label class="cmcheckbox white thin">
		<input type="checkbox" checked>
		<span>Alloy Wheels</span>
	</label>

##### JavaScript:

    $(".cmcheckbox").cmcheckbox(); // with default options
    $(".cmcheckbox").cmcheckbox({ // with custom options
	    // options here
    });


#### Options

    {
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
		onCheck: function() {
			// checked jQuery element:
			console.log( $(this) );
		},
		onUncheck: function() {
			// unchecked jQuery element:
			console.log( $(this) );
		}
	}


### License
cmcheckbox plugin is released under the [MIT License](http://en.wikipedia.org/wiki/MIT_License). Feel free to use it in personal and commercial projects.
