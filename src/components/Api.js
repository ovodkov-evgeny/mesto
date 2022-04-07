export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers  = headers;
	}

	_getDataResponse(res) {
		return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
	}

	getProfileInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		})
		.then(this._getDataResponse);
	}

	setProfileInfo(userInfo) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: userInfo.name,
				about: userInfo.about
			})
		})
		.then(this._getDataResponse);
	}

	addNewCard(cardInfo) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: cardInfo.name,
				link: cardInfo.link
			})
		})
		.then(this._getDataResponse);
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		})
		.then(this._getDataResponse);
	}

	deleteLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		})
		.then(this._getDataResponse);
	}

	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'PUT',
			headers: this._headers,
		})
		.then(this._getDataResponse);
	}

	editAvatar(avatarLink) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatarLink,
			})
		})
		.then(this._getDataResponse);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers
		})
		.then(this._getDataResponse);
	}
}
