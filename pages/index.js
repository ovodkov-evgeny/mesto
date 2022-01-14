const KEY_ENTER = 13;
const KEY_ESC = 27;
let editBtn = document.querySelector('.profile__btn-edit');
let closeBtn = document.querySelector('.btn-close');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.edit-form__input[name="name"]');
let aboutInput = formElement.querySelector('.edit-form__input[name="about"]');

function formOpenHandler(evt) {
	evt.preventDefault();
	formElement.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	aboutInput.value = profileText.textContent;
}

function formCloseHandler(evt) {
	evt.preventDefault();
	formElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
	evt.preventDefault();
	if (nameInput.value !== '' && aboutInput.value !== '') {
		profileName.textContent = nameInput.value;
		profileText.textContent = aboutInput.value;
		formElement.classList.remove('popup_opened');
	}
}

document.addEventListener('keydown', function (evt) {
	if (evt.keyCode === KEY_ESC) {
		if (formElement.classList.contains('popup_opened')) {
			formCloseHandler(evt);
		}
	}
});

formElement.addEventListener('keydown', function(evt) {
	if (evt.keyCode === KEY_ENTER) {
		formSubmitHandler(evt);
	}
})

editBtn.addEventListener('click', formOpenHandler);
closeBtn.addEventListener('click', formCloseHandler);
formElement.addEventListener('submit', formSubmitHandler);
