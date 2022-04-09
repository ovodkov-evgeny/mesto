import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._bigImage  = this._popup.querySelector('.popup-image__img');
		this._imageCaption = this._popup.querySelector('.popup-image__caption');
	}

	open(name, link) {
		this._bigImage.src = link;
		this._bigImage.alt = `Фото ${name}`;
		this._imageCaption.textContent = name;
		super.open();
	}
}
