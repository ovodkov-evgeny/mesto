import Card from "../components/Card.js";
import { FormValidator, validationConfig } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { 
	initialElements,
	profileEditPopup,
	profileEditBtn,
	inputName,
	inputAbout,
	popupAddCard,
	btnAdd,
	elementsListSelector } from "../utils/constants.js";
import "./index.css";

const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();

const handleCardClick = (name, link) => {
	popupImage.open(name, link);
}

const createCard = item => {
	const card = new Card(item, '.element-template', handleCardClick);

	return card.generateCard();
};

const cardsList = new Section ({
	renderer: (item) => {
		cardsList.addItem(createCard(item), false);
	}
}, elementsListSelector);

cardsList.renderItems(initialElements);

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

const openEditForm = () => {
	const {name, about}= userInfo.getUserInfo();
	inputName.value = name;
	inputAbout.value = about;
	
	editFormPopup.open();
	editFormValidator.resetValidation();
}

const addFormPopup = new PopupWithForm({
	popupSelector: '.popup_type_card-add',
	handleFormSubmit: (data) => {
		cardsList.addItem(createCard(data), true);
		addFormPopup.close();
	}
});

const openAddForm = () => {
	addFormPopup.open();
	addFormValidator.resetValidation();
}

editFormPopup.setEventListeners();
profileEditBtn.addEventListener('click', openEditForm);
editFormValidator.enableValidation();

addFormPopup.setEventListeners();
btnAdd.addEventListener('click', openAddForm);
addFormValidator.enableValidation();
