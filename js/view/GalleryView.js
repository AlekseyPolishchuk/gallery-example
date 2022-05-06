export class GalleryView {
    #controller = null;
    #list = null;

    static #createTemplate({ id, title }) {
        const listItem = document.createElement('li');
        listItem.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'album-list-item'
        );
        const albumLink = document.createElement('a');
        albumLink.classList.add('fw-bold', 'me-auto', 'album-link');
        albumLink.innerHTML = `Album №${id}`;
        albumLink.setAttribute('href', './pages/album.html');
        albumLink.setAttribute('id', id);
        albumLink.dataset.albumLink = '';
        listItem.append(albumLink);

        const albumTitle = document.createElement('p');
        albumTitle.classList.add('m-0', 'me-5');
        albumTitle.innerHTML = title;
        listItem.append(albumTitle);

        return listItem;
    }

    renderItem(dataForRender) {
        this.#list.append(GalleryView.#createTemplate(dataForRender));
    }

    setList(listNode) {
        if (this.#list) throw new Error('List already defined');
        this.#list = listNode;
    }
}
