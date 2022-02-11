const validationConfig = {
	formSelector: '.form',
	inputSelector: '.form__input',
	submitButtonSelector: '.popup__btn-save',
	inactiveButtonClass: 'popup__btn-save_disabled',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__input-error_active',
}

const showError = (formElement, inputElement, errorMessage, objectConfig) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(objectConfig.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(objectConfig.errorClass);
};

const hideError = (formElement, inputElement, objectConfig) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(objectConfig.inputErrorClass);
	errorElement.classList.remove(objectConfig.errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, objectConfig) => {
	if (inputElement.validity.valid) {
		hideError(formElement, inputElement, objectConfig);
	} else {
		showError(formElement, inputElement, inputElement.validationMessage, objectConfig);
	}
};

function resetValidation(inputList, buttonElement, formElement, objectConfig) { 
	toggleButtonState(inputList, buttonElement, objectConfig); 

	inputList.forEach((inputElement) => { 
		hideError(formElement, inputElement, objectConfig); 
	}); 
} 

const setEventListeners = (formElement, objectConfig) => {
	const inputList = Array.from(formElement.querySelectorAll(objectConfig.inputSelector));
	const buttonElement = formElement.querySelector(objectConfig.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, objectConfig);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function() {
			checkInputValidity(formElement, inputElement, objectConfig);
			toggleButtonState(inputList, buttonElement, objectConfig);
		});
	});
}

const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid;
	});
}

function toggleButtonState(inputList, buttonElement, objectConfig) {
	if (hasInvalidInput(inputList)) {
		disableSubmit(buttonElement, objectConfig);
	} else {
		enableSubmit(buttonElement, objectConfig);
	}
}

function disableSubmit(buttonElement, objectConfig) {
	buttonElement.disabled = true;
	buttonElement.classList.add(objectConfig.inactiveButtonClass);
}

function enableSubmit(buttonElement, objectConfig) {
	buttonElement.disabled = false;
	buttonElement.classList.remove(objectConfig.inactiveButtonClass);
}

const enableValidation = (objectConfig) => {
	const formList = Array.from(document.querySelectorAll(objectConfig.formSelector));
	
	formList.forEach(formElement => {
		formElement.addEventListener('submit', function(evt) {
			evt.preventDefault();
		});
		setEventListeners(formElement, objectConfig);
	});
}

enableValidation(validationConfig);
