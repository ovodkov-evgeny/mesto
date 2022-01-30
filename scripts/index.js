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
		popupImage.classList.add('popup_opened');
		bigImage.src = link;
		imageCaption.textContent = name;
	});

	card.querySelector('.elements__btn-like').addEventListener('click', (evt) => {
		evt.target.classList.toggle('elements__btn-like_active');
	});

	return card;
}

function formOpenHandler(popup) {
	return () => {
		if (popup === popupEdit) {
			nameInput.value = profileName.textContent;
			aboutInput.value = profileText.textContent;
		}
		popup.classList.add('popup_opened');
	}
}

function formCloseHandler(evt) {
	evt.preventDefault();
	evt.target.closest('.popup').classList.remove('popup_opened');
}

function editFormSubmitHandler(evt) {
	evt.preventDefault();
	if (nameInput.value !== '' && aboutInput.value !== '') {
		profileName.textContent = nameInput.value;
		profileText.textContent = aboutInput.value;
		
		formCloseHandler(evt);
	}
}

function addFormSubmitHandler(evt) {
	evt.preventDefault();
	if (titleInput.value !== '' && linkInput.value !== '') {
		const elem = renderCard(titleInput.value, linkInput.value);
		elementsList.prepend(elem);
		formCloseHandler(evt);
	}
}

initialElements.forEach(item => {
	const elem = renderCard(item.name, item.link);

	elementsList.append(elem);
});

editBtn.addEventListener('click', formOpenHandler(popupEdit));
addBtn.addEventListener('click', formOpenHandler(popupAdd));
editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

closeBtns.forEach(item => {
	item.addEventListener('click', (evt) => {
		formCloseHandler(evt);
	});
});
