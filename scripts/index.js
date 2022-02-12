const popups = Array.from(document.querySelectorAll('.popup'));

const profileEditPopup = document.querySelector('.popup-edit-profile');
const profileEditBtn = document.querySelector('.profile__btn-edit');
const profileEditForm = document.querySelector('.edit-form');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const inputName = profileEditPopup.querySelector('.form__input[name="name"]');
const inputAbout = profileEditPopup.querySelector('.form__input[name="about"]');
const profileEditInputList = Array.from(profileEditPopup.querySelectorAll('.form__input'));
const profileEditSubmitBtn = profileEditPopup.querySelector('.popup__btn-save');

const popupAddCard = document.querySelector('.popup-add-element');
const btnAdd = document.querySelector('.profile__btn-add');
const btnSaveCard = popupAddCard.querySelector('.popup__btn-save');
const formAdd = document.querySelector('.add-form');
const formAddInputList = Array.from(popupAddCard.querySelectorAll('.form__input'));
const inputTitle = popupAddCard.querySelector('.form__input[name="title"]');
const inputLink = popupAddCard.querySelector('.form__input[name="link"]');

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('.element-template').content;

const popupImage = document.querySelector('.popup-image');
const bigImage  = popupImage.querySelector('.popup-image__img');
const imageCaption = popupImage.querySelector('.popup-image__caption');

function renderCard (name, link) {
	const card = elementTemplate.cloneNode(true);

	card.querySelector('.elements__img').src = link;
	card.querySelector('.elements__img').alt = name;
	card.querySelector('.elements__title').textContent = name;
	
	card.querySelector('.elements__btn-delete').addEventListener('click', (evt) => {
		evt.target.closest('.elements__list-item').remove();
	});

	card.querySelector('.elements__img').addEventListener('click', () => {
		openPopup(popupImage);
		bigImage.src = link;
		bigImage.alt = 'Фото ' + name;
		imageCaption.textContent = name;
	});

	card.querySelector('.elements__btn-like').addEventListener('click', (evt) => {
		evt.target.classList.toggle('elements__btn-like_active');
	});

	return card;
}

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
	const elem = renderCard(inputTitle.value, inputLink.value);
	elementsList.prepend(elem);
	inputTitle.value = '';
	inputLink.value = '';

	closePopup(popupAddCard);
}

initialElements.forEach(item => {
	const elem = renderCard(item.name, item.link);

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
	openPopup(profileEditPopup);
	resetValidation(profileEditInputList, profileEditSubmitBtn, profileEditPopup, validationConfig);
});

btnAdd.addEventListener('click', () => {
	openPopup(popupAddCard);
	resetValidation(formAddInputList, btnSaveCard, popupAddCard, validationConfig);
});

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
formAdd.addEventListener('submit', addFormSubmitHandler);
