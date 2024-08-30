let gridPar = document.querySelector('.js-galgrid');

let gridOpts = {
    itemSelector: '.js-galgrid-item',
    percentPosition: true,
    masonry: {
        horizontalOrder: true,
    },
}

/*
    RUN WARNING <-- START

    Run below code if gallery html presents manually.
*/

// let isoInit = new Isotope( gridPar, gridOpts);

// let imgLoad = imagesLoaded( gridPar );

// imgLoad.on( 'done', function( instance ) {
//     new Isotope( gridPar, gridOpts);
// });

// Fancybox.bind('[data-fancybox="gallery"]', {
//     // Options.
//     Thumbs: {
//         type: "classic",
//     },
// });

/*
    RUN WARNING <-- END
*/

const prepGalleryItem = (data) => {
    let prepHTML = '';
    for(let i = 0; i < data.length; i++) {
        prepHTML = `<div class="gallery-grid-item js-galgrid-item"><a href="${data[i].gallery_photo_main}" data-fancybox="gallery" data-src="${data[i].gallery_photo_main}" data-caption="${data[i].gallery_photo_caption_text}"><img src="${data[i].gallery_photo_thumb}" width="500px" height="350px" alt="Gallery Photo" /></a></div>`;
        gridPar.insertAdjacentHTML("beforeend", prepHTML);
    }
    let imgLoad = imagesLoaded( gridPar );
    imgLoad.on( 'done', function( instance ) {
        new Isotope( gridPar, gridOpts);
        Fancybox.bind('[data-fancybox="gallery"]', {
            Thumbs: {
                type: "classic",
            }
        });
    });
}

const initGallery = async () => {
    try {
        let resp = await fetch('public/data/gallery.json');
        let data = await resp.json();
        prepGalleryItem(data);
    } catch (error) {
        console.log(error);
    }
}

initGallery();

// Ref : https://imagesloaded.desandro.com/