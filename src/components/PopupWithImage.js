import Popup from "./Popup.js";
import { bigImage, imageCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
	}

	open(name, link) {
		bigImage.src = link;
		bigImage.alt = `Фото ${name}`;
		imageCaption.textContent = name;
		super.open();
	}
}
