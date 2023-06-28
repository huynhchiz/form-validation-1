Number.prototype.format = function(){
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
 };

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const body = $('body')

const navbarNoti = $('.navbar-right__noti')
const navbarNotiPopUp = $('.navbar-right-noti__popup')
const navbarLanguage = $('.navbar-right__language')
const navbarLanguagePopUp = $('.navbar-right-language__popup')
const headerCartDiv = $('.search__cart')
const headerCartPopUp = $('.search-cart__popup')

const navbarSignUp = $('.navbar-right__sign-up')
const navbarSignIn = $('.navbar-right__sign-in')
const modal = $('.modal')
const modalSignUp = $('.modal__sign-up')
const modalSignIn = $('.modal__sign-in')
const modalFooterSignInBtn = $('.modal-sign-in-footer__sign')
const modalFooterSignUpBtn = $('.modal-sign-up-footer__sign')
const modalEyePassWordBtn = $('.modal-sign-in-main-password__eye-btn')

const headerSearchBarForm = $('.search-bar__main form')
const headerSearchBarInput = $('.search-bar__main form input')
const headerSearchBarResult = $('.search-bar__main-result')
const headerSearchSuggestDiv = $('.search-middle__search-suggest')

import { listSuggestSearch } from "./data.js";

const app = {
    validateSignUp() {
        Validator({
            form: ".modal__sign-up",
            fatherGroupElement: ".modal-sign-up-main__form-group",
            errorMessage: ".modal-sign-up--warn",
            errorFormInvalid: "modal__signup--invalid",
            rules: [
                //nhận lại 1 giá trị mà các hàm này return!!
                Validator.isRequired(".modal-sign-up-main__phonenumber", "Vui lòng nhập số điện thoại"),

                Validator.isRequired(".modal-sign-up-main__fullname"),

                Validator.isRequired(".modal-sign-up-main__email"),
                Validator.isEmail(".modal-sign-up-main__email", "Nhập đúng định dạng email!"),

                Validator.isRequired(".modal-sign-up-main__password"),
                Validator.minLength(".modal-sign-up-main__password", 6),

                Validator.isRequired(".modal-sign-up-main__password-confirm"),
                Validator.isConfirmed(".modal-sign-up-main__password-confirm", function () {
                    return document.querySelector('.modal-sign-up__main .modal-sign-up-main__password').value
                }, "Mật khẩu nhập lại không đúng!"),
                
                Validator.isRequired(".modal-sign-up-main__avatar"),

                Validator.isRequired('input[name="gender"]'),
                Validator.isRequired('input[name="hobby"]'),
                Validator.isRequired('.modal-sign-up-main__select-province'),
            ],
            Onsubmit: function (data) {
                console.log(data)
            }
        })
    },
    validateSignIn() {
        Validator({
            form: ".modal__sign-in",
            fatherGroupElement: ".modal-sign-in-main__form-group",
            errorMessage: ".modal-sign-in--warn",
            errorFormInvalid: "modal__signin--invalid",
            rules: [
                Validator.isRequired(".modal-sign-in-main-username__input"),
                Validator.isRequired(".modal-sign-in-main-password__input"),
            ],
            Onsubmit: function (data) {
                console.log(data)
            }
        })
    },

    handleHeaderHover() {
        navbarNotiPopUp.style.display = 'none'
        navbarNoti.onmouseover = function() {
            navbarNotiPopUp.style.display = 'block'
            navbarNotiPopUp.style.animation = `popup ease 200ms forwards`
        }
        navbarNoti.onmouseout = function() {
            navbarNotiPopUp.style.animation = `hide-popup ease 200ms forwards`
        }

        navbarLanguagePopUp.style.display = 'none'
        navbarLanguage.onmouseover = function() {
            navbarLanguagePopUp.style.display = 'block'
            navbarLanguagePopUp.style.animation = `popup ease 200ms forwards`
        }
        navbarLanguage.onmouseout = function() {
            navbarLanguagePopUp.style.animation = `hide-popup ease 200ms forwards`
        }

        headerCartPopUp.style.display = 'none'
        headerCartDiv.onmouseover = function() {
            headerCartPopUp.style.display = 'block'
            headerCartPopUp.style.animation = `popup ease 200ms forwards`
        }
        headerCartDiv.onmouseout = function() {
            headerCartPopUp.style.animation = `hide-popup ease 200ms forwards`
        }

    },

    handleHeaderSearch() {
        body.onclick = function() {
            headerSearchBarResult.style.display = 'none'
            headerSearchBarForm.classList.remove('search-bar__main-form')
        }

        headerSearchBarInput.onclick = function(e) {
            e.stopPropagation()
            headerSearchBarResult.style.display = 'block'
            headerSearchBarForm.classList.add('search-bar__main-form')
        }

        function renderSuggestSearchList() {
            let html = ''
            for (let i = 0; i < listSuggestSearch.length; i++) {
                html += `
                    <p>${listSuggestSearch[i]}</p>
                `
            } headerSearchSuggestDiv.innerHTML = html
        }
        renderSuggestSearchList()
    },

    handleSignModal() {
        navbarSignUp.onclick = function() {
            modal.style.display = 'flex'
            modalSignUp.style.display = 'block'
        }

        navbarSignIn.onclick = function() {
            modal.style.display = 'flex'
            modalSignIn.style.display = 'block'
        }

        modalFooterSignInBtn.onclick = function() {
            modalSignUp.style.display = 'block'
            modalSignIn.style.display = 'none'
        }

        modalFooterSignUpBtn.onclick = function() {
            modalSignIn.style.display = 'block'
            modalSignUp.style.display = 'none'
        }
        modal.onclick = function() {
            modal.style.display = 'none'
            modalSignIn.style.display = 'none'
            modalSignUp.style.display = 'none'
        }

        modalSignIn.onclick = function(e) {
            e.stopPropagation()
        }

        modalSignUp.onclick = function(e) {
            e.stopPropagation()
        }

        modalEyePassWordBtn.onclick = function() {
            modalEyePassWordBtn.classList.toggle('modal-sign-in-main-password__eye-btn--closed')
        }

    },



    start() {
        this.validateSignUp()
        this.validateSignIn()
        this.handleHeaderHover()
        this.handleSignModal()
        this.handleHeaderSearch()
    }
}

app.start()