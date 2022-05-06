export class AlbumController {
    #albumKey = null;
    #albumId = null;
    _albumUrl = null;

    _contentContainerSelector = null;
    _contentContainer = null;

    #view = null;
    #model = null;

    constructor(albumConfiguration, ViewClass, ModelClass) {
        this.#setView(ViewClass);
        this.#setModel(ModelClass);

        this.#albumKey = albumConfiguration.albumKey;
        this.#albumId = this.#model.getAlbumId(this.albumKey);
        this._albumUrl = `${albumConfiguration.albumUrl}${this.#albumId}`;

        this._contentContainerSelector = albumConfiguration.contentContainer;
        this.contentContainer = AlbumController.#getElementFromDOM(
            this.contentContainerSelector
        );

        this.#setOpenPhotoEvent();

        this.#setWindowOnloadEvent();
    }

    #setView(ViewClass) {
        this.#view = new ViewClass(this);
    }

    #setModel(ModelClass) {
        this.#model = new ModelClass(this);
    }

    get albumKey() {
        return this.#albumKey;
    }

    get albumUrl() {
        return this._albumUrl;
    }

    get contentContainerSelector() {
        return this._contentContainerSelector;
    }

    get contentContainer() {
        return this._contentContainer;
    }

    set contentContainer(container) {
        this.#view.setContentContainer(container);
        this._contentContainer = container;
    }

    windowOnloadHandler = () => {
        this.#model.getData(this.albumUrl).then((data) =>
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

    #setOpenPhotoEvent() {
        const options = {};

        this.contentContainer.addEventListener(
            'click',
            this.openPhotoHandler,
            options
        );
    }

    openPhotoHandler = (event) => {
        event.stopPropagation();
        const { target } = event;
        if (!target.hasAttribute('data-open-photo')) return;

        const itemId = +target.getAttribute('data-button-id');

        this.#model.getData(this.albumUrl).then((data) => {
            const dataAlbums = data;
            const photoUrl = dataAlbums.find((item) => item.id === itemId).url;
            this.#view.openPhoto(itemId, photoUrl);
        });
    };
}
