var createMessagebuffer = function ( size ){

    var index = 0;
    var messages = [];

    var push = function (id, msg) {
        messages[index] = {
            id: id,
            msg: msg
        };
        index = (index + 1) % size;
    }

    var findMessageById = function (id) {
        let result = messages.find(value => value.id === id);
        if(result) {
            return result.msg;
        } else {
            return null;
        }
    }

    return {
        push: push,
        findMessageById: findMessageById,
    }

}