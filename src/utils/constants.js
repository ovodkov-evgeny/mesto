const initialElements = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

const profileEditPopup = document.querySelector('.popup_type_profile');
const profileEditBtn = document.querySelector('.profile__btn-edit');
const inputName = profileEditPopup.querySelector('.form__input[name="name"]');
const inputAbout = profileEditPopup.querySelector('.form__input[name="about"]');
const popupAddCard = document.querySelector('.popup_type_card-add');
const btnAdd = document.querySelector('.profile__btn-add');
const elementsListSelector = '.elements__list';

export {
	initialElements,
	profileEditPopup,
	profileEditBtn,
	inputName,
	inputAbout,
	popupAddCard,
	btnAdd,
	elementsListSelector };
