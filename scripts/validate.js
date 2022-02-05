// const obn = document.forms.edit;
// console.log(typeof obn);

const showError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('form__input_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error_active');
};

const hideError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('form__input_type_error');
	errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
	if (inputElement.validity.valid) {
		hideError(formElement, inputElement);
	} else {
		showError(formElement, inputElement, inputElement.validationMessage);
	}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.form__input'));
	const buttonElement = formElement.querySelector('.popup__btn-save');
	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function() {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
	});
}

const enableValidation = (formObject) => { //Проверить!!!
	const formList = Array.from(document.querySelectorAll(formObject.formSelector));
	
	formList.forEach(formElement => {
		formElement.addEventListener('submit', function(evt) {
			evt.preventDefault();
		});
		setEventListeners(formElement);
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

enableValidation({
	formSelector: '.form'
});

// enableValidation({
	// formSelector: '.popup__form',
	// inputSelector: '.popup__input',
	// submitButtonSelector: '.popup__button',
	// inactiveButtonClass: 'popup__button_disabled',
	// inputErrorClass: 'popup__input_type_error',
	// errorClass: 'popup__error_visible'
// }); 
