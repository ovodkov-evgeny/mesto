const validationConfig = {
	formSelector: '.form',
	inputSelector: '.form__input',
	submitButtonSelector: '.popup__btn-save',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__input-error_active',
}

const showError = (formElement, inputElement, errorMessage, objectConfig) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(objectConfig.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(objectConfig.errorClass);
};

// const showError = (formElement, objectConfig, errorMessage) => {
// 	const errorElement = formElement.querySelector(`.${objectConfig.inputSelector.id}-error`);
// 	objectConfig.inputSelector.classList.add(validationConfig.inputErrorClass);
// 	errorElement.textContent = errorMessage;
// 	errorElement.classList.add(validationConfig.errorClass);
// };

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

function resetValidation(inputList, buttonElement, formElement) { 
	toggleButtonState(inputList, buttonElement); 

	inputList.forEach((inputElement) => { 
		hideError(formElement, inputElement); 
	}); 
} 

const setEventListeners = (formElement, objectConfig) => {
	const inputList = Array.from(formElement.querySelectorAll(objectConfig.inputSelector));
	const buttonElement = formElement.querySelector(objectConfig.submitButtonSelector);
	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function() {
			checkInputValidity(formElement, inputElement, objectConfig);
			toggleButtonState(inputList, buttonElement);
		});
	});
}

const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid;
	});
}

function toggleButtonState(inputList, buttonElement) {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
	} else {
		buttonElement.disabled = false;
	}
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
