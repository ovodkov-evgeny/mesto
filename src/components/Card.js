export default class Card {
	constructor ( 
		userId,
		data ,
		templateSelector,
		handleCardClick,
		handleDeleteClick,
		handleLikeClick) {
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._id = data._id;
		this._userId = userId;
		this._ownerId = data.owner._id; 
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleLikeClick = handleLikeClick;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.elements__list-item')
			.cloneNode(true);

		return cardElement;
	}

	isLiked() {
		const isLikedByMe = this._likes.find( user => user._id === this._userId);

		return isLikedByMe;
	}

	setLikes(newLikes) {
		this._likes = newLikes;
		const likesCount = this._element.querySelector('.elements__like-count');
		likesCount.textContent = this._likes.length;

		if (this.isLiked()) {
			this._enableLikeState();
		} else {
			this._disableLikeState();
		}
	}

	generateCard() {
		this._element = this._getTemplate();
		this._element.querySelector('.elements__img').src = this._link;
		this._element.querySelector('.elements__img').alt = this._name;
		this._element.querySelector('.elements__title').textContent = this._name;
		this._setEventListeners();
		this.setLikes(this._likes);

		if (this._ownerId !== this._userId) {
			this._element.querySelector('.elements__btn-delete').style.display = 'none';
		}

		return this._element;
	}

	removeCard() {
		this._element.remove();
		this._element = null;
	}

	_enableLikeState() {
		this._element.querySelector('.elements__btn-like').classList.add('elements__btn-like_active');
	}

	_disableLikeState() {
		this._element.querySelector('.elements__btn-like').classList.remove('elements__btn-like_active');
	}

	_setEventListeners() {

		this._element.querySelector('.elements__btn-delete').addEventListener('click', () => {
			this._handleDeleteClick(this._id);
		});

		this._element.querySelector('.elements__img').addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});

		this._element.querySelector('.elements__btn-like').addEventListener('click', () => {
			this._handleLikeClick(this._id);
		});
	}
}
