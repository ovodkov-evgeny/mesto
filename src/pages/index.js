import Card from "../components/Card.js";
import { FormValidator, validationConfig } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
	profileEditPopup,
	profileEditBtn,
	popupAddCard,
	btnAdd,
	avatarPopup,
	avatarBtn,
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

const userInfo = new UserInfo({
	nameSelector: '.profile__name',
	aboutSelector: '.profile__text',
	avatarSelector: '.profile__avatar',
});

Promise.all([api.getInitialCards(), api.getProfileInfo()])
	.then(result => {
		const [cards, userData] = result;
		userId = userData._id;
		userInfo.setUserInfo(userData);
		cardsList.renderItems(cards);
	})
	.catch((err) => console.log(err));

const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();

const handleCardClick = (name, link) => {
	popupImage.open(name, link);
}

const createCard = item => {
	const card = new Card(userId, item, '.element-template', handleCardClick, (id) => {
		deleteConfirmPopup.open();
		deleteConfirmPopup.changeSubmitHandler(() => {
			api.deleteCard(id)
			.then(() => {
				card.removeCard();
				deleteConfirmPopup.close();
			})
			.catch(err => console.log(err));
		});
	}, 
	(id) => {
		if (card.isLiked()) {
		api.deleteLike(id)
		.then(result => {
			card.setLikes(result.likes);
		})
		.catch(err => console.log(err));
	} else {
		api.addLike(id)
		.then(result => {
			card.setLikes(result.likes);
		})
		.catch(err => console.log(err));
	}
});

	return card.generateCard();
};

const cardsList = new Section ({
	renderer: (item) => {
		cardsList.addItem(createCard(item), false);
	}
}, elementsListSelector);

const editFormValidator = new FormValidator(validationConfig, profileEditPopup);
const addFormValidator = new FormValidator(validationConfig, popupAddCard);
const avatarEditValidator = new FormValidator(validationConfig, avatarPopup);

const editFormPopup = new PopupWithForm({
	popupSelector: '.popup_type_profile',
	handleFormSubmit: (data) => {
		editFormPopup.renderLoading('Сохранение...');
		api.setProfileInfo(data)
		.then((result) => {
			userInfo.setUserInfo(result);
			editFormPopup.close();
		})
		.catch(err => console.log(err))
		.finally(() => editFormPopup.renderLoading());
	}
});

const openEditForm = () => {
	editFormPopup.open();
	editFormPopup.setInputValues(userInfo.getUserInfo());
	editFormValidator.resetValidation();
}

const avatarEditPopup = new PopupWithForm({
	popupSelector: '.popup_type_avatar',
	handleFormSubmit: (link) => {
		avatarEditPopup.renderLoading('Сохранение...');
		api.editAvatar(link.avatar)
		.then((result) => {
			userInfo.setUserInfo(result);
			avatarEditPopup.close();
		})
		.catch(err => console.log(err))
		.finally(() => avatarEditPopup.renderLoading());
	}
});

const openAvatarPopup = () => {
	avatarEditPopup.open();
	avatarEditValidator.resetValidation();
}

const addFormPopup = new PopupWithForm({
	popupSelector: '.popup_type_card-add',
	handleFormSubmit: (data) => {
		data.name = data.title;
		addFormPopup.renderLoading('Создание...');
		api.addNewCard(data)
		.then(result => {
			cardsList.addItem(createCard(result), true);
			addFormPopup.close();
		})
		.catch(err => console.log(err))
		.finally(() => addFormPopup.renderLoading());
	}
});

const openAddForm = () => {
	addFormPopup.open();
	addFormValidator.resetValidation();
}

const deleteConfirmPopup = new PopupWithForm({popupSelector: '.popup_type_delete-confirm'});

deleteConfirmPopup.setEventListeners();

editFormPopup.setEventListeners();
profileEditBtn.addEventListener('click', openEditForm);
editFormValidator.enableValidation();

addFormPopup.setEventListeners();
btnAdd.addEventListener('click', openAddForm);
addFormValidator.enableValidation();

avatarEditPopup.setEventListeners();
avatarBtn.addEventListener('click', openAvatarPopup);
avatarEditValidator.enableValidation();
