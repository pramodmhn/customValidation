/************

******required javasript ********

*jqury,jquery.vlidate, icheck.js
<script src="https://code.jquery.com/jquery-1.12.2.min.js"   integrity="sha256-lZFHibXzMHo3GGeehn1hudTAP3Sc0uKXBXAzHX1sjtk="   crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/additional-methods.min.js"></script>
<script type="text/javascript" src="https://www.swiftdigital.com.au/js/icheck.js"></script> 
<script src="js/customJsValidator.js"></script>
 <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
	
********************/
//jquery code
$(document).ready(function () {
	
	/**prevent default form submission**/
	$("form").submit(function(event){  
			event.preventDefault();
		});	
	
	//ichchek
	$("input").iCheck({
		 checkboxClass: 'icheckbox_square-red',	
		radioClass: 'iradio_square-red',
		increaseArea: '20%' // optional
	});
	
	
		/***************************
		* remove icheck error message
		******************************/
		/*
		 $('.classname').on('ifChecked',function(){
			if($('.checkbox1:checked').length > 0)
				$(".checkerror_div").hide();
			});
			$('.classname').on('ifUnchecked',function(){
			if($('.checkbox1:checked').length == 0)
				$(".checkerror_div").show();
			});
  		*/
		
		  /**************************
		  * add "user_input_div" class in the parent element of form input element
		  **************************/
        //Append the error_div element to parent element
        $(".user_input_div").append("<div class='error_div'></div>");
		 $(".user_input_div_checkbox").after("<div class='checkerror_div'></div>");
		 $(".user_input_div.radioGroupLabel").after("<div class='radiorror_div'></div>");
       customFormValidation("evregform","subscribe2")
});

function customFormValidation(formId,btnId){
	/*** new validation **/
	 theValidator = $('#'+formId);      
	$("#"+btnId).click(function(event){  		         
		theValidator.validate();	
		theValidator.valid();		
	});
	   //addding method  validEmail
		$.validator.addMethod("validEmail", function(value, element) {
			if(value == '') 
				return true;
			var temp1;
			temp1 = true;
			var ind = value.indexOf('@');
			var str2=value.substr(ind+1);
			var str3=str2.substr(0,str2.indexOf('.'));
			if(str3.lastIndexOf('-')==(str3.length-1)||(str3.indexOf('-')!=str3.lastIndexOf('-')))
				return false;
			var str1=value.substr(0,ind);
			if((str1.lastIndexOf('_')==(str1.length-1))||(str1.lastIndexOf('.')==(str1.length-1))||(str1.lastIndexOf('-')==(str1.length-1)))
				return false;
			str = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
			
			//'
			temp1 = str.test(value);
			return temp1;
		}, "Please enter valid email.");
		
		/***********************
		*for domain more than 32 characters	
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		***********************	**/
		
		//add method for alphanumeric
		$.validator.addMethod("theAlphaNumeric", function(value, element, regexpr) {          
			return this.optional(element) || /^[a-z0-9\-_ \s]+$/i.test(value);
		}, "Letters, numbers, spaces, dashes and underscores only please.");
		
		/***********
		*prevent copy paste
		*add "prevent-copy-paste" class in input text box element
		********************/
		$("input[type=text]").click(function(){
			var isPreventCopyPasteClass = $(this).hasClass("prevent-copy-paste");
			if( isPreventCopyPasteClass ){
				$(this).bind("cut copy paste",function(e) {
				  e.preventDefault();
				});		
			}
		});
			
		/******************
		*add class rule  
		*do not forget form element class name otherwise add this class in form element might not work
		******************/        
		$.validator.addClassRules({
			requiredField: {
				required: true
				//theAlphaNumeric: true
			},
			requiredEmail: {
				required: true,
				validEmail: true
			},
			requiredConfirmEmail: {
				required: true,
				validEmail: true,
				equalTo : function(param,element){return "#"+ $(".requiredEmail").prop("id");}
			},
			
			requiredPostcode: {
				required: true,
				digits: true,
				minlength: 4,
				maxlength: 4
			},
			requiredNumber: {					
			   digits :true
			},
			requiredMobile:{
				digits : true,
				minlength: 10,
				maxlength:10
			},				
			requiredCheckboxGroup:{				
				  require_from_group:  function(element) {
					  var newGroupClass = $(element).attr("v-groupname");
					  $(element).addClass(newGroupClass);						  
					  return [1, "."+newGroupClass]
				  }
			},
			dependatnOtherField:{
				required : {
					depends : function(element){							
							return true;//put condition
							//$("#company option:selected").hasClass("insurance_role"); or
							//$('#checkboxID').is(':checked') or $('#radioID').is(':checked')
					}
				}
			}
		});
		/******************
		*add attribute v-data to display custom error message
		.v-groupname for multiple checkbox option
		*example: <input tpye="text" v-data="Firstname">
		*********************/	
		//$.validator.messages.required
		$.validator.messages = {
			required : function(param,element){           
			   var isVdata =  $(element).attr("v-data");         
			   return isVdata ? "Please enter your "+ isVdata : "This field is required";   
			},
			validEmail : function(){
				return "Invalid email"
			},
			equalTo : function(){
				return "Email addresses do not match"	
			},
			digits:  function(param,element){
				return "Only number allowed"
			},
			minlength : function(param,element){
				return "Minimum " + param + " digits"
			},
			maxlength : function(param,element){
				return "Maximum " + param + " digits"
			},
			require_from_group : function(param,element){
				return "You must select at least one" 
			}				
		};
		
					
		$.validator.setDefaults({
			  errorPlacement : function (error, element) {
				error.appendTo(element.next()); 										
				error.appendTo(element.closest("fieldset").find(".checkerror_div"));	
				//to display only one error messgae for checkbox group
				element.closest("fieldset").find(".checkerror_div").html(error);	
				element.closest("fieldset").find(".radiorror_div").html(error);
				
			 },
			  highlight: function (element, errorClass) {
				 $(element).addClass("input-error");
			 }, 
			 unhighlight: function (element, errorClass) {
				$(element).removeClass("input-error");
			 }
		});
		
		theValidator.validate({
			 submitHandler: function(){					  
				 alert("submitted");
				 }
			});
		
		//for icheck on checked remove error message
		 $(".requiredCheckboxGroup").on({
			 ifChecked : function(){
				 var currCheckGrp = $(this).attr("v-groupname");					 
				if($('.'+currCheckGrp+':checked').length > 0){				
					$(".user_input_div_checkbox").each(function(i,e){
						if($(this).attr("v-groupname") == currCheckGrp){
							$(this).next().hide();
						} 
					});	
				}
			 },
			 ifUnchecked : function(){
				 var currCheckGrp = $(this).attr("v-groupname");					 
				if($('.'+currCheckGrp+':checked').length == 0){				
					$(".user_input_div_checkbox").each(function(i,e){
						if($(this).attr("v-groupname") == currCheckGrp){
							$(this).next().show();
						} 
					});	
				}
			 }
			 
		});
		$(".radioGroup").on('ifChecked',function(){
			$(this).closest("fieldset").find(".radiorror_div").hide();
		});
	
}