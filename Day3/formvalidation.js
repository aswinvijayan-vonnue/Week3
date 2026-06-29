// function validationForm(event){
//     event.preventDefault();
//     const form=document.querySelector('form');
//     console.log(form);
//     const name=form.querySelector('#name');
//     console.log(name.value);
// }
class FormValidator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;
  }
  validate(field) {
    if (!this.rules[field.name]) return;
    console.log(field.value); //logs input value
    const fieldRules = this.rules[field.name];
    const span = field.nextElementSibling;
    console.log(span);
    console.log(fieldRules);
    let flag = 0;
    for (let rule in fieldRules) {
      console.log(rule);
      switch (rule) {
        case "required":
          if (field.value.trim() == "") {
            span.textContent = " This is a required field !";
            span.classList.add("is-invalid");
            flag = 1;
          }
          break;
        case "minLength":
          if (field.value.length < fieldRules[rule]) {
            if(!span.classList.contains("is-invalid")){
                span.textContent = "minimum length should be " + fieldRules[rule];
                span.classList.add("is-invalid");
            }
            flag = 1;
          }
          break;
        case "maxLength":
          if (field.value.length > fieldRules[rule]) {
            if(!span.classList.contains("is-invalid")){
                span.textContent = "minimum length should be " + fieldRules[rule];
                span.classList.add("is-invalid");
            }
            flag = 1;
          }
          break;
        case "length":
          if (field.value.length !== fieldRules[rule]) {
             if(!span.classList.contains("is-invalid")){
                span.textContent = "Invalid entry";
                span.classList.add("is-invalid");
            }
            flag = 1;
          }
          break;
        case "email":
          if (fieldRules[rule]) {
            let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!pattern.test(field.value)) {
                if(!span.classList.contains("is-invalid")){
                span.textContent = "Email format is wrong";
                span.classList.add("is-invalid");
            }
              flag = 1;
            }
          }
          break;
        case "pattern":
          if (!fieldRules[rule].test(field.value)) {
            if(!span.classList.contains("is-invalid")){
                span.textContent = field.name + " Pattern mismatch";
                span.classList.add("is-invalid");
            }
            flag = 1;
          }
          break;
        case "match":
          let id = fieldRules[rule];
          let element = this.form.querySelector("#" + id);
          if (element.value != field.value) {
            if(!span.classList.contains("is-invalid")){
                span.textContent =
              element.name + " and " + field.name + " missmatch";
                span.classList.add("is-invalid");
            }
            flag = 1;
          }
          break;
        case "custom":
          if (!fieldRules[rule].fn(field.value)) {
            if(!span.classList.contains("is-invalid")){
                span.textContent = "Custom function thrown error";
                span.classList.add("is-invalid");
            }
            flag = 1;
          }
          break;
      }
      console.log("In the end");
    }

    console.log(flag);
    if (flag == 0) {
      span.innerHTML = "&#10003;";
      span.classList.add("is-valid");
      span.classList.remove("is-invalid");
    } else {
      span.classList.add("is-invalid");
      span.classList.remove("is-valid");
    }
  }
  validateAll() {
    Object.keys(this.rules).forEach((key) => this.validate(this.form[key]));
  }
}
const rules = {
  name: { required: true, minLength: 2, maxLength: 15 },
  email: { email: true, required: true },
  age: { required: true, custom: { fn: (val) => val >= 18 } },
  telephone: { required: true, length: 10 },
  username: { required: true, pattern: /^[a-zA-Z]+[a-zA-z0-9]+/ },
  password: { required: true, minLength: 8, maxLength: 20 },
  cpassword: { required: true, match: "password" },
};
const form = document.querySelector("form");
const formValidator = new FormValidator(form, rules);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidator.validateAll();
});
form.addEventListener('blur',(event)=>{
    formValidator.validate(event.target);
},true)
