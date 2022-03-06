import { handleEscClose } from './index.js';

class Card {
	constructor (data, templateSelector) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.elements__list-item')
			.cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();

		this._element.querySelector('.elements__img').src = this._link;
		this._element.querySelector('.elements__img').alt = this._name;
		this._element.querySelector('.elements__title').textContent = this._name;

		return this._element;
	}

	_removeCard() {
		this._element.remove();
	}

	_openCard() {
		const popupImage = document.querySelector('.popup-image');
		const bigImage  = popupImage.querySelector('.popup-image__img');
		const imageCaption = popupImage.querySelector('.popup-image__caption');

		bigImage.src = this._link;
		bigImage.alt = `Фото ${this._name}`;
		imageCaption.textContent = this._name;
		popupImage.classList.add('popup_opened');
	}

	_toggleLikeState() {
		this._element.querySelector('.elements__btn-like').classList.toggle('elements__btn-like_active');
	}

	_setEventListeners() {

		this._element.querySelector('.elements__btn-delete').addEventListener('click', () => {
			this._removeCard();
		});

		this._element.querySelector('.elements__img').addEventListener('click', () => {
			this._openCard();
			document.addEventListener('keydown', handleEscClose);
		});

		this._element.querySelector('.elements__btn-like').addEventListener('click', () => {
			this._toggleLikeState();
		});
	}
}

export { Card };
