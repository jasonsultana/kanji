'use strict';

window.Kanji =  {
  KANJI_TEMPLATE:       $('#kanjiTemplate').html().trim(),
  $contentBox:          $('#content'),
  $titleBox:            $('header h1'),
  $submitButton:        $('#kanjiSubmit'),
  $kanjiDataFile:       $('#kanjiDataFile'),

  _setKanjiRow: function(kanji) {
    var $kanjiRow       = $(Kanji.KANJI_TEMPLATE);
    var $kanjiCharacter = $kanjiRow.find('.kanji-character');
    var $kanjiMeaning   = $kanjiRow.find('.kanji-meaning');
    var $kanjiOnyomi    = $kanjiRow.find('.kanji-onyomi');
    var $kanjiKunyomi   = $kanjiRow.find('.kanji-kunyomi');

    $kanjiCharacter.text(kanji.character);
    $kanjiMeaning.text(kanji.meaning);
    $kanjiOnyomi.text(kanji.onyomi);
    $kanjiKunyomi.text(kanji.kunyomi);
    $kanjiRow.attr('data-character', kanji.character);

    Kanji.$contentBox.prepend($kanjiRow);
  },

  _load: function(path) {
    if (!path) {
      path = 'data/kanji.json';
    }
    else {
      var parts = path.split('\\');
      var fileName = parts[parts.length - 1];
      path = 'data/' + fileName;
    }

    console.log('loading path ' + path);

    $.getJSON(path, function(data) {
      Kanji.$titleBox.text(data.title);

      $.each( data.kanji, function( i, kanji ) {
        Kanji._setKanjiRow(kanji);
      });
    });
  },

  _init: function() {
    this.$submitButton.click(function() {
      var dataFile = Kanji.$kanjiDataFile.val();
      console.log(dataFile);

      Kanji.$contentBox.html(''); // clear the current kanji content
      Kanji._load(dataFile);
    });
  }
};
