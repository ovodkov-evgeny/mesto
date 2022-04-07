const profileEditPopup = document.querySelector('.popup_type_profile');
const profileEditBtn = document.querySelector('.profile__btn-edit');
const inputName = profileEditPopup.querySelector('.form__input[name="name"]');
const inputAbout = profileEditPopup.querySelector('.form__input[name="about"]');
const popupAddCard = document.querySelector('.popup_type_card-add');
const btnAdd = document.querySelector('.profile__btn-add');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarBtn = document.querySelector('.profile__avatar-edit');
const elementsListSelector = '.elements__list';

export {
	profileEditPopup,
	profileEditBtn,
	inputName,
	inputAbout,
	popupAddCard,
	btnAdd,
	avatarPopup,
	avatarBtn,
	elementsListSelector };
