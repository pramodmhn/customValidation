# custom Validation 
Required pluggin *jqury,jquery.vlidate, icheck.js

## Update required in customJsValidation.js
1. **Initialise customValidation**
  * customFormValidation("evregform","subscribe2")
  * where  FormId = evregform and  submitbuttonId = subscribe2

2. **Classes**
  * requiredField (field is required)
  * requiredEmail (field required with valid email)
  * requiredConfirmEmail (email must match)
  * requiredPostcode (4 digits)
  * requiredNumber (must be number)
  * requiredMobile (10 digits)
  * requiredCheckboxGroup (check box group validation)
  * dependatnOtherField (dependant field)
