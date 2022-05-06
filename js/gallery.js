'use strict';

import { GalleryController as Controller } from './controller/GalleryController.js';
import { GalleryModel as Model } from './model/GalleryModel.js';
import { GalleryView as View } from './view/GalleryView.js';

const galleryApp = (() => {
    const galleryConfiguration = {
        albumListSelector: '#albumList',
        dataAlbumsUrl: 'https://jsonplaceholder.typicode.com/albums',
    };

    const controller = new Controller(galleryConfiguration, View, Model);

    return controller;
})();
