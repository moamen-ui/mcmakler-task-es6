'use strict';

(() => {
    const xhr = new XMLHttpRequest();
    let output;
    
    const url = 'https://api.mcmakler.de/v1/advertisements';

    let limit = 10; // use 0 to load all items

    xhr.open('GET', url, true);


    xhr.onload = function() {
        if(this.status == 200) {
            let advs = JSON.parse(this.responseText);
            advs = advs.data;
            output = '';

            limit == 0 ? limit = advs.length : '';


            for(let i=0; i < limit; i++) {


                // Variables for used data
                const title = advs[i].title;
                const address = `
                    ${advs[i].realestateSummary.address.number} ${advs[i].realestateSummary.address.street} / ${advs[i].realestateSummary.address.city}
                `;
                let price =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(advs[i].advertisementPrice.sellPrice);
                const rooms = advs[i].realestateSummary.numberOfRooms;
                const space = (advs[i].realestateSummary.space).toFixed(0);
                const advAssets = advs[i].advertisementAssets;
                let image_m = '';
                let image_s = '';
                
                for (let property1 in advAssets) {
                    if (advAssets[property1].advertisementThumbnails)
                    {
                        image_m = advAssets[property1].advertisementThumbnails.inventory_m.url;
                        image_s = advAssets[property1].advertisementThumbnails.thumb_xs.url;
                        break;
                    } else {
                        image_m = advAssets.advertisementThumbnails.inventory_m.url;
                        image_s = advAssets.advertisementThumbnails.thumb_xs.url;
                    }
                }
                
                
            // Advertisement item Template
             output += `
                <div class="col">
                    <article class="card">
                        <div class="image">
                            <img
                            src="${image_m}"
                            srcset="${image_s} 200w"
                            alt="${title}" title="${title}">
                            <span class="status">rent</span>
                        </div>
                        <div class="card-body">
                            <h3 class="title">
                                ${title}  
                            </h3>
                            <address>
                                ${address}
                            </address>
                            <div class="info">
                                <span class="price">${price == 'NaN' ? price = 'Nicht verfügbar' : price}</span>
                                
                                <span class="rooms">${rooms} zimmer</span>
                                <span class="space">ap ${space} m<sup>2</sup></span>
                            </div>
                        </div>
                    </article>
                </div>
                `;
            }

            // Print adveritement items into page
            document.getElementById('output').innerHTML = output;
            
        }
    }


    xhr.send();
    
  })();