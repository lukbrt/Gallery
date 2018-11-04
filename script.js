//Create tags buttons
(function($) {
    const $buttons = $("#buttons"),
        $imgs = $("#gallery img");
    const tagged = {};

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

                $imgs.hide()
                    .filter(tagged[tag])
                    .fadeIn(800);
            }
        }).appendTo($buttons);
    });

    // for (let tag in tagged)
    // {
    //     // console.log(tag, tagged[tag]);
    // }
    

    // console.log(tagged);

})(jQuery);