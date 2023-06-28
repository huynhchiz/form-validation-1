function Validator(options) {
    let selectedRules = {}

    // Hàm thực hiện validate
    function validate (inputElement, rule) {
        // value: inputElement.value
        // test function: rule.test

        // let errorMess = rule.test(inputElement.value)
        let errorMess
        var fatherGroup = inputElement.closest(options.fatherGroupElement)
        var errorElement = fatherGroup.querySelector(options.errorMessage)

        // lấy ra các rules của selector
        let rules = selectedRules[rule.selector]

        // lặp qua từng rule và kiểm tra
        // nếu có lỗi thì dừng ngay
        for (let i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMess =
                        rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break;
                default:
                    errorMess = rules[i](inputElement.value);
            }
            if (errorMess) break
        }

        if (errorMess) {
            fatherGroup.classList.add(options.errorFormInvalid)
            errorElement.innerText = errorMess;
        } else {
            fatherGroup.classList.remove(options.errorFormInvalid)
            errorElement.innerText = '';
        }
        return !errorMess
    }

    // lấy Element của form cần validate
    var formElement = document.querySelector(options.form)    
    if (formElement) {
        // xử lý khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault()

            let isFormValid = true;

            // lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate (inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            });

            if (isFormValid) {
                // trường hợp submit với javascript
                if (typeof options.Onsubmit === 'function') {
                    // lấy ra các ô input
                    let enableInputs = formElement.querySelectorAll('[name]');

                    // Array.from sẽ convert nodelist enableInputs thành array
                    let formValues = Array.from(enableInputs).reduce(function (values, input) {

                        switch(input.type) {
                            case 'radio':
                                values[input.name] =
                                    formElement.querySelector(`input[name="${input.name}"]:checked`).value
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value)
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            
                            default:
                                values[input.name] = input.value;
                        }
                        return values
                    }, {});
                    options.Onsubmit(formValues);
                }
                // trường hợp submit với hành vi mặc định
                else {
                    formElement.submit()
                }
            }
        }

        // lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            if (Array.isArray(selectedRules[rule.selector])) {
                // nếu selectedRules[rule.selector] đã là 1 mảng thì push phần tử 
                // tiếp theo vào mảng
                selectedRules[rule.selector].push(rule.test)
            } else {
                // nếu selectedRules[rule.selector] chưa phải là 1 mảng thì
                // gán cho phần tử đầu tiên trong selectedRules[rule.selector] là mảng
                selectedRules[rule.selector] = [rule.test]
            }

           var inputElements = formElement.querySelectorAll(rule.selector)

           Array.from(inputElements).forEach(function (inputElement) {
            // xử lý trường hợp người dùng Blur khỏi input
            inputElement.onblur = function () {
                validate (inputElement, rule)
            }
            inputElement.onchange = function () {
                validate (inputElement, rule)
            }
            // xử lý trường hợp người dùng nhập vào input
            inputElement.oninput = function () {
                var fatherGroup = inputElement.closest(options.fatherGroupElement)
                var errorElement = fatherGroup.querySelector(options.errorMessage)
                fatherGroup.classList.remove(options.errorFormInvalid)
                errorElement.innerText = '';                 
            }
           });
        })
    }
}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => hiển thị message lỗi
// 2. Khi hợp lệ => không hiển thị ra gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || "Vui lòng nhập vào ô này!"
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || "Nhập vào email!"
        }
    }
}

Validator.minLength = function (selector, minNumber, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= minNumber ? undefined : message || `Độ dài phải tối thiểu ${minNumber} ký tự!`
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || `Giá trị nhập vào không chính xác`
        }
    }
}