export class AlbumView {
    #contentContainer = null;

    createTemplate({ thumbnailUrl, title, id }) {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card', 'shadow-sm', 'h-100');
        cardWrapper.append(card);

        const photo = document.createElement('img');
        photo.classList.add('card-img-top', 'card-photo');
        photo.setAttribute('src', thumbnailUrl);
        card.append(photo);

        const cardDiscriptionBody = document.createElement('div');
        cardDiscriptionBody.classList.add(
            'card-body',
            'photo-description-block'
        );
        card.append(cardDiscriptionBody);

        const photoDiscriptionText = document.createElement('p');
        photoDiscriptionText.classList.add(
            'card-text',
            'text-center',
            'photo-description-text'
        );
        photoDiscriptionText.innerHTML = title;
        cardDiscriptionBody.append(photoDiscriptionText);

        const btnView = document.createElement('button');
        btnView.classList.add(
            'btn',
            'btn-sm',
            'btn-outline-secondary',
            'mx-auto',
            'd-block',
            'mb-2',
            'view-button'
        );
        btnView.innerHTML = 'View';
        btnView.dataset.buttonId = id;
        btnView.dataset.openPhoto = '';
        btnView.dataset.bsToggle = 'modal';
        btnView.dataset.bsTarget = '#photoModal';
        cardDiscriptionBody.prepend(btnView);

        return cardWrapper;
    }

    renderItem(data) {
        this.#contentContainer.append(this.createTemplate(data));
    }

    setContentContainer(container) {
        if (this.#contentContainer)
            throw new Error('Container already defined!');
        this.#contentContainer = container;
    }

    openPhoto(id, url) {
        const modalBody = document.querySelector('.modal-body');
        const modal = document.querySelector('#photoModal');

        const photo = document.createElement('img');
        photo.setAttribute('src', url);
        photo.classList.add('modal-full-photo');
        modalBody.innerHTML = '';
        modalBody.append(photo);
    }
}
