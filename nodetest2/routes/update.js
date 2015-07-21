

//Edit info per askMPA.com
exports.updateinfo = function(db) {
    return function(req, res) {
        var userToUpdate = req.params.id;
        var doc = {$set: req.body};
        db.get('userlist').update({"_id":userToUpdate}, doc, function(err, result) {
            res.send((result == 1) ? {msg: ''} : {msg: 'Error: ' + err});
        });
    }
};
