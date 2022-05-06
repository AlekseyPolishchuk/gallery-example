export class AlbumModel {
    getAlbumId(key) {
        if (!localStorage.getItem(key))
            throw new Error('no album id in local storage');
        return JSON.parse(localStorage.getItem(key));
    }

    getData(url) {
        return fetch(url).then((response) => response.json());
    }
}
