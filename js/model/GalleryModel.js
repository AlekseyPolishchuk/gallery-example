export class GalleryModel {
    #controller = null;
    albumKey = 'albumId';

    registerController(controllerInstance) {
        if (this.#controller) throw new Error('Controller is already defined');
        this.#controller = controllerInstance;
    }

    #hasItem() {
        let data = localStorage.getItem(this.albumKey);
        if (data === null) return false;

        return !!JSON.parse(data).length;
    }

    hasItem() {
        return this.#hasItem();
    }

    setItemId(id) {
        if (!this.hasItem()) this.saveItemId(id);

        this.saveItemId(id);
    }

    saveItemId(id) {
        localStorage.setItem(this.albumKey, JSON.stringify(id));
    }

    getData(url) {
        return fetch(url).then((response) => response.json());
    }
}
