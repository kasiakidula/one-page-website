$(document).ready(function() { 
    $("form[name='contact']").submit(function(e) {
        e.preventDefault();
    }).validate({
        highlight: function(element, errorClass) {
            $(element).addClass(errorClass);
            $(element.form).find(
                    "label[for=" + element.id + "]").remove(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },
        rules: {
            firstname: {
                required: true,
                minlength: 2,
                maxlength: 20,
                withoutNumbers: true
            },
            lastname: {
                required: true,
                minlength: 2,
                maxlength: 40,
                withoutNumbers: true
            },
            purpose: {
                maxlength: 100
            },
            diseases: {
                maxlength: 150
            },
            email: {
                required: true,
                email: true
            },
            allergic: {
                required: true,
                minlength: 2,
                maxlength: 150
            },
            addInfo: {
                maxlength: 600
            } 
        },
        messages: {
            firstname: {
                required: "Please enter your first name",
                minlength: $.validator.format("At least {0} characters required"),
                maxlength: $.validator.format("Only {0} characters allowed")
            },
            lastname: {
                required: "Please enter your last name",
                minlength: $.validator.format("At least {0} characters required"),
                maxlength: $.validator.format("Only {0} characters allowed")
            },
            purpose: {
                maxlength: $.validator.format("Only {0} characters allowed")
            },
            diseases: {
                maxlength: $.validator.format("Only {0} characters allowed")
            },
            email: {
                required: "Please enter your email",
                email: "Your email address must be in the format of name@domain.com"
            },
            allergic: {
                required: "Please enter if you have allergies",
                minlength: $.validator.format("At least {0} characters required"),
                maxlength: $.validator.format("Only {0} characters allowed")
            },
            addInfo: {
                maxlength: $.validator.format("Only {0} characters allowed")
            } 
        },
        submitHandler: function(form) {
            $(form)[0].reset();
            let message = "Your message has been sent!";
            $("#response").html(message);
            $("#response").addClass("success");
            $("#response").show();
            $("#response").delay(10000).fadeOut(300);

        },
        invalidHandler: function(event, validator) {
            let errors = validator.numberOfInvalids();
            if (errors) {
                let message = errors === 1
                    ? 'You missed 1 field.'
                    : 'You missed ' + errors + ' fields!';
                $("#response").html(message);
                $("#response").addClass('failure');
                $("#response").show();
                $("#response").delay(10000).fadeOut(300);
            }
      }
    });

    $.validator.addMethod(
            "withoutNumbers",
            function(value, element) {
                return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
            }, "Please check your answer"
    );
});