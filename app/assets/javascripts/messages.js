$(function(){
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message-text__image">`
    var html = `<div class="message>
                  <div class="user-info>
                    <div class="user-info__user-name">
                      ${message.user_name}
                    </div>
                    <div class="user-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message-text"
                    <p class="message-text__content">
                      ${message.content}
                    </p>
                    ${imagehtml}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType:false
      })
        .done(function(data) {
          var html = buildHTML(data);
          $('.message').append(html);
          $('.form__submit').val('');
          $('.hidden').val('');
          $('.form__submit').prop('disabled', false);
          $('.message').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error');
      })
    })
  })