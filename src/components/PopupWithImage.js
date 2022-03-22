import Popup from "./Popup.js";
// import { bigImage, imageCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._bigImage  = document.querySelector('.popup-image__img');
		this._imageCaption = document.querySelector('.popup-image__caption');
	}

	open(name, link) {
		this._bigImage.src = link;
		this._bigImage.alt = `Фото ${name}`;
		this._imageCaption.textContent = name;
		super.open();
	}
}
