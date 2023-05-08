import { Validators } from "@angular/forms";

export class validation {
   public static INPUT_REQUIRED=Validators.required
   public static EMAIL={
      EMAIL_PATTERN: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
      EMAIL_email:Validators.email
   }

   public static NAME={
        NAME_LENGTH:Validators.minLength(3),
        NAME_PATTERN:Validators.pattern(/^[?!\S][a-zA-Z\s]+$/)
   }
   public static PHONE_NO=Validators.pattern(/(^0$)|(^[6-9]\d{1,9}$)/g)
   public static number=Validators.pattern(/^([0|\+[0-9])?([6-9][0-9]{8})$/g)
  //  public static PHONE_NO=Validators.pattern("^(\d)(?!\1+$)\d{9}")
  //  public static PHONE_NO=Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)

  //  public static PHONE_NO=Validators.maxLength(10)

}
