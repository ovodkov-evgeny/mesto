export default class Card {
	constructor (data, templateSelector, handleCardClick) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
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
		this._element = null;
	}

	_toggleLikeState() {
		this._element.querySelector('.elements__btn-like').classList.toggle('elements__btn-like_active');
	}

	_setEventListeners() {

		this._element.querySelector('.elements__btn-delete').addEventListener('click', () => {
			this._removeCard();
		});

		this._element.querySelector('.elements__img').addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});

		this._element.querySelector('.elements__btn-like').addEventListener('click', () => {
			this._toggleLikeState();
		});
	}
}
