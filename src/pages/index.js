import Card from "../components/Card.js";
import { FormValidator, validationConfig } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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

let userId;

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
	headers: {
		authorization: 'b8106e98-09b1-41ac-a24c-7544ee76e986',
		'Content-Type': 'application/json'
	}
});

api.getProfileInfo()
.then(result => {
	userInfo.setUserInfo(result);

	userId = result._id;
});

api.getInitialCards()
.then(cards => {
	cards.forEach(card => {
		cardsList.addItem(createCard(card), false);
		// console.log(card);
	});
});

const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();

const handleCardClick = (name, link) => {
	popupImage.open(name, link);
}

// const handleDeleteCardClick = (card, id) => {
// 	deleteConfirmForm.open();
// 	deleteConfirmForm.changeSubmitHandler(() => {
// 		api.deleteCard(id)
// 		.then(result => {
// 			console.log(result);
// 			card.removeCard();
// 			deleteConfirmForm.close()
// 		});
// 	});
// }

const createCard = item => {
	const card = new Card(userId, item, '.element-template', handleCardClick, (id) => {
		deleteConfirmForm.open();
		deleteConfirmForm.changeSubmitHandler(() => {
			api.deleteCard(id)
			.then(() => {
				card.removeCard();
				deleteConfirmForm.close();
			});
		});
	});

	// console.log(card);

	return card.generateCard();
};

const cardsList = new Section ({
	items: [],
	renderer: (item) => {
		cardsList.addItem(createCard(item), false);
	}
}, elementsListSelector);

// cardsList.renderItems();

const editFormValidator = new FormValidator(validationConfig, profileEditPopup);
const addFormValidator = new FormValidator(validationConfig, popupAddCard);

const userInfo = new UserInfo({
	nameSelector: '.profile__name',
	aboutSelector: '.profile__text'
});

const editFormPopup = new PopupWithForm({
	popupSelector: '.popup_type_profile',
	handleFormSubmit: (data) => {
		api.setProfileInfo(data)
		.then(() => {
			userInfo.setUserInfo(data);
			editFormPopup.close();
		});
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
		data.name = data.title;
		api.addNewCard(data)
		.then(result => {
			cardsList.addItem(createCard(result), true);
			addFormPopup.close();
		});
	}
});

const openAddForm = () => {
	addFormPopup.open();
	addFormValidator.resetValidation();
}

const deleteConfirmForm = new PopupWithForm({popupSelector: '.popup_type_delete-confirm'});

deleteConfirmForm.setEventListeners();

editFormPopup.setEventListeners();
profileEditBtn.addEventListener('click', openEditForm);
editFormValidator.enableValidation();

addFormPopup.setEventListeners();
btnAdd.addEventListener('click', openAddForm);
addFormValidator.enableValidation();
