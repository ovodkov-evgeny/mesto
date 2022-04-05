import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor ({ popupSelector, handleFormSubmit }) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector('.form');
		this._inputs = this._form.querySelectorAll('.form__input');
	}

	_getInputValues() {
		this._inputsValues = {};
		this._inputs.forEach(input => { 
			this._inputsValues[input.name] = input.value;
		});
		
		return this._inputsValues;
	}

	changeSubmitHandler(newSubmitHandler) {
		this._handleFormSubmit =newSubmitHandler;
	}

	setEventListeners() {
		super.setEventListeners();

		this._popup.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit(this._getInputValues());
		});
	}

	close() {
		super.close();
		this._form.reset();
	}
}
