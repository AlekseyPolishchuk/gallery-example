'use strict';

import { AlbumController as Controller } from './controller/AlbumController.js';
import { AlbumModel as Model } from './model/AlbumModel.js';
import { AlbumView as View } from './view/AlbumView.js';

const albumApp = (() => {
    const albumConfiguration = {
        contentContainer: '#contentContainer',
        albumKey: 'albumId',
        viewButton: '.view-button',
        albumUrl: 'https://jsonplaceholder.typicode.com/photos?albumId=',
    };

    const controller = new Controller(albumConfiguration, View, Model);
    return controller;
})();
