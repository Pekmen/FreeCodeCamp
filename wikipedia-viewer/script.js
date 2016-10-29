$(document).ready(function() {

  var wiki = $("#wiki");
  $(".searchbox").autocomplete({
    source: function(request, response) {
      getWikiSearchTerms(request, response);
    },
    select: function(event, ui) {
      getApiData("search");
    }
  });

  $('#search').submit(function(e) {
    e.preventDefault();
    getApiData("search");
  });

  $('.random').click(function(e) {
    e.preventDefault();
    getApiData("random");
  });

  // Basic API call for autocomplete
  function getWikiSearchTerms(request, response) {
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        'action': 'opensearch',
        'format': 'json',
        'search': request.term
      },
      success: function(data) {
        response(data[1]);
      }
    });
  }

  function getApiData(generatorType) {
    var apiUrl;
    var apiParams = {
      format: "json",
      action: "query",
      prop: "extracts",
      exintro: "",
      exlimit: "max",
      exchars: "200",
      explaintext: ""
    }
    if (generatorType == "search") {
      apiParams.generator = "search";
      apiParams.gsrnamespace = "0";
      apiParams.gsrsearch = $(".searchbox").val();
      apiParams.gsrlimit = "10";

    } else if (generatorType == "random") {
      apiParams.generator = "random";
      apiParams.grnnamespace = "0";
    }
    $.ajax({
      url: "http://en.wikipedia.org/w/api.php",
      dataType: 'jsonp',
      data: apiParams,
      success: function(data) {
        console.log(data);
        showData(data);
      }
    });
  }

  // Build HTML for each returned wiki article
  function showData(data) {
    wiki.html('');
    $.each(data.query.pages, function(i, entry) {
      var wikiEntry = document.createElement("div");
      wikiEntry.className = "wiki-entry";
      var titleLink = document.createElement("a");
      titleLink.innerHTML = entry.title;
      titleLink.href = "http://en.wikipedia.org/wiki/" + entry.title.replace(" ", "_");
      var extract = document.createElement("p");
      extract.innerHTML = entry.extract;
      wikiEntry.appendChild(titleLink);
      wikiEntry.appendChild(extract);
      wiki.append(wikiEntry);
    });
  }
});