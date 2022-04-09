export default class UserInfo {
	constructor({ nameSelector, aboutSelector, avatarSelector }) {
		this._nameSelector = nameSelector;
		this._aboutSelector = aboutSelector;
		this._avatarSelector = avatarSelector;
		this._name = document.querySelector(this._nameSelector);
		this._about = document.querySelector(this._aboutSelector);
		this._avatar = document.querySelector(this._avatarSelector);
	}

	getUserInfo() {
		const userData = {
			name: this._name.textContent,
			about: this._about.textContent,
		};

		return userData;
	}

	setUserInfo({ name, about, avatar, _id }) {
		this._name.textContent = name;
		this._about.textContent = about;
		this._avatar.src = avatar;
		this._id = _id;
	}
}
