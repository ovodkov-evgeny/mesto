const validationConfig = {
	formSelector: '.form',
	inputSelector: '.form__input',
	submitButtonSelector: '.popup__btn-save',
	inactiveButtonClass: 'popup__btn-save_disabled',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__input-error_active',
}

class FormValidator {
	constructor(data, formElement) {
		this._formElement= formElement;
		this._inactiveButtonClass = data.inactiveButtonClass;
		this._inputErrorClass = data.inputErrorClass;
		this._errorClass = data.errorClass;
		this._form = this._formElement.querySelector(data.formSelector)
		this._inputList = Array.from(this._form.querySelectorAll(data.inputSelector));
		this._buttonElement = this._form.querySelector(data.submitButtonSelector);
	}

	_showError(inputElement, errorMessage) {
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}

	_hideError(inputElement) {
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	}

	_checkInputValidity(inputElement) {
		if (inputElement.validity.valid) {
			this._hideError(inputElement);
		} else {
			this._showError(inputElement, inputElement.validationMessage);
		}
	}

	_hasInvalidInput() {
		return this._inputList.some(inputElement => {
			return !inputElement.validity.valid;
		});
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._buttonElement.disabled = true;
			this._buttonElement.classList.add(this._inactiveButtonClass);
		} else {
			this._buttonElement.disabled = false;
			this._buttonElement.classList.remove(this._inactiveButtonClass);
		}
	}

	_setEventListeners() {
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	}

	resetValidation() {
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => { 
			this._hideError(inputElement); 
		});
	}

	enableValidation() {
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		this._setEventListeners();
	}
}

export { FormValidator, validationConfig };
