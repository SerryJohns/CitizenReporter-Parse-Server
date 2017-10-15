Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

Parse.Cloud.afterSave("Assignment", function(request) {
  var title = request.object.get("title");
  var description = request.object.get("description");
  var assignmentId = request.object.id;

  Parse.Push.send({
    data: {
        "assignmentId": assignmentId,
        "title": title,
        "description": description
    }
  }, {
    success: function() {
      console.log("Success!");
    },
    error: function(error) {
      console.log("There was an error: " + error);
    }
  });
});

