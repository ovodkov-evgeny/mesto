import { Card } from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";
import { initialElements } from './cards.js';

const popups = Array.from(document.querySelectorAll('.popup'));

const profileEditPopup = document.querySelector('.popup-edit-profile');
const profileEditBtn = document.querySelector('.profile__btn-edit');
const profileEditForm = document.querySelector('.edit-form');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const inputName = profileEditPopup.querySelector('.form__input[name="name"]');
const inputAbout = profileEditPopup.querySelector('.form__input[name="about"]');

const popupAddCard = document.querySelector('.popup-add-element');
const btnAdd = document.querySelector('.profile__btn-add');
const formAdd = document.querySelector('.add-form');
const inputTitle = popupAddCard.querySelector('.form__input[name="title"]');
const inputLink = popupAddCard.querySelector('.form__input[name="link"]');

const elementsList = document.querySelector('.elements__list');

const editFormValidator = new FormValidator(validationConfig, profileEditPopup);
const addFormValidator = new FormValidator(validationConfig, popupAddCard);

const handleEscClose = function (evt) {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_opened'));
	}
}

function openPopup(popup) {
	if (popup === profileEditPopup) {
		inputName.value = profileName.textContent;
		inputAbout.value = profileText.textContent;
	}
	
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
	if (popup === popupAddCard) {
		inputTitle.value = '';
		inputLink.value = '';
	}

	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleEscClose);
}

function profileEditFormSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = inputName.value;
	profileText.textContent = inputAbout.value;

	closePopup(profileEditPopup);
}

function addFormSubmitHandler(evt) {
	evt.preventDefault();

	const data = {};
	data.link = inputLink.value;
	data.name = inputTitle.value;
	const card = new Card(data, '.element-template');
	const cardElement = card.generateCard();
	elementsList.prepend(cardElement);
	inputTitle.value = '';
	inputLink.value = '';

	closePopup(popupAddCard);
}

initialElements.forEach((item) => {
	const card = new Card(item, '.element-template');
	const cardElement = card.generateCard();

	elementsList.append(cardElement);
});

popups.forEach(popup => {
	popup.addEventListener('click', (evt) => {
		if ((evt.target === evt.currentTarget) || evt.target.classList.contains('popup__btn-close')) {
			closePopup(popup);
		}
	});
});

profileEditBtn.addEventListener('click', () => {
	openPopup(profileEditPopup);
	editFormValidator._resetValidation();
});

btnAdd.addEventListener('click', () => {
	openPopup(popupAddCard);
	addFormValidator._resetValidation();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);

export { handleEscClose };
