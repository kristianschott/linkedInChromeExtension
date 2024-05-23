$(document).ready(function() {
    // let profileSection = document.getElementsByClassName("ph5 pb5");

    setTimeout(function() {
        let profileSection = document.getElementsByClassName("ph5 pb5")[0];
        let hasRemoveConnectionButton = $(profileSection).find("span:contains('Remove Connection')").length > 0;
        // console.log("hasRemoveConnectionButton!!!", hasRemoveConnectionButton);

        let hasAcceptButton = $(profileSection).find("span:contains('Accept')").length > 0;
        // console.log("hasAcceptButton!!!", hasAcceptButton);

        let hasConnectButton = $(profileSection).find("span:contains('Connect')").length > 0;
        // console.log("hasConnectButton!!!", hasConnectButton);

        if (hasRemoveConnectionButton) {
            // $(".ph5.pb5 > div").children().eq(1).html("Hello World");
            $(".ph5.pb5 > div").children().eq(1).append("<span class='linkedin-style'>In Connections</span><button class='linkedin-button' id='message-now'>Message Now</button>");
        
            $("#message-now").click(function() {
                $(profileSection).find("span:contains('Message')").parent().click(); 

                setTimeout(function() {
                    chrome.storage.sync.get('messageTemplate', function(data) {
                        if (data.messageTemplate) {
                            let editableDiv = document.querySelector('.msg-form__contenteditable');
                            if (editableDiv && editableDiv.children.length >= 3) {
                                $(editableDiv.children[2]).html(data.messageTemplate);
                            }
                        }
                    });
                }, 1000); 
            });
        } else if (hasConnectButton) {
            $(".ph5.pb5 > div").children().eq(1).append("<span class='linkedin-style'>Not Connected</span> <button class='linkedin-button' id='connect-now'>Connect Now With a Note</button>");
            $("#connect-now").click(function() {
                $(profileSection).find("span:contains('Connect')").parent().click(); 

                setTimeout(function() {
                    let modal = document.getElementById("artdeco-modal-outlet");
                    $(modal).find("span:contains('Add a note')").parent().click(); 

                    setTimeout(function() {
                        chrome.storage.sync.get('connectTemplate', function(data) {
                            console.log('connectTemplate', data.connectTemplate);
                            if (data.connectTemplate) {
                                let messageBox = document.querySelector('#custom-message');
                                console.log('messageBox', messageBox);
                                messageBox.value = data.connectTemplate;
                            }
                        });
                    }, 2000); 
                   
                }, 2000); 
            });
        }

        if (hasAcceptButton) {
            $(".ph5.pb5 > div").children().eq(1).append("<span class='linkedin-style'>Waiting my acceptance</span><button class='linkedin-button' id='acceptBtn'>Accept Now</button>");
            $("#acceptBtn").click(function() {
                $(profileSection).find("span:contains('Accept')").parent().click();
            });
        }
        
    }, 5000);
 
})
