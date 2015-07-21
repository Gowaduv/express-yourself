//userlist data array for filling info box
var userListData = [];

//DOM Ready
$(document).ready(function() {
  //populate the uesr table on page load
  populateTable();
  //Username link click
  $("#userList table tbody").on("click", "td a.linkshowuser", showUserInfo);
  // Add user button click
  $("#btnAddUser").on("click", addUser);
  //Delete User link click
  $("#userList table tbody").on("click", "td a.linkdeleteuser", deleteUser);
  // Update User link click
  $('#userList table tbody').on('click', 'td a.linkupdateinfo', injectIntoUpdateChunk);
  // per askMPA.com
  // Add class to updated fields
  $('#updateInfo input').on('change', function() {
    $(this).addClass('updated')
  });

  // Update info button click
  $('#btnUpdateInfo').on('click', updateInfo);

  // Cancel Update User button click
  $('#btnCancelUpdateInfo').on('click', toggleAddUpdateChunks);
});


// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/users/userlist', function(data) {

    // stick our user data array into a userlist var in the globla object
    userListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '<td><a href="#" class="linkupdateinfo" rel="' + this._id + '">edit</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#userList table tbody').html(tableContent);
  });
};

//Show user info
function showUserInfo(event) {
  // prevent link from firing
  event.preventDefault();
  //retreive username from link rel attribute
  var thisUserName = $(this).attr('rel');
  //get index of object based on ID value
  var arrayPosition = userListData.map(function(arrayItem) {
    return arrayItem.username;
  }).indexOf(thisUserName);
  //get user object
  var thisUserObject = userListData[arrayPosition];
  //populate Info box
  $("#userInfoName").text(thisUserObject.fullname);
  $("#userInfoAge").text(thisUserObject.age);
  $("#userInfoGender").text(thisUserObject.gender);
  $("#userInfoLocation").text(thisUserObject.location);
};

// Add User
function addUser(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val) {
    if ($(this).val() === '') {
      errorCount++;
    }
  });

  // Check and make sure errorCount's still at zero
  if (errorCount === 0) {

    // If it is, compile all user info into one object
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'email': $('#addUser fieldset input#inputUserEmail').val(),
      'fullname': $('#addUser fieldset input#inputUserFullname').val(),
      'age': $('#addUser fieldset input#inputUserAge').val(),
      'location': $('#addUser fieldset input#inputUserLocation').val(),
      'gender': $('#addUser fieldset input#inputUserGender').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(response) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#addUser fieldset input').val('');

        // Update the table
        populateTable();

      } else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  } else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};

//EDIT User
// per askMPA.com
// Toggle Displaying Add and Update Chunks
function toggleAddUpdateChunks() {
  $('#addUserChunk').toggle();
  $('#updateInfoChunk').toggle();
}
// inject User info into the Update chunk
function injectIntoUpdateChunk(event) {

  event.preventDefault();

  if ($('#addUserChunk').is(":visible")) {
    toggleAddUpdateChunks();
  }

  var _id = $(this).attr('rel');
  var arrayPosition = userListData.map(function(arrayItem) {
    return arrayItem._id;
  }).indexOf(_id);

  var thisUserObject = userListData[arrayPosition];

  $('#updateUserFullname').val(thisUserObject.fullname);
  $('#updateUserAge').val(thisUserObject.age);
  $('#updateUserGender').val(thisUserObject.gender);
  $('#updateUserLocation').val(thisUserObject.location);
  $('#updateUserName').val(thisUserObject.username);
  $('#updateUserEmail').val(thisUserObject.email);

  $('#updateInfoChunk').attr('rel', thisUserObject._id);
}
// Update User Info
function updateInfo(event) {

  event.preventDefault();

  var _id = $('#updateInfoChunk').attr('rel');

  var fieldsToBeUpdated = $('#updateInfo input.updated');

  var updatedFields = {};
  $(fieldsToBeUpdated).each(function() {
    var key = $(this).attr('placeholder').replace(" ", "").toLowerCase();
    var value = $(this).val();
    updatedFields[key] = value;
  });

    $.ajax({
      type: 'PUT',
      data: updatedFields,
      url: '/users/updateuser/'+_id
    }).done(function(response) {
      if (response.msg === '') {
        toggleAddUpdateChunks();
      } else {
        alert('Error: ' + response.msg);
      }

    populateTable();
  });
};



// Delete User
function deleteUser(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function(response) {

      // Check for a successful (blank) response
      if (response.msg === '') {} else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  } else {

    // If they said no to the confirm, do nothing
    return false;

  }

};
