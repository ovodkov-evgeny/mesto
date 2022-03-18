import Card from "../components/Card.js";
import { FormValidator, validationConfig } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialElements, profileEditPopup, profileEditBtn, inputName, inputAbout, popupAddCard, btnAdd, inputTitle, inputLink, elementsListSelector } from "../utils/constants.js";
import "./index.css";

const popupImage = new PopupWithImage('.popup_type_image');

const handleCardClick = (name, link) => {
	popupImage.open(name, link);
}

const createCard = item => {
	const card = new Card(item, '.element-template', handleCardClick);
	const cardElement = card.generateCard();

	return cardElement;
};

const renderCards = (card, isPrep) => {
	const cardsList = new Section({
		items: card,
		renderer: (item) => {
			const elem = createCard(item);
			cardsList.addItem(elem, isPrep);
		}
	}, elementsListSelector);
	
	cardsList.renderItems();
}

renderCards(initialElements, false);

const editFormValidator = new FormValidator(validationConfig, profileEditPopup);
const addFormValidator = new FormValidator(validationConfig, popupAddCard);

const userInfo = new UserInfo({
	nameSelector: '.profile__name',
	aboutSelector: '.profile__text'
});

const editFormPopup = new PopupWithForm({
	popupSelector: '.popup_type_profile',
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(data);
		editFormPopup.close();
	}
});

editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm({
	popupSelector: '.popup_type_card-add',
	handleFormSubmit: () => {
		const newCard = {
			name: inputTitle.value,
			link: inputLink.value
		};
		initialElements.unshift(newCard);
		renderCards(initialElements, false);
		addFormPopup.close();
	}
});

addFormPopup.setEventListeners();

profileEditBtn.addEventListener('click', () => {
	const data = userInfo.getUserInfo();
	inputName.value = data.name;
	inputAbout.value = data.about;
	
	editFormPopup.open();
	editFormValidator.resetValidation();
});

btnAdd.addEventListener('click', () => {
	addFormPopup.open();
	addFormValidator.resetValidation();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
