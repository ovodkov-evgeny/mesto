let editBtn = document.querySelector('.profile__btn-edit');
let closeBtn = document.querySelector('.popup__btn-close');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let popup = document.querySelector('.popup');
let editForm = document.querySelector('.edit-form');
let nameInput = editForm.querySelector('.edit-form__input[name="name"]');
let aboutInput = editForm.querySelector('.edit-form__input[name="about"]');

function formOpenHandler(evt) {
	evt.preventDefault();
	popup.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	aboutInput.value = profileText.textContent;
}

function formCloseHandler(evt) {
	evt.preventDefault();
	popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
	evt.preventDefault();
	if (nameInput.value !== '' && aboutInput.value !== '') {
		profileName.textContent = nameInput.value;
		profileText.textContent = aboutInput.value;
		
		formCloseHandler(evt);
	}
}

editBtn.addEventListener('click', formOpenHandler);
closeBtn.addEventListener('click', formCloseHandler);
editForm.addEventListener('submit', formSubmitHandler);
