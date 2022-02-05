const popupEdit = document.querySelector('.popup-edit-profile');
const editBtn = document.querySelector('.profile__btn-edit');
const editForm = document.querySelector('.edit-form');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const nameInput = editForm.querySelector('.form__input[name="name"]');
const aboutInput = editForm.querySelector('.form__input[name="about"]');

const popupAdd = document.querySelector('.popup-add-element');
const addBtn = document.querySelector('.profile__btn-add');
const addForm = document.querySelector('.add-form');
const titleInput = addForm.querySelector('.form__input[name="title"]');
const linkInput = addForm.querySelector('.form__input[name="link"]');

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('.element-template').content;

const closeBtns = document.querySelectorAll('.popup__btn-close');

const popupImage = document.querySelector('.popup-image');
const bigImage  = popupImage.querySelector('.popup-image__img');
const imageCaption = popupImage.querySelector('.popup-image__caption');

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

function openPopup(popup) {
	popup.classList.add('popup_opened');
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

function openForm(popup) {
	return () => {
		if (popup === popupEdit) {
			const inputList = Array.from(editForm.querySelectorAll('.form__input'));
			const buttonElement = editForm.querySelector('.popup__btn-save');
			nameInput.value = profileName.textContent;
			aboutInput.value = profileText.textContent;
			// checkInputValidity(editForm,nameInput);
			toggleButtonState(inputList, buttonElement);
		}
		openPopup(popup);
	}
}

function closeForm(evt) {
	evt.preventDefault();
	closePopup(evt.target.closest('.popup'));
}

function editFormSubmitHandler(evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileText.textContent = aboutInput.value;
		
	closeForm(evt);
}

function addFormSubmitHandler(evt) {
	evt.preventDefault();
	const elem = renderCard(titleInput.value, linkInput.value);
	elementsList.prepend(elem);
	titleInput.value = '';
	linkInput.value = '';
	
	closeForm(evt);
}

initialElements.forEach(item => {
	const elem = renderCard(item.name, item.link);

	elementsList.append(elem);
});

editBtn.addEventListener('click', openForm(popupEdit));
addBtn.addEventListener('click', openForm(popupAdd));
editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

closeBtns.forEach(item => {
	item.addEventListener('click', (evt) => {
		closeForm(evt);
	});
});
