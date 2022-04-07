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
		const userInfo = {
			name: this._name.textContent,
			about: this._about.textContent,
			avatar: this._avatar.src,
		};

		return userInfo;
	}

	setUserInfo(data) {
		this._name.textContent = data.name;
		this._about.textContent = data.about;
		this._avatar.src = data.avatar;
	}
}
