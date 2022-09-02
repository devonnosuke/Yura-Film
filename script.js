function ambilData() {
  $("#movie-list").html(`<img src="loading.gif">`);
  $.ajax({
    url: "https://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "4ac99f69",
      s: $("#input-search").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $("#movie-list").html("");

        $.each(movies, function (i, Search) {
          $("#movie-list").append(`
          <div class="col-md-4 p-5">
            <div class="card mb-4">
              <img src="${Search.Poster}" class="card-img-top img-responsive" style="max-height:500px; min-height:500px" />
              <div class="card-body">
                <h5 class="card-title text-truncate">${Search.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Tahun: ${Search.Year}</h6>
                <a href="#" data-id="${Search.imdbID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card-link see-detail">See Details</a>
              </div>
            </div>
          </div>
        `);
        });

        $("#input-search").val("");
      } else {
        $("#movie-list").html(`
          <div class="col">
            <h1 class="text-center">
              <p style="font-size: 500%">😭</p>
              ${result.Error}
            </h1>
          </div>
        `);
      }
    },
  });
}

$("#search-button").on("click", function () {
  ambilData();
});

$("#input-search").on("keyup", function (e) {
  if (e.keyCode === 13) {
    ambilData();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  $(".modal-body").html(`<img src="loading.gif" width="750" />`);
  let id = $(this).data("id");
  $.ajax({
    url: "https://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "4ac99f69",
      i: id,
    },
    success: function (detail) {
      $(".modal-body").html(`
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <img src="${detail.Poster}" class="img-fluid" style="min-height:300px; max-height:300px" />
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              <li class="list-group-item list-group-item-primary"><h1>${detail.Title}</h1></li>
              <li class="list-group-item list-group-item-info"><b>ImdbID:</b> ${detail.imdbID}</li>
              <li class="list-group-item list-group-item-info"><b>Relased:</b> ${detail.Released}</li>
              <li class="list-group-item list-group-item-info"><b>Genre :</b> ${detail.Genre}</li>
              <li class="list-group-item list-group-item-info"><b>Director :</b> ${detail.Director}</li>
              <li class="list-group-item list-group-item-info"><b>Actor :</b> ${detail.Actors}</li>
              <li class="list-group-item list-group-item-info"><b>Plot :</b> ${detail.Plot}</li>
            </ul>
          </div>
        </div>
      </div>
      `);
    },
  });
});
