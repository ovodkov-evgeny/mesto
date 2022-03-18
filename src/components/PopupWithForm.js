import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor ({ popupSelector, handleFormSubmit }) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
	}

	_getInputValues() {
		this._inputs = this._popup.querySelectorAll('.form__input');
		this._inputsValues = {};
		this._inputs.forEach(input => {
			this._inputsValues[input.name] = input.value;
		});
		
		return this._inputsValues;
	}

	setEventListeners() {
		this._popup.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
		});
	}

	close() {
		super.close();
		this._popup.querySelector('.form').reset();
	}
}
