import { Card } from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";
import { initialElements } from './cards.js';

const popups = Array.from(document.querySelectorAll('.popup'));

const profileEditPopup = document.querySelector('.popup_type_profile');
const profileEditBtn = document.querySelector('.profile__btn-edit');
const profileEditForm = document.querySelector('.edit-form');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const inputName = profileEditPopup.querySelector('.form__input[name="name"]');
const inputAbout = profileEditPopup.querySelector('.form__input[name="about"]');

const popupAddCard = document.querySelector('.popup_type_card-add');
const btnAdd = document.querySelector('.profile__btn-add');
const formAdd = document.querySelector('.add-form');
const inputTitle = popupAddCard.querySelector('.form__input[name="title"]');
const inputLink = popupAddCard.querySelector('.form__input[name="link"]');

const popupImage = document.querySelector('.popup_type_image');
const bigImage  = popupImage.querySelector('.popup-image__img');
const imageCaption = popupImage.querySelector('.popup-image__caption');

const elementsList = document.querySelector('.elements__list');

const editFormValidator = new FormValidator(validationConfig, profileEditPopup);
const addFormValidator = new FormValidator(validationConfig, popupAddCard);

const handleEscClose = function (evt) {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_opened'));
	}
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleEscClose);
}

function createCard(item) {
	const card = new Card(item, '.element-template');
	const cardElement = card.generateCard();

	return cardElement;
};

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
	const elem = createCard(data);
	elementsList.prepend(elem);
	inputTitle.value = '';
	inputLink.value = '';

	closePopup(popupAddCard);
}

initialElements.forEach((item) => {
	const elem = createCard(item);

	elementsList.append(elem);
});

popups.forEach(popup => {
	popup.addEventListener('click', (evt) => {
		if ((evt.target === evt.currentTarget) || evt.target.classList.contains('popup__btn-close')) {
			closePopup(popup);
		}
	});
});

profileEditBtn.addEventListener('click', () => {
	inputName.value = profileName.textContent;
	inputAbout.value = profileText.textContent;
	
	openPopup(profileEditPopup);
	editFormValidator.resetValidation();
});

btnAdd.addEventListener('click', () => {
	openPopup(popupAddCard);
	addFormValidator.resetValidation();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);

export { openPopup, popupImage, bigImage, imageCaption };
