$(function(){
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message-text__image">`
    var html = `  <div class="message">
                    <div class="user-info">
                      <div class="user-info__user-name">
                        ${message.user_name}
                      </div>
                      <div class="user-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-text">
                      <p class="message-text__content">
                        ${message.content}
                      </p>
                      ${imagehtml}
                    </div>
                  </div>
                `
    return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
      $.ajax({
        url: href,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType:false
      })
        .done(function(data) {
          var html = buildHTML(data);
          $('.messages').append(html);
          $('.form__message').val('');
          $('.hidden').val('');
          $('.form__submit').prop('disabled', false);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('error');
      })
    })

    function reloadMessages() {
        var last_message_id = $('.message').last().data('id')
        var user_url = document.location.pathname;
        if (user_url.match(/messages/)) {
            $.ajax({
                type: 'GET',
                url: user_url,
                dataType: 'json',
                data: { data: last_message_id }
            })
            .done(function (json) {
                var insertHTML = '';
                json.messages.forEach(function(message) {
                  if (message.id > last_message_id ) {
                    insertHTML += buildHTML(message);
                  }
                });
                $('.messages').append(insertHTML);
                $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
            })

            .fail(function () {
                alert('自動更新に失敗しました');
            });
        }
    };
    setInterval(function(){reloadMessages()}, 3000)
  })