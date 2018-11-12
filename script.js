//Create tags buttons
(function($) {
    const STORAGE_SIZE = 9;

    const $buttons = $("#buttons"),
        $imgs = $("#gallery img");
    const tagged = {};
    const $gallery = $("#gallery");
    const $searchInput = $("#searchInput");
    const cache = [];
    const $tagSelector = $("#tagSelector");
    // const selectedTags = new Set();

    function cacheTags() { 
        const img = this;
        const tags = $(this).data("tags");

        pushTagsIntoCache(img, tags);
   }

   function pushTagsIntoCache(img, tags) {
        tags.split(", ").forEach(tag => {
            if (typeof tagged[tag] === 'undefined')
            {
                tagged[tag] = [];
            }

            tagged[tag].push(img);
        });
   }

    $imgs.each(cacheTags);

    loadPersistedImagesFromStorage();

    //display-all button
    const $button = $("<button />", {
        text: "Display all",
        click: function() {
            $(this)
                .removeClass("btn-secondary")
                .addClass("btn-primary")
                .siblings().removeClass("btn-primary").addClass("btn-secondary");
            $imgs.fadeIn();
        },
        class: "btn btn-primary"
    }).appendTo($buttons);

    //display tag buttons
    $.each(tagged, function(tag) {
        $("<button />", {
            text: `${tag} (${tagged[tag].length})`,
            class: 'btn btn-secondary',
            click: function() {

                $(this)    
                    .removeClass("btn-secondary")
                    .addClass("btn-primary")
                    .siblings().removeClass("btn-primary").addClass("btn-secondary");

                // const $self = $(this);
                // if (!selectedTags.has(tag))
                //     selectedTags.add(tag);
                // else
                //     selectedTags.delete(tag);
                // selectedTags.forEach(tag => {
                    
                // });

                // $imgs.hide();
                // let tagsAmount = selectedTags.length;

                // if (selectedTags.length === 0)
                //     $imgs.hide();

                // selectedTags.forEach(t => {
                //     $.each($imgs, function (i, img) { 
                //         if ($(img).attr("data-tags").includes(t))
                //            $(img).fadeIn(800);
                //    });
                // });
                
                // $imgs.fadeIn(800);

                $imgs.hide()
                    .filter(tagged[tag])
                    .fadeIn(800);
            }
        }).appendTo($buttons);
    });

    let $customImg;
    document.getElementById("inputFile").addEventListener('change', e => {
        const file = e.target.files[0];
        if (file.type.includes("image"))
        {
            $("#inputFile").removeClass("red-border")
            const reader = new FileReader();
            reader.onload = function(ev) {
                $customImg = $("<img />");
                $customImg.attr("src", ev.target.result);
                //                     $gallery.append($customImg); //.hide().fadeIn(800)
                // persistImage($customImg);
            };
            
            reader.readAsDataURL(file);
        }
        else
        {
            $("#inputFile").addClass("red-border");
        }

    }, false);

    function loadPersistedImagesFromStorage()
    {
        let $customImg, persistedImage;
        for (let i = 0; i < STORAGE_SIZE; i++)
        {
            persistedImage = sessionStorage.getItem("image" + i);
            // console.log(persistedImage);
            if (persistedImage !== null && persistedImage !== 'undefined')
            {
                // console.log(persistedImage + "<------");
                $customImg = $("<img />");
                $customImg.attr("src", persistedImage);
                $gallery.append($customImg);
            }
        }
    }

    function persistImage(img)
    {
        for (let i = 0; i < STORAGE_SIZE; i++)
        {
            if (!sessionStorage.getItem("image" + i) || sessionStorage.getItem("image" + i) === null)
            {
                // let imgData = getBase64Image(img);
                // sessionStorage.setItem("image" + i, imgData);

                //transform the jQuery's img tag into js DOM element
                //and then save the src value into local storage
                sessionStorage.setItem("image" + i, img[0].src);
                break;
            }
        }
    }

    $.each($imgs, function (i, img) {
        const name = $(img).attr('alt').trim().toLowerCase();
        cache.push({
            element: img,
            alt: name
        });
    });

    $searchInput.on("input", function() {
        const typedPhrase = this.value.trim().toLowerCase();
        $button.click();
        cache.forEach(img => {
            // console.log(img.alt.includes(typedPhrase));
            if (img.alt.includes(typedPhrase))
                img.element.style.display = '';
            else
            img.element.style.display = 'none';
        });

        // console.log(typedPhrase);
    });
    
            // cache.forEach(img => console.log(img));

    (function addTagsIntoList()
    {
        const tags = new Set();
        for (const tag in tagged) {
            tags.add(tag);
        }
        // const tags = $(this).data("tags").split(", ").forEach(tag => tags.add(tag));
        tags.forEach(tag => {
            const option = $("<option />", { text: tag });
            $tagSelector.append(option);
        });

    }());

    document.getElementById("submitImage").addEventListener("click", e => {
        e.preventDefault();
        //TODO
        const alt = document.getElementById("tagName").value;
        const tagSel = document.getElementById("tagSelector");
        const tag = tagSel.value;
        $customImg.attr("alt", alt).attr("data-tags", tag);
        if (!$("#inputFile").hasClass("red-border"))
        {
            tagged[tag].push($customImg[0]);
            $gallery.append($customImg);
            persistImage($customImg);
            console.log($customImg[0]);
            console.log($customImg);
        }

        // $customImg 
    });

    // function getBase64Image(img)
    // {
    //     img = img[0];
    //     console.log(img);
    //     var canvas = document.createElement("canvas");
    //     canvas.width = img.width;
    //     canvas.height = img.height;

    //     var ctx = canvas.getContext("2d");
    //     ctx.drawImage(img, 0, 0);

    //     var dataURL = canvas.toDataURL("image/png");

    //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    // }

    // for (let tag in tagged)
    // {
    //     // console.log(tag, tagged[tag]);
    // }
    

    // console.log(tagged);

})(jQuery);