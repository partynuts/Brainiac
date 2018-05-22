$("button").on("click", function(sun) {
  console.log("click is firing");

  $.ajax({
    url: "https://od-api.oxforddictionaries.com:443/api/v1/inflections/en/home",
    contentType: "application/json",
    type: "GET",
    path: "{source_lang}/{word_id}",
    header: {
      Accept: "application/json",
      app_id: "747bd893",
      app_key: "bb247e7fe5f908fc716469630f5d5bd6"
    },

    success: function() {
      console.log("test");
    }
  });
  console.log("something happening?");
});
