export class GalleryController {
    _listSelector = null;
    _list = null;
    _dataAlbumsUrl = null;

    #view = null;
    #model = null;

    constructor(galleryConfiguration, ViewClass, ModelClass) {
        this.#setView(ViewClass);
        this.#setModel(ModelClass);

        this._listSelector = galleryConfiguration.albumListSelector;
        this._dataAlbumsUrl = galleryConfiguration.dataAlbumsUrl;

        this.list = GalleryController.#getElementFromDOM(this.listSelector);

        this.#setWindowOnloadEvent();
        this.setAlbumLink();

        this.#model.registerController(this);
    }

    #setView(ViewClass) {
        this.#view = new ViewClass(this);
    }

    #setModel(ModelClass) {
        this.#model = new ModelClass(this);
    }
    windowOnloadHandler = () => {
        this.#model.getData(this.dataAlbumsUrl).then((data) =>
            data.forEach((item) => {
                this.#view.renderItem(item);
            })
        );
    };

    #setWindowOnloadEvent() {
        const options = {};

        window.addEventListener(
            'DOMContentLoaded',
            this.windowOnloadHandler,
            options
        );
    }

    static #getElementFromDOM(elementSelector) {
        const element = document.querySelector(elementSelector);

        if (!(element instanceof HTMLElement)) {
            throw new Error('Value is not HTML element');
        }

        return element;
    }

    set list(listNode) {
        this.#view.setList(listNode);
        this._list = listNode;
    }

    get list() {
        return this._list;
    }

    get listSelector() {
        return this._listSelector;
    }

    get dataAlbumsUrl() {
        return this._dataAlbumsUrl;
    }

    albumLinkHandler = (event) => {
        event.stopPropagation();

        const { target } = event;
        if (!target.hasAttribute('data-album-link')) return;

        const id = target.getAttribute('id');
        this.#model.setItemId(id);
    };

    setAlbumLink() {
        this.list.addEventListener('click', this.albumLinkHandler);
    }
}
