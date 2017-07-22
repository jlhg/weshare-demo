/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

window.jQuery = require('jquery');
window.$ = require('jquery');
require('materialize-css/dist/js/materialize');
require('materialize-css/dist/css/materialize.css');
require('./application.css');
require('./favicon.ico');

$(document).ready(function (){
  let btnUploadFile = $('#btn-upload-file');
  let inputUploadFile = $('#input-upload-file');
  let preloader = $('.preloader-wrapper');
  let imagePreview = $('#image-preview');
  let card = $('.card');
  let cardContent = $('.card-content > p');

  function readUrl(input, target) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        target.attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  btnUploadFile.click(function () {
    inputUploadFile.click();
  });

  inputUploadFile.change(function () {
    let data = new FormData();
    let self = this;
    data.append('authenticity_token', $('#authenticity_token').val());
    data.append('uploaded_file', $('#input-upload-file')[0].files[0]);
    $.ajax({
      url: '/upload',
      method: 'POST',
      data: data,
      processData: false,
      contentType: false,
      dataType: 'json',
      beforeSend: function () {
        readUrl(self, imagePreview);
        Materialize.fadeInImage(imagePreview);
        imagePreview.removeClass('hide');
        cardContent.text('影像辨識中，請稍候。');
        preloader.removeClass('hide');
      },
      success: function (data) {
        cardContent.text(data["result"]);
        console.log(data);
      },
      error: function (e) {
        console.log('error');
        console.log(e);
      },
      complete: function () {
        preloader.addClass('hide');
      }
    });
  });
});
