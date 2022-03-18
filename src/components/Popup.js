export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
		this._popup = document.querySelector(popupSelector);
	}

	open() {
		this._popup.classList.add('popup_opened');
		this._setEventListeners();
		document.addEventListener('keydown', this._handleEscClose.bind(this));
	}

	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose.bind(this));
	}

	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	_setEventListeners() {
		this._popup.addEventListener('click', (evt) => {
			if ((evt.target === evt.currentTarget) || evt.target.classList.contains('popup__btn-close')) {
				this.close();
			}
		});
	}
}
