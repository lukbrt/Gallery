//Create tags buttons
(function($) {
    const STORAGE_SIZE = 9;

    const $buttons = $("#buttons"),
        $imgs = $("#gallery img");
    const tagged = {};
    const $gallery = $("#gallery");
    // const selectedTags = new Set();


    $imgs.each(function () { 
         const img = this;
         const tags = $(this).data("tags");

         tags.split(", ").forEach(tag => {
             if (typeof tagged[tag] === 'undefined')
             {
                 tagged[tag] = [];
             }

             tagged[tag].push(img);
         });
    });

    loadPersistedImages();

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


    document.getElementById("inputFile").addEventListener('change', e => {
        const file = e.target.files[0];
        if (file.type.includes("image"))
        {
            $("#inputFile").removeClass("red-border")
            const reader = new FileReader();
            reader.onload = function(ev) {
                const $customImg = $("<img />");
                $customImg.attr("src", ev.target.result);
                $gallery.append($customImg); //.hide().fadeIn(800)
                persistImageAdded($customImg);
            };
            
            reader.readAsDataURL(file);
        }
        else
        {
            $("#inputFile").addClass("red-border");
        }

    }, false);

    function loadPersistedImages()
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

    function persistImageAdded(img)
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